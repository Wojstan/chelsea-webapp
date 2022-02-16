import styles from "./LineupPlayer.module.css";

type Props = {
  avatar: string;
  name: string;
  lastName: string;
  number: number;
  nation: string;
  dragStart: () => void;
  dragEnd: () => void;
};

const LineupPlayer = ({
  avatar,
  name,
  lastName,
  number,
  dragStart,
  dragEnd,
}: Props) => {
  return (
    <li
      draggable
      onDragStart={dragEnd}
      onDragEnd={dragStart}
      className={styles.block}
    >
      <span>
        <div className={styles.playerimg}>
          <img src={avatar} alt="" />
        </div>

        <div>
          <h5>{name}</h5>
          <h4>{lastName}</h4>
        </div>
      </span>

      <h4>{number}</h4>
    </li>
  );
};

export default LineupPlayer;
