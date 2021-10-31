import { Spin } from "antd";
import FixtureBlock from "../../components/Elements/FixtureBlock/FixtureBlock";
import MatchCountdown from "../../components/Elements/MatchCountdown/MatchCountdown";
import PLTable from "../../components/Modules/PLTable/PLTable";
import { useGetChelseaMatchesQuery } from "../../services/footbalAPI";

import { Match } from "./match";

const Home = () => {
  const { data, isFetching } = useGetChelseaMatchesQuery(0);

  const results: Array<Match> = data?.finished
    .slice(Math.max(data?.finished?.length - 3, 1))
    .reverse()!;
  const fixture: Array<Match> = data?.scheudled.slice(0, 3)!;

  if (isFetching) {
    return <Spin size="large" />;
  }

  return (
    <main>
      <div className="container">
        <section>
          <h1>Results</h1>
          <div>
            {results.map((match, i) => (
              <FixtureBlock
                key={i}
                homeTeam={match.homeTeam.name}
                awayTeam={match.awayTeam.name}
                style={i === 1 ? { margin: "0 1.25%" } : {}}
                homeScore={match.score.fullTime.homeTeam.toString()}
                awayScore={match.score.fullTime.awayTeam.toString()}
                homeCrest={`https://crests.football-data.org/${match.homeTeam.id}.svg`}
                awayCrest={`https://crests.football-data.org/${match.awayTeam.id}.svg`}
                competition={match.competition.name}
                date={new Date(match.utcDate)}
              />
            ))}
          </div>
        </section>

        <section>
          <h1>Fixture</h1>
          <div>
            {fixture.map((match, i) => (
              <FixtureBlock
                key={i}
                homeTeam={match.homeTeam.name}
                awayTeam={match.awayTeam.name}
                style={i === 1 ? { margin: "0 1.25%" } : {}}
                homeCrest={`https://crests.football-data.org/${match.homeTeam.id}.svg`}
                awayCrest={`https://crests.football-data.org/${match.awayTeam.id}.svg`}
                competition={match.competition.name}
                date={new Date(match.utcDate)}
              />
            ))}
          </div>
        </section>
      </div>

      <section>
        <MatchCountdown
          awayTeam={
            fixture[0].awayTeam.name === "Chelsea FC"
              ? fixture[0].homeTeam.name
              : fixture[0].awayTeam.name
          }
          nextMatch={new Date(fixture[0].utcDate).getTime()}
        />
      </section>

      <div className="container">
        <section>
          <h1>PL Table</h1>
          <PLTable />
        </section>
      </div>
    </main>
  );
};

export default Home;
