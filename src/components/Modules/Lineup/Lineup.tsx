import { Spin } from "antd";
import { Fragment, useState } from "react";
import { useGetPlayersQuery } from "../../../services/localAPI";
import DragPitch from "../../Elements/DragPitch/DragPitch";
import LineupPlayer from "../../Elements/LineupPlayer/LineupPlayer";
import styles from "./Lineup.module.css";

import { Player } from "../../../types/player";

const Lineup = () => {
  const { data, isFetching } = useGetPlayersQuery(0);
  const [dragging, setDragging] = useState<any>({});

  if (isFetching) {
    return <Spin />;
  }

  return (
    <div className={styles.flex}>
      <section className={styles.formation}>
        <DragPitch draggingObject={dragging} />
      </section>

      <section className={styles.list}>
        <div className="badge mb-4">PLAYERS</div>
        <ol className={styles.ol}>
          {data.map(
            (
              block: {
                name: string;
                players: Array<Player>;
              },
              i: number
            ) => (
              <Fragment key={i}>
                <div className={`badge mb-3 ${i > 0 ? "mt-4" : ""}`}>
                  {block.name.toUpperCase()}
                </div>
                {block.players.map((player, j) => (
                  <LineupPlayer
                    key={j}
                    dragEnd={() => setDragging(player)}
                    dragStart={() => setDragging({})}
                    avatar={player.img}
                    name={player.name}
                    lastName={player.last}
                    number={player.number}
                    nation={player.nation}
                  />
                ))}
              </Fragment>
            )
          )}
        </ol>
      </section>
    </div>
  );
};

export default Lineup;
