import { Row, Col, Spin, Typography } from "antd";
import FixtureBlock from "../../components/Elements/FixtureBlock/FixtureBlock";
import MatchCountdown from "../../components/Elements/MatchCountdown/MatchCountdown";
import HomeSection from "../../components/Modules/HomeSection/HomeSection";
import PLTable from "../../components/Modules/PLTable/PLTable";
import lion from "../../images/lion.png";
import { useGetChelseaMatchesQuery } from "../../services/footbalAPI";

import styles from "./Home.module.css";
import { Match } from "./match";
import StatSections from "../../components/Modules/StatBlock/StatSections";

const { Title } = Typography;

const Home = () => {
  const { data, isFetching } = useGetChelseaMatchesQuery(0);

  const lastMatch: Match = data?.finished[data?.finished?.length - 1]!;
  const nextMatch: Match = data?.scheudled[0]!;

  if (isFetching) {
    return <Spin size="large" />;
  }

  return (
    <>
      <HomeSection title="Fixture">
        <Row gutter={24}>
          {data?.scheudled.map(
            (match: Match, i) =>
              i < 4 && (
                <FixtureBlock
                  key={i}
                  separator={i === 3 ? false : true}
                  homeCrest={`https://crests.football-data.org/${match.homeTeam.id}.svg`}
                  awayCrest={`https://crests.football-data.org/${match.awayTeam.id}.svg`}
                  competition={match.competition.name}
                  date={new Date(match.utcDate)}
                />
              )
          )}
        </Row>
      </HomeSection>

      <Row gutter={24}>
        <Col span={24} xxl={12}>
          <HomeSection title="Premier League">
            <PLTable />
          </HomeSection>
        </Col>
        <Col sm={24} xxl={12}>
          <Row gutter={24}>
            <Col md={14} span={24}>
              <HomeSection title="Last match">
                <FixtureBlock
                  column={false}
                  homeScore={lastMatch.score.fullTime.homeTeam.toString()}
                  awayScore={lastMatch.score.fullTime.awayTeam.toString()}
                  homeCrest={`https://crests.football-data.org/${lastMatch.homeTeam.id}.svg`}
                  awayCrest={`https://crests.football-data.org/${lastMatch.awayTeam.id}.svg`}
                  competition={lastMatch.competition.name}
                  date={new Date(lastMatch.utcDate)}
                />
              </HomeSection>

              <StatSections />
            </Col>

            <Col md={10} span={24}>
              <HomeSection
                title="Till the next match"
                className=""
                style={{
                  backgroundColor: "#003CBE",
                  height: "30rem",
                  position: "relative",
                }}
                titleStyle={{
                  color: "#FBFDFF",
                  paddingBottom: "3rem",
                }}
              >
                <img
                  height={250}
                  src={lion}
                  alt=""
                  style={{ position: "absolute", bottom: "3%", right: "3%" }}
                />

                <MatchCountdown
                  nextMatch={new Date(nextMatch.utcDate).getTime()}
                />
              </HomeSection>
              <HomeSection style={{ height: "15rem" }}>
                <Title className={styles.important}>9</Title>
                <Title level={3} type="secondary">
                  not completed matches
                </Title>
              </HomeSection>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Home;
