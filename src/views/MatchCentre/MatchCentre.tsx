import { Spin } from "antd";
import { useState } from "react";
import { useParams } from "react-router";
import CentreHeader from "../../components/Modules/CentreHeader/CentreHeader";
import Events from "../../components/Modules/Events/Events";
import Lineup from "../../components/Modules/Lineup/Lineup";
import Ratings from "../../components/Modules/Ratings/Ratings";
import StartingList from "../../components/Modules/StartingList/StartingList";
import { useGetSingleMatchQuery } from "../../services/footbalAPI";
import { Match } from "../Home/match";
import styles from "./MatchCentre.module.css";

const MatchCentre = () => {
  const { matchId } = useParams<{ matchId?: string }>();
  const [active, setActive] = useState<"lineup" | "ratings" | "events">(
    "lineup"
  );

  const { data, isFetching } = useGetSingleMatchQuery(matchId as string);

  const matchData: Match = data?.match;

  if (isFetching) {
    return <Spin />;
  }

  return (
    <>
      <header className={styles.header}>
        <CentreHeader matchData={matchData} />
      </header>
      <main>
        <div className="container">
          <nav className="nav">
            <button
              onClick={() => setActive("lineup")}
              className={`btn mr-2 ${active === "lineup" ? "active" : ""}`}
            >
              LINEUP
            </button>
            <button
              onClick={() => setActive("ratings")}
              className={`btn mr-2  ${active === "ratings" ? "active" : ""}`}
            >
              RATINGS
            </button>
            <button
              onClick={() => setActive("events")}
              className={`btn  ${active === "events" ? "active" : ""}`}
            >
              EVENTS
            </button>
          </nav>

          {active === "lineup" && <Lineup />}
          {active === "ratings" && <Ratings />}
          {active === "events" && (
            <Events
              goalNumber={
                matchData.homeTeam.name === "Chelsea FC"
                  ? matchData.score.fullTime.homeTeam
                  : matchData.score.fullTime.awayTeam
              }
            />
          )}

          <StartingList />
        </div>
      </main>
    </>
  );
};

export default MatchCentre;
