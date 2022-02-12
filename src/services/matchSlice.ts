import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
            lineup: [],
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

interface MatchState {
  game: {
    lineup: Array<Player>;
    subs: Array<Player>;
    events: Array<any>;
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
  },
});

export default matchSlice.reducer;
