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
            _id: payload.id,
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

export const modifyLineup = createAsyncThunk(
  "match/addMatch",
  async (payload: { id: number; team: Array<any> }) => {
    const { id, team } = payload;
    const response = await fetch(`http://localhost:4442/matches/lineup/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lineup: team,
      }),
    });

    if (response.ok) {
      const match = await response.json();
      return { match };
    }
  }
);

interface MatchState {
  game: {
    lineup: Array<Player>;
    events: Array<any>;
  };
}

const initialState = {
  game: {
    lineup: [],
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
    builder.addCase(modifyLineup.fulfilled, (state, action) => {
      if (action.payload) {
        state.game = action.payload.match;
      }
    });
  },
});

export default matchSlice.reducer;
