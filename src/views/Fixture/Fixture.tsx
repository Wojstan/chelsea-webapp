import CentreLink from "../../components/Elements/CentreLink/CentreLink";
import { useGetChelseaMatchesQuery } from "../../services/footbalAPI";
import { Match } from "../Home/match";

const Fixture = () => {
  const { data, isFetching } = useGetChelseaMatchesQuery(0);

  const fixture: Array<Match> = data?.scheudled!;

  if (isFetching) {
    return <div>load</div>;
  }

  return (
    <main>
      <div className="container">
        <section>
          <h1 className="mb-4">Full fixture</h1>

          <h2 className="mb-5">Next 10 matches</h2>

          {fixture.map((match, i) => (
            <CentreLink
              key={i}
              homeTeam={match.homeTeam.name}
              awayTeam={match.awayTeam.name}
              homeCrest={`https://crests.football-data.org/${match.homeTeam.id}.svg`}
              awayCrest={`https://crests.football-data.org/${match.awayTeam.id}.svg`}
              competition={match.competition.name}
              date={new Date(match.utcDate)}
            />
          ))}
        </section>
      </div>
    </main>
  );
};

export default Fixture;
