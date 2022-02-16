import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MatchEvent } from "../types/matchEvent";
import { Player } from "../types/player";

export const getMatch = createAsyncThunk(
  "match/getMatch",
  async (payload: { id: number }) => {
    const { id } = payload;
    const response = await fetch(`http://localhost:4442/matches/${id}`);

    if (response.ok) {
      let match = await response.json();

      if (match === null) {
        const response = await fetch(`http://localhost:4442/matches/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: id,
          }),
        });

        if (response.ok) {
          match = await response.json();
        }
      }

      return { match };
    }
  }
);

export const addLineup = createAsyncThunk(
  "match/addLineup",
  async (payload: { id: number; newPlayer: Player }) => {
    const { id, newPlayer } = payload;
    const response = await fetch(`http://localhost:4442/matches/lineup/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player: newPlayer,
      }),
    });

    if (response.ok) {
      const player = await response.json();

      return { player };
    }
  }
);

export const modifyRating = createAsyncThunk(
  "match/modifyRating",
  async (payload: { pageId: string; id: number; rating: number }) => {
    const { pageId, id, rating } = payload;
    const response = await fetch(
      `http://localhost:4442/matches/lineup/${pageId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          rating,
        }),
      }
    );

    if (response.ok) {
      const rating = await response.json();

      return { rating };
    }
  }
);

export const resetMatch = createAsyncThunk(
  "match/resetMatch",
  async (payload: { pageId: string }) => {
    const { pageId } = payload;
    await fetch(`http://localhost:4442/matches/${pageId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
);

export const addSub = createAsyncThunk(
  "match/addSub",
  async (payload: { id: number; newPlayer: Player }) => {
    const { id, newPlayer } = payload;
    const response = await fetch(`http://localhost:4442/matches/subs/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player: newPlayer,
      }),
    });

    if (response.ok) {
      const player = await response.json();

      return { player };
    }
  }
);

export const addEvent = createAsyncThunk(
  "match/addEvent",
  async (payload: {
    pageId: number;
    newEvent: { id: number; goal: string; assist: string };
  }) => {
    const { pageId, newEvent } = payload;
    const response = await fetch(
      `http://localhost:4442/matches/events/${pageId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: newEvent,
        }),
      }
    );

    if (response.ok) {
      const event = await response.json();

      return { event };
    }
  }
);

export const modifyGoal = createAsyncThunk(
  "match/modifyGoal",
  async (payload: { pageId: number; id: number; goal: string }) => {
    const { pageId, id, goal } = payload;

    const response = await fetch(
      `http://localhost:4442/matches/events/goal/${pageId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          goal,
        }),
      }
    );

    if (response.ok) {
      const event = await response.json();

      return { event };
    }
  }
);

export const modifyAssist = createAsyncThunk(
  "match/modifyAssist",
  async (payload: { pageId: number; id: number; assist: string }) => {
    const { pageId, id, assist } = payload;
    const response = await fetch(
      `http://localhost:4442/matches/events/assist/${pageId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          assist,
        }),
      }
    );

    if (response.ok) {
      const event = await response.json();

      return { event };
    }
  }
);

interface MatchState {
  game: {
    lineup: Array<Player>;
    subs: Array<Player>;
    events: Array<MatchEvent>;
  };
}

const initialState = {
  game: {
    lineup: [],
    subs: [],
    events: [],
  },
} as MatchState;

export const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMatch.fulfilled, (state, action) => {
      if (action.payload) {
        state.game = action.payload.match;
      }
    });
    builder.addCase(addLineup.fulfilled, (state, action) => {
      if (action.payload) {
        state.game.lineup = [...state.game.lineup, action.payload.player];
      }
    });
    builder.addCase(resetMatch.fulfilled, (state, action) => {
      state.game.lineup = [];
      state.game.subs = [];
    });
    builder.addCase(addSub.fulfilled, (state, action) => {
      if (action.payload) {
        state.game.subs = [...state.game.subs, action.payload.player];
      }
    });
    builder.addCase(modifyRating.fulfilled, (state, action) => {
      if (action.payload) {
        const newRating = action.payload.rating;
        state.game.lineup = state.game.lineup.map((player) =>
          player.id === newRating.id
            ? { ...player, rating: newRating.rating }
            : player
        );
      }
    });
    builder.addCase(addEvent.fulfilled, (state, action) => {
      if (action.payload) {
        state.game.events = [...state.game.events, action.payload.event];
      }
    });
    builder.addCase(modifyAssist.fulfilled, (state, action) => {
      if (action.payload) {
        const newEvent = action.payload.event;

        state.game.events = state.game.events.map((event) =>
          event.id === newEvent.id
            ? { ...event, assist: newEvent.assist }
            : event
        );
      }
    });
    builder.addCase(modifyGoal.fulfilled, (state, action) => {
      if (action.payload) {
        const newEvent = action.payload.event;

        state.game.events = state.game.events.map((event) =>
          event.id === newEvent.id ? { ...event, goal: newEvent.goal } : event
        );
      }
    });
  },
});

export default matchSlice.reducer;
