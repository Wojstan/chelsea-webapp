import { Spin } from "antd";
import FixtureBlock from "../../components/Elements/FixtureBlock/FixtureBlock";

import { useGetChelseaMatchesQuery } from "../../services/footbalAPI";

import { Match } from "./match";
import { useState } from "react";

const Home = () => {
  const [active, setActive] = useState<"finished" | "scheudled">("finished");
  const [selectValues, setSelectValues] = useState({ amount: 10, type: "All" });
  const { data, isFetching } = useGetChelseaMatchesQuery(0);

  const results: Array<Match> = data?.finished!;

  const fixture: Array<Match> = data?.scheudled!;

  if (isFetching) {
    return <Spin size="large" />;
  }

  const onChangeAmount = (e: any) => {
    setSelectValues({ ...selectValues, amount: e.target.value });
  };

  return (
    <main>
      <div className="container">
        <nav className="nav" style={{ justifyContent: "space-between" }}>
          <span>
            <button
              onClick={() => setActive("finished")}
              className={`btn mr-2 ${active === "finished" ? "active" : ""}`}
            >
              FINISHED
            </button>
            <button
              onClick={() => setActive("scheudled")}
              className={`btn  ${active === "scheudled" ? "active" : ""}`}
            >
              SCHEUDLED
            </button>
          </span>

          <span>
            <select onChange={onChangeAmount} className="mr-2" name="" id="">
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>ALL</option>
            </select>

            <select name="" id="">
              <option value="ALL">ALL</option>
              <option value="PL">PREMIER LEAGUE</option>
            </select>
          </span>
        </nav>
        {(active === "finished"
          ? results
              .slice(results.length - selectValues.amount, results.length)
              .reverse()
          : fixture.slice(0, selectValues.amount)
        ).map((match, i) => (
          <FixtureBlock
            id={match.id}
            key={Math.random()}
            homeTeam={match.homeTeam.name}
            awayTeam={match.awayTeam.name}
            halfHomeScore={match.score.halfTime.homeTeam?.toString()}
            halfAwayScore={match.score.halfTime.awayTeam?.toString()}
            homeScore={match.score?.fullTime.homeTeam?.toString()}
            awayScore={match.score?.fullTime.awayTeam?.toString()}
            homeCrest={`https://crests.football-data.org/${match.homeTeam.id}.svg`}
            awayCrest={`https://crests.football-data.org/${match.awayTeam.id}.svg`}
            competition={match.competition.name}
            date={new Date(match.utcDate)}
          />
        ))}
      </div>
    </main>
  );
};

export default Home;
