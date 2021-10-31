export type Match = {
  awayTeam: { id: number; name: string };
  competition: { name: string };
  homeTeam: { id: number; name: string };
  utcDate: string;
  score: {
    fullTime: { homeTeam: number; awayTeam: number };
  };
};
