import { configureStore } from "@reduxjs/toolkit";

import { footballApi } from "../services/footbalAPI";
import { localApi } from "../services/localAPI";

import matchReducer from "../services/matchSlice";

export const store = configureStore({
  reducer: {
    [footballApi.reducerPath]: footballApi.reducer,
    [localApi.reducerPath]: localApi.reducer,
    match: matchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(footballApi.middleware, localApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
