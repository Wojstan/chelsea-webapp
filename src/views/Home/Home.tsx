import { Row, Col, Spin, Statistic, Typography } from "antd";
import FixtureBlock from "../../components/Elements/FixtureBlock/FixtureBlock";
import MatchCountdown from "../../components/Elements/MatchCountdown/MatchCountdown";
import HomeSection from "../../components/Modules/HomeSection/HomeSection";
import PLTable from "../../components/Modules/PLTable/PLTable";
import lion from "../../images/lion.png";
import { useGetChelseaMatchesQuery } from "../../services/footbalAPI";

import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

type Match = {
  awayTeam: { id: number };
  competition: { name: string };
  homeTeam: { id: number };
  utcDate: string;
  score: {
    fullTime: { homeTeam: number; awayTeam: number };
  };
};

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
        <Col xxl={12}>
          <HomeSection title="Premier League">
            <PLTable />
          </HomeSection>
        </Col>

        <Col xxl={7}>
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
          <HomeSection title="AVG xG" style={{ minHeight: "11.7rem" }}>
            <div style={{ display: "flex" }}>
              <Statistic
                prefix={<ArrowUpOutlined />}
                valueStyle={{ color: "#3f8600" }}
                title="AVG xG per match"
                value={3.53}
                style={{ marginRight: "1.5rem" }}
              />
              <Statistic
                prefix={<ArrowUpOutlined />}
                valueStyle={{ color: "#3f8600" }}
                title="AVG xGA per match"
                value={0.53}
              />
            </div>
          </HomeSection>

          <HomeSection
            title="Last match stats"
            style={{ minHeight: "11.7rem" }}
          >
            <div style={{ display: "flex" }}>
              <Statistic
                prefix={<ArrowDownOutlined />}
                valueStyle={{ color: "#cf1322" }}
                title="Last match xG"
                value={2.51}
                style={{ marginRight: "1.5rem" }}
              />
              <Statistic
                prefix={<ArrowUpOutlined />}
                valueStyle={{ color: "#3f8600" }}
                title="Last match xGA"
                value={0.11}
              />
            </div>
          </HomeSection>
        </Col>

        <Col xxl={5}>
          <HomeSection
            title="Till the next match"
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

            <MatchCountdown nextMatch={new Date(nextMatch.utcDate).getTime()} />
          </HomeSection>
          <HomeSection>
            <Title
              style={{
                marginBottom: "4rem",
                fontSize: "4rem",
                color: "rgb(0, 60, 190)",
              }}
            >
              9
            </Title>
            <Title level={3} type="secondary">
              not completed matches
            </Title>
          </HomeSection>
        </Col>
      </Row>
    </>
  );
};

export default Home;
