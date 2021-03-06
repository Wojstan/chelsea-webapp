import styles from "./DragPitch.module.css";
import pitchImg from "../../../images/pitch.png";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addLineup,
  addSub,
  getMatch,
  resetMatch,
} from "../../../services/matchSlice";
import { Spin } from "antd";
import { Player } from "../../../types/player";
import { formation, subPlayers } from "./formations";

type Props = {
  draggingObject: any;
};

const DragPitch = ({ draggingObject }: Props) => {
  const { matchId } = useParams<{ matchId?: string }>();

  const matchData = useSelector((state: any) => state.match);
  const { lineup, subs } = matchData.game;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMatch({ id: Number(matchId) }));
  }, [dispatch, matchId]);

  const onDragOver = (e: any): void => {
    e.preventDefault();
  };

  const onDragEnter = (e: any): void => {
    e.preventDefault();

    const element = e.target as HTMLElement;
    element.classList.add("dragenter");
  };

  const onDragLeave = (e: any): void => {
    e.preventDefault();

    const element = e.target as HTMLElement;
    element.classList.remove("dragenter");
  };

  const onDrop = (
    e: any,
    id: number,
    top: string,
    left: string,
    isSub: boolean
  ): void => {
    e.preventDefault();

    const element = e.target as HTMLElement;
    element.classList.remove("dragenter");

    const newPlayer = {
      ...draggingObject,
      rating: 0,
      position: {
        id: id,
        top: top,
        left: left,
      },
    };

    isSub
      ? dispatch(addSub({ id: Number(matchId), newPlayer }))
      : dispatch(addLineup({ id: Number(matchId), newPlayer }));
  };

  const isInTheLineup = (id: number) =>
    lineup.filter((player: Player) => player.position.id === id).length
      ? true
      : false;

  const isInTheSub = (id: number) =>
    subs.filter((player: Player) => player.position.id === id).length
      ? true
      : false;

  if (lineup === undefined) {
    return <Spin />;
  }

  return (
    <>
      <select className="mb-4 mr-2" name="" id="">
        <option value={1}>3-4-3</option>
        <option value={2}>4-4-2</option>
        <option value={3}>4-2-3-1</option>
      </select>
      <button
        className="btn active"
        onClick={() => dispatch(resetMatch({ pageId: matchId as string }))}
      >
        RESET LINEUP
      </button>

      <div className={styles.pitch}>
        <img src={pitchImg} alt="" />

        {formation.map(
          (element, i) =>
            !isInTheLineup(element.id) && (
              <div
                key={i}
                onDragEnter={(e) => onDragEnter(e)}
                onDragOver={(e) => onDragOver(e)}
                onDragLeave={(e) => onDragLeave(e)}
                onDrop={(e) =>
                  onDrop(e, element.id, element.top, element.left, false)
                }
                className={styles.formation}
                style={{
                  top: element.top,
                  left: element.left,
                  opacity:
                    Object.keys(draggingObject).length === 0 ? "1" : "0.6",
                }}
              >
                {element.name}
              </div>
            )
        )}

        {lineup.map((player: Player, i: number) => (
          <div
            key={i}
            className={styles.player}
            style={{
              top: player.position.top,
              left: player.position.left,
            }}
          >
            <div>{player.number}</div>
            {player.last}
          </div>
        ))}
      </div>

      <div className="badge mt-3 mb-4">SUBS</div>

      <ul style={{ display: "flex" }} className="mb-4">
        {subs.map((player: Player, i: number) => (
          <li key={i} className={styles.subplayer}>
            <div>{player.number}</div>
            {player.last}
          </li>
        ))}
        {subPlayers.map(
          (sub, i) =>
            !isInTheSub(sub.id) && (
              <li
                key={i}
                onDragEnter={(e) => onDragEnter(e)}
                onDragOver={(e) => onDragOver(e)}
                onDragLeave={(e) => onDragLeave(e)}
                onDrop={(e) => onDrop(e, sub.id, "0", "0", true)}
                className={styles.subs}
                style={{
                  position: "static",
                  opacity:
                    Object.keys(draggingObject).length === 0 ? "1" : "0.6",
                }}
              >
                {sub.name}
              </li>
            )
        )}
      </ul>
    </>
  );
};

export default DragPitch;
