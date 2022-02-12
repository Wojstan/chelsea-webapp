import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const createRequest = (url: string) => ({ url });

export const localApi = createApi({
  reducerPath: "localApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4442/",
  }),
  endpoints: (builder) => ({
    getPlayers: builder.query({
      query: () => createRequest("players/"),
    }),
  }),
});

export const { useGetPlayersQuery } = localApi;
