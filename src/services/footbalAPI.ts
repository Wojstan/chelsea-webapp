import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const requestHeaders = {
  "X-Auth-Token": "452a01d58d644408bb47bf5abfdbf109",
};

const createRequest = (url: string) => ({ url, headers: requestHeaders });

export const footballApi = createApi({
  reducerPath: "footballApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.football-data.org/v2/",
  }),
  endpoints: (builder) => ({
    getChelseaMatches: builder.query({
      query: () => createRequest("teams/61/matches"),
      transformResponse: (response: { matches: [] }) => {
        const finished = response.matches.filter(
          (row: { status: string }) => row.status === "FINISHED"
        );
        const scheudled = response.matches.filter(
          (row: { status: string }) => row.status === "SCHEDULED"
        );

        return {
          finished,
          scheudled,
        };
      },
    }),
    getPremierLeagueStandings: builder.query({
      query: () => createRequest("competitions/PL/standings"),
    }),
  }),
});

export const { useGetChelseaMatchesQuery, useGetPremierLeagueStandingsQuery } =
  footballApi;
