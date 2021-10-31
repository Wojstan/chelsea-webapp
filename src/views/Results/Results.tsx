import CentreLink from "../../components/Elements/CentreLink/CentreLink";
import { useGetChelseaMatchesQuery } from "../../services/footbalAPI";
import { Match } from "../Home/match";

const Results = () => {
  const { data, isFetching } = useGetChelseaMatchesQuery(0);

  if (isFetching) {
    return <div>load</div>;
  }

  const results: Array<Match> = data?.finished!;

  console.log(results);

  return (
    <main>
      <div className="container">
        <section>
          <h1 className="mb-4">Full fixture</h1>

          <h2 className="mb-5">Last 10 matches</h2>

          {[...results].reverse().map((match, i) => (
            <CentreLink
              key={i}
              homeTeam={match.homeTeam.name}
              awayTeam={match.awayTeam.name}
              homeCrest={`https://crests.football-data.org/${match.homeTeam.id}.svg`}
              awayCrest={`https://crests.football-data.org/${match.awayTeam.id}.svg`}
              competition={match.competition.name}
              date={new Date(match.utcDate)}
              homeScore={match.score.fullTime.homeTeam.toString()}
              awayScore={match.score.fullTime.awayTeam.toString()}
            />
          ))}
        </section>
      </div>
    </main>
  );
};

export default Results;
