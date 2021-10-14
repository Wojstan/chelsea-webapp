import { Typography, Row, Col, Spin } from "antd";
import FixtureBlock from "../../components/Elements/FixtureBlock/FixtureBlock";
import MatchCountdown from "../../components/Elements/MatchCountdown/MatchCountdown";
import HomeSection from "../../components/Modules/HomeSection/HomeSection";
import PLTable from "../../components/Modules/PLTable/PLTable";
import lion from "../../images/lion.png";
import { useGetChelseaMatchesQuery } from "../../services/footbalAPI";
const { Title } = Typography;

const Home = () => {
  const { data, isFetching } = useGetChelseaMatchesQuery(0);

  const lastMatch: any = data?.finished[data?.finished?.length - 1];
  const nextMatch: any = data?.scheudled[0];

  if (isFetching) {
    return <Spin size="large" />;
  }

  return (
    <>
      <HomeSection>
        <Title level={3}>Fixture</Title>

        <Row gutter={24}>
          {data?.scheudled.map(
            (match: any, i) =>
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
          <HomeSection>
            <Title style={{ marginBottom: "2rem" }} level={3}>
              Premier League
            </Title>

            <PLTable />
          </HomeSection>
        </Col>

        <Col xxl={7}>
          <HomeSection>
            <Title level={3}>Last match</Title>
            <FixtureBlock
              column={false}
              homeScore={lastMatch.score.fullTime.homeTeam}
              awayScore={lastMatch.score.fullTime.awayTeam}
              homeCrest={`https://crests.football-data.org/${lastMatch.homeTeam.id}.svg`}
              awayCrest={`https://crests.football-data.org/${lastMatch.awayTeam.id}.svg`}
              competition={lastMatch.competition.name}
              date={new Date(lastMatch.utcDate)}
            />
          </HomeSection>
          <HomeSection style={{ minHeight: "9.7rem" }}></HomeSection>
        </Col>

        <Col xxl={5}>
          <HomeSection
            style={{
              backgroundColor: "#003CBE",
              height: "30rem",
              position: "relative",
            }}
          >
            <Title style={{ color: "#FBFDFF", marginBottom: "6rem" }} level={3}>
              Till the next match
            </Title>

            <img
              height={250}
              src={lion}
              alt=""
              style={{ position: "absolute", bottom: "3%", right: "3%" }}
            />

            <MatchCountdown nextMatch={new Date(nextMatch.utcDate).getTime()} />
          </HomeSection>
        </Col>
      </Row>
    </>
  );
};

export default Home;
