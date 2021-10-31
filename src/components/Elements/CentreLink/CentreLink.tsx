import styles from "./CentreLink.module.css";

type Props = {
  homeScore?: string;
  awayScore?: string;
  homeTeam: string;
  awayTeam: string;
  homeCrest: string;
  awayCrest: string;
  competition: string;
  date: Date;
  style?: any;
};

const CentreLink = ({
  competition,
  homeScore,
  awayScore,
  homeTeam,
  awayTeam,
  homeCrest,
  awayCrest,
  date,
  style,
}: Props) => (
  <li>
    <h6>{date.toLocaleString()}</h6>
    <div className={styles.centre}>
      <h5 style={{ width: "20%" }}>{competition}</h5>

      <div style={{ width: "60%", display: "flex", alignItems: "center" }}>
        <h4 style={{ width: "40%", textAlign: "right" }}>{homeTeam}</h4>
        <img style={{ width: "5%", margin: "0 1rem" }} src={homeCrest} alt="" />
        <h4 style={{ width: "10%", textAlign: "center" }}>
          {homeScore}-{awayScore}
        </h4>
        <img style={{ width: "5%", margin: "0 1rem" }} src={awayCrest} alt="" />
        <h4 style={{ width: "40%" }}>{awayTeam}</h4>
      </div>
      <a
        style={{ width: "20%", textAlign: "right" }}
        href="#"
        className={styles.link}
      >
        Match centre
      </a>
    </div>
  </li>
);

export default CentreLink;
