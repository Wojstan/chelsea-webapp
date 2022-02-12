import styles from "./FixtureBlock.module.css";
import plLogo from "../../../images/pl.png";
import clLogo from "../../../images/cl.png";

import { ReconciliationOutlined, StarOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

type Props = {
  id: number;
  column: boolean;
  homeScore: string;
  awayScore: string;
  halfHomeScore: string;
  halfAwayScore: string;
  homeTeam: string;
  awayTeam: string;
  homeCrest: string;
  awayCrest: string;
  competition: string;
  date: Date;
} & typeof defaultProps;

const defaultProps = {
  separator: true,
  column: true,
  homeScore: "",
  awayScore: "",
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

const FixtureBlock = ({
  id,
  competition,
  homeScore,
  awayScore,
  homeTeam,
  awayTeam,
  halfHomeScore,
  halfAwayScore,
  homeCrest,
  awayCrest,
  date,
}: Props) => {
  const addZero = (dateNumber: number) =>
    dateNumber < 10 ? `0${dateNumber}` : dateNumber;

  const dateString = `${monthsShort[date.getMonth()]} ${addZero(
    date.getDate()
  )}, ${date.getHours()}:${addZero(date.getMinutes())}`;

  const results = [
    {
      team: homeTeam,
      score: homeScore,
      crest: homeCrest,
      halfScore: halfHomeScore,
      isHome: homeTeam === "Chelsea FC",
    },
    {
      team: awayTeam,
      score: awayScore,
      crest: awayCrest,
      halfScore: halfAwayScore,
      isHome: awayTeam === "Chelsea FC",
    },
  ];

  return (
    <div className={styles.block}>
      <div className="text-center" style={{ width: "7%" }}>
        <img
          height={37}
          src={competition === "Premier League" ? plLogo : clLogo}
          alt=""
        />
      </div>

      <h5 className="text-center" style={{ width: "17%" }}>
        {dateString}
      </h5>

      <div style={{ width: "53%" }}>
        {results.map((row, i) => (
          <div
            key={i}
            className={styles.team}
            style={{ marginBottom: i === 0 ? "0.6rem" : "0" }}
          >
            <span>
              <img height={20} src={row.crest} alt="" />
              <h4 style={{ fontWeight: row.isHome ? 600 : 500 }}>{row.team}</h4>
            </span>
            <h4 className={styles.score}>
              <strong>{row.score ? row.score : "-"}</strong>({row.halfScore})
            </h4>
          </div>
        ))}
      </div>

      <div className={styles.separator} style={{ width: "8%" }}>
        <div></div>
      </div>

      <div className={styles.buttons} style={{ width: "15%" }}>
        <button>
          <StarOutlined />
        </button>
        {homeScore !== "" && (
          <Link to={`/results/${id}`}>
            <button>
              <ReconciliationOutlined />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

FixtureBlock.defaultProps = defaultProps;

export default FixtureBlock;
