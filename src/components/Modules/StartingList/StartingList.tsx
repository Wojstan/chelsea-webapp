import styles from "./StartingList.module.css";
import football from "../../../images/football.png";
import { StarOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { getMatch } from "../../../services/matchSlice";
import { Spin } from "antd";
import { Player } from "../../../types/player";

const StartingList = () => {
  const { matchId } = useParams<{ matchId?: string }>();

  const matchData = useSelector((state: any) => state.match);
  const { lineup } = matchData.game;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMatch({ id: Number(matchId) }));
  }, [dispatch, matchId]);

  if (!lineup) {
    return <Spin />;
  }

  return (
    <section>
      <div className="badge mt-5">STARTING LINEUP</div>
      <table className={styles.table}>
        <tbody>
          {lineup.map((player: Player, i: number) => (
            <Fragment key={i}>
              {i === 11 && (
                <tr>
                  <div className="badge mt-3 mb-3">SUBS</div>
                </tr>
              )}
              <tr className={`${i % 2 === 0 ? styles.parity : ""}`}>
                <td style={{ width: "10%" }}>{player.number}</td>
                <td>
                  <img
                    src={player.nation}
                    alt=""
                    style={{ borderRadius: "5px" }}
                  />
                </td>
                <td>
                  {player.name} {player.last}
                </td>
                <td>
                  <img src={football} alt="" /> <img src={football} alt="" />{" "}
                  <img src={football} alt="" />{" "}
                </td>
                <td>
                  <StarOutlined /> {player.rating}
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default StartingList;
