import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Spin } from "antd";
import { Player } from "../../../../types/player";
import { getMatch } from "../../../../services/matchSlice";
import StartingItem from "../StartingItem/StartingItem";
import { MatchEvent } from "../../../../types/matchEvent";

const StartingSubs = () => {
  const { matchId } = useParams<{ matchId?: string }>();

  const matchData = useSelector((state: any) => state.match);
  const { subs, events } = matchData.game;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMatch({ id: Number(matchId) }));
  }, [dispatch, matchId]);

  if (!subs) {
    return <Spin />;
  }

  if (subs.length === 0) {
    return <tr className="table-parity"></tr>;
  }

  return (
    <>
      <tr className="table-parity">
        <td colSpan={5}>
          <div className="badge mt-3 mb-3">SUBS</div>
        </td>
      </tr>
      {subs.map((player: Player, i: number) => (
        <StartingItem
          key={i}
          name={player.name}
          last={player.last}
          nation={player.nation}
          rating={player.rating}
          isParity={i % 2 === 0}
          number={player.number}
          goalNumber={
            events.filter((event: MatchEvent) => event.goal === player.last)
              .length
          }
          asssitNumber={
            events.filter((event: MatchEvent) => event.assist === player.last)
              .length
          }
        />
      ))}
    </>
  );
};

export default StartingSubs;
