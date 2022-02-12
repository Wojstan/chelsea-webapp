import { Match } from "../../../views/Home/match";
import styles from "./CentreHeader.module.css";

type Props = {
  matchData: Match;
};

const monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const CentreHeader = ({ matchData }: Props) => {
  const date = new Date(matchData.utcDate);

  const addZero = (dateNumber: number) =>
    dateNumber < 10 ? `0${dateNumber}` : dateNumber;

  const dateString = `${monthsShort[date.getMonth()]} ${addZero(
    date.getDate()
  )}, ${date.getHours()}:${addZero(date.getMinutes())}`;

  return (
    <header className={styles.header}>
      <div className={`container ${styles.result}`}>
        <div className={styles.team}>
          <div className={styles.logo}>
            <img
              src={`https://crests.football-data.org/${matchData.homeTeam.id}.svg`}
              alt=""
            />
          </div>
          <h4>{matchData.homeTeam.name}</h4>
        </div>

        <div className={styles.score}>
          <h6 className="mb-3 text-center">{dateString}</h6>
          <h2 className="mb-5 text-center">
            {matchData.score.fullTime.homeTeam} -{" "}
            {matchData.score.fullTime.awayTeam}
          </h2>
          <h5 className="text-center">Finished</h5>
        </div>

        <div className={styles.team}>
          <div className={styles.logo}>
            <img
              src={`https://crests.football-data.org/${matchData.awayTeam.id}.svg`}
              alt=""
            />
          </div>
          <h4>{matchData.awayTeam.name}</h4>
        </div>
      </div>
    </header>
  );
};

export default CentreHeader;
