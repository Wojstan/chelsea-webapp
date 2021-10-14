import { Spin } from "antd";
import { useGetPremierLeagueStandingsQuery } from "../../../services/footbalAPI";

import styles from "./PLTable.module.css";

const PLTable = () => {
  const { data, isFetching } = useGetPremierLeagueStandingsQuery(0);

  const tableData = data?.standings[0].table;

  if (isFetching) {
    return <Spin size="large" />;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>POS.</th>
          <th>TEAM</th>
          <th>M</th>
          <th>B</th>
          <th>P</th>
        </tr>
      </thead>

      <tbody>
        {tableData.map(
          (team: any, i: number) =>
            i < 10 && (
              <tr
                className={
                  team.team.name === "Chelsea FC" ? styles.chelsea : ""
                }
                key={team.position}
              >
                <td>{team.position}</td>
                <td className={styles.team}>
                  <div className={styles.logo}>
                    <img src={team.team.crestUrl} alt="" />
                  </div>
                  {team.team.name}
                </td>
                <td>{team.playedGames}</td>
                <td>
                  {team.goalsFor}:{team.goalsAgainst}
                </td>
                <td
                  className={
                    team.team.name === "Chelsea FC"
                      ? styles.chelsea
                      : styles.points
                  }
                >
                  {team.points}
                </td>
              </tr>
            )
        )}
      </tbody>
    </table>
  );
};

export default PLTable;
