import { Spin } from "antd";
import { useGetPremierLeagueStandingsQuery } from "../../../services/footbalAPI";

import styles from "./PLTable.module.css";

const PLTable = () => {
  const { data, isFetching } = useGetPremierLeagueStandingsQuery(0);

  const tableData = data?.standings[0].table;

  if (isFetching) {
    return <Spin size="large" />;
  }

  console.log(tableData);

  return (
    <div className={styles.scroll}>
      <h5 className="mb-3">2021/2022</h5>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>POS.</th>
            <th>TEAM</th>
            <th>M</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>B</th>
            <th>P</th>
          </tr>
        </thead>

        <tbody>
          {tableData.map((team: any, i: number) => (
            <tr
              className={team.team.name === "Chelsea FC" ? styles.chelsea : ""}
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
              <td>{team.won}</td>
              <td>{team.draw}</td>
              <td>{team.lost}</td>
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PLTable;
