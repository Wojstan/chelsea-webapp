import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addEvent,
  getMatch,
  modifyGoal,
} from "../../../../services/matchSlice";
import { Player } from "../../../../types/player";

type Props = {
  eventId: number;
  savedGoal: { id: number; goal: string; assist: string };
};

const GoalEvents = ({ eventId, savedGoal }: Props) => {
  const matchData = useSelector((state: any) => state.match);
  const { lineup, subs } = matchData.game;
  const dispatch = useDispatch();
  const { matchId } = useParams<{ matchId?: string }>();

  useEffect(() => {
    dispatch(getMatch({ id: Number(matchId) }));
  }, [dispatch, matchId]);

  const handleAddGoalSelect = (e: any) => {
    const playerId = Number(e.target.value.split("_")[0]);
    const playerName = e.target.value.split("_")[1];

    const newEvent = {
      id: playerId,
      goal: playerName,
      assist: "-",
    };

    dispatch(addEvent({ pageId: Number(matchId), newEvent }));
  };

  const handleModifyGoalSelect = (e: { target: { value: string } }) => {
    const playerId = Number(e.target.value.split("_")[0]);
    const playerName = e.target.value.split("_")[1];

    dispatch(
      modifyGoal({
        pageId: Number(matchId),
        id: playerId,
        goal: playerName,
      })
    );
  };

  const selectOption = (j: number, last: string) => (
    <option key={j} value={`${eventId + 1}_${last}`}>
      {last}
    </option>
  );

  return (
    <div>
      <h4>Goal {eventId + 1}</h4>
      <select
        value={savedGoal && `${eventId + 1}_${savedGoal.goal}`}
        onChange={savedGoal ? handleModifyGoalSelect : handleAddGoalSelect}
        name=""
        id=""
      >
        <>
          <option value="-">-</option>
          {lineup.map((player: Player, j: number) =>
            selectOption(j, player.last)
          )}
          {subs.map((player: Player, j: number) =>
            selectOption(j, player.last)
          )}
          <option value="OG">OWN GOAL</option>
        </>
      </select>
    </div>
  );
};

export default GoalEvents;
