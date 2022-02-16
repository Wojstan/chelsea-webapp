import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMatch, modifyAssist } from "../../../../services/matchSlice";
import { Player } from "../../../../types/player";

type Props = {
  eventId: number;
  savedGoal: { id: number; goal: string; assist: string };
};

const AssistEvents = ({ eventId, savedGoal }: Props) => {
  const matchData = useSelector((state: any) => state.match);
  const { lineup, subs } = matchData.game;
  const dispatch = useDispatch();
  const { matchId } = useParams<{ matchId?: string }>();

  useEffect(() => {
    dispatch(getMatch({ id: Number(matchId) }));
  }, [dispatch, matchId]);

  const handleAssistSelect = (e: { target: { value: string } }) => {
    const playerId = Number(e.target.value.split("_")[0]);
    const playerName = e.target.value.split("_")[1];

    dispatch(
      modifyAssist({
        pageId: Number(matchId),
        id: playerId,
        assist: playerName,
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
      <h4>Assist</h4>
      <select
        disabled={!savedGoal}
        onChange={handleAssistSelect}
        value={savedGoal && `${eventId + 1}_${savedGoal.assist}`}
        name=""
        id=""
        style={{ cursor: "auto" }}
      >
        <option value="-">-</option>
        {lineup.map(
          (player: Player, j: number) =>
            savedGoal && selectOption(j, player.last)
        )}
        {subs.map((player: Player, j: number) => selectOption(j, player.last))}
      </select>
    </div>
  );
};

export default AssistEvents;
