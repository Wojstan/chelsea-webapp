export type Match = {
  awayTeam: { id: number };
  competition: { name: string };
  homeTeam: { id: number };
  utcDate: string;
  score: {
    fullTime: { homeTeam: number; awayTeam: number };
  };
};
