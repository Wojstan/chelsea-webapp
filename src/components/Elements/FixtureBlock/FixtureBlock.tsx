import styles from "./FixtureBlock.module.css";

type Props = {
  column: boolean;
  separator: boolean;
  homeScore: string;
  awayScore: string;
  homeTeam: string;
  awayTeam: string;
  homeCrest: string;
  awayCrest: string;
  competition: string;
  date: Date;
  style?: any;
} & typeof defaultProps;

const defaultProps = {
  separator: true,
  column: true,
  homeScore: "",
  awayScore: "",
};

const FixtureBlock = ({
  competition,
  homeScore,
  awayScore,
  homeTeam,
  awayTeam,
  homeCrest,
  awayCrest,
  date,
  style,
}: Props) => {
  return (
    <div className={styles.block} style={style}>
      <h5 className="mb-3">{competition}</h5>
      <h6>{homeTeam === "Chelsea FC" ? "Home" : "Away"}</h6>
      <h6 className="mb-3">{date.toLocaleString()}</h6>
      <div className={styles.score}>
        <span>
          <img height={60} src={homeCrest} alt="" />
          <h4>{homeTeam}</h4>
        </span>
        <h4>{homeScore}</h4>
      </div>

      <div className={styles.score} style={{ marginBottom: "2.5rem" }}>
        <span>
          <img height={60} src={awayCrest} alt="" />
          <h4>{awayTeam}</h4>
        </span>
        <h4>{awayScore}</h4>
      </div>

      <div className={styles.triangle}></div>
      <a href="#" className={styles.centre}>
        Match centre
      </a>
    </div>
  );
};

FixtureBlock.defaultProps = defaultProps;

export default FixtureBlock;
