import { Col, Typography } from "antd";
import styles from "./FixtureBlock.module.css";

const { Text, Title } = Typography;

type Props = {
  column: boolean;
  separator: boolean;
  homeScore?: number;
  awayScore?: number;
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

const FixtureBlock = ({
  column,
  competition,
  homeScore,
  awayScore,
  homeCrest,
  awayCrest,
  date,
  separator,
}: Props) => {
  const blockTemplate = (
    <>
      <Text type="secondary">{competition}</Text>
      <br />
      <Text style={{ fontWeight: 500 }}>{date.toDateString()}</Text>
      <div
        className={styles.result}
        style={column ? { paddingRight: "4rem" } : {}}
      >
        <img src={homeCrest} height={80} alt="" />
        <Title className={styles.text} level={1}>
          {homeScore}-{awayScore}
        </Title>
        <img src={awayCrest} height={80} alt="" />
      </div>
    </>
  );

  return (
    <>
      {column ? (
        <Col
          xxl={6}
          style={{
            padding: "2rem 0rem 1rem 4rem",
            borderRight: separator ? "1px solid #E9ECEF" : "",
            fontSize: "1rem",
          }}
        >
          {blockTemplate}
        </Col>
      ) : (
        <div style={{ padding: "1rem 0", fontSize: "1rem" }}>
          {blockTemplate}
        </div>
      )}
    </>
  );
};

FixtureBlock.defaultProps = defaultProps;

export default FixtureBlock;
