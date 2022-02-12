export type Match = {
  id: number;
  awayTeam: { id: number; name: string };
  competition: { name: string };
  homeTeam: { id: number; name: string };
  utcDate: string;
  score: {
    fullTime: { homeTeam: number; awayTeam: number };
    halfTime: { homeTeam: number; awayTeam: number };
  };
};
