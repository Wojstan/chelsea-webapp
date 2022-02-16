import { Spin } from "antd";
import logo from "../../../images/logo.svg";
import { useGetChelseaMatchesQuery } from "../../../services/footbalAPI";
import { Match } from "../../../views/Home/match";
import MatchCountdown from "../../Elements/MatchCountdown/MatchCountdown";
import styles from "./Header.module.css";
import Navlist from "./Navlist/Navlist";

type Props = {
  fullHeader: boolean;
};

const Header = ({ fullHeader }: Props) => {
  const { data, isFetching } = useGetChelseaMatchesQuery(0);

  const fixture: Array<Match> = data?.scheudled!;

  if (isFetching) {
    return <Spin size="large" />;
  }

  return (
    <>
      <aside className={styles.top}>
        <div className="container">
          <MatchCountdown
            awayTeam={
              fixture[0].awayTeam.name === "Chelsea FC"
                ? fixture[0].homeTeam.name
                : fixture[0].awayTeam.name
            }
            nextMatch={new Date(fixture[0].utcDate).getTime()}
          />
        </div>
      </aside>
      {fullHeader && (
        <header className={styles.header}>
          <div className="container">
            <div className={styles.flex}>
              <div className={styles.logo}>
                <img src={logo} alt="" />
              </div>
              <article>
                <h1 className={styles.brand}>CHELSEA WEBAPP</h1>
                <p>Save the results, rate the players</p>
              </article>
            </div>
            <Navlist />
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
