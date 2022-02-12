import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { modifyRating } from "../../../services/matchSlice";
import styles from "./RatingPlayer.module.css";

type Props = {
  id: number;
  avatar: string;
  name: string;
  lastName: string;
  rating: number;
};

const RatingPlayer = ({ id, avatar, name, lastName, rating }: Props) => {
  const dispatch = useDispatch();
  const { matchId } = useParams<{ matchId?: string }>();

  const handleChange = (event: any) => {
    dispatch(
      modifyRating({
        pageId: matchId as string,
        id: id,
        rating: Number(event.target.value),
      })
    );
  };

  return (
    <li className={styles.cont}>
      <div className={styles.block}>
        <span>
          <div className={styles.playerimg}>
            <img src={avatar} alt="" />
          </div>

          <div>
            <h5>{name}</h5>
            <h4>{lastName}</h4>
          </div>
        </span>

        <select value={rating} onChange={handleChange}>
          <option value={0}>-</option>
          {[...Array(10)].map((rate, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
    </li>
  );
};

export default RatingPlayer;
