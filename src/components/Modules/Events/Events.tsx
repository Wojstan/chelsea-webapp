import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMatch } from "../../../services/matchSlice";
import AssistEvents from "./AssistEvents/AssistEvents";
import styles from "./Events.module.css";
import GoalEvents from "./GoalEvents/GoalEvents";

type Props = {
  goalNumber: number;
};

const Events = ({ goalNumber }: Props) => {
  const matchData = useSelector((state: any) => state.match);
  const { events } = matchData.game;
  const dispatch = useDispatch();
  const { matchId } = useParams<{ matchId?: string }>();

  useEffect(() => {
    dispatch(getMatch({ id: Number(matchId) }));
  }, [dispatch, matchId]);

  return (
    <div>
      {[...Array(goalNumber)].map((block, i) => (
        <div key={i} className={styles.block}>
          <div className={styles.form}>
            <GoalEvents eventId={i} savedGoal={events[i]} />

            <AssistEvents eventId={i} savedGoal={events[i]} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Events;
