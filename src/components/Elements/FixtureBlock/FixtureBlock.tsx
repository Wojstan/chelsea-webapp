import { Col, Typography } from "antd";
import styles from "./FixtureBlock.module.css";

const { Text, Title } = Typography;

type Props = {
  column: boolean;
  separator: boolean;
  homeScore: string;
  awayScore: string;
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
      <Text style={{ fontWeight: 500 }}>{date.toLocaleString()}</Text>
      <div className={`${styles.result} ${styles.pd} `}>
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
          span={24}
          md={12}
          xxl={6}
          className={`${separator ? styles.border : ""}`}
          style={{
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
