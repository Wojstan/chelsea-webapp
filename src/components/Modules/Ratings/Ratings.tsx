import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMatch } from "../../../services/matchSlice";
import { Player } from "../../../types/player";
import RatingPlayer from "../../Elements/RatingPlayer/RatingPlayer";

const Ratings = () => {
  const matchData = useSelector((state: any) => state.match);
  const { lineup, subs } = matchData.game;
  const dispatch = useDispatch();
  const { matchId } = useParams<{ matchId?: string }>();

  useEffect(() => {
    dispatch(getMatch({ id: Number(matchId) }));
  }, [dispatch, matchId]);

  return (
    <div>
      <div className="badge mb-4">LINEUP</div>
      <br />
      {lineup.map((player: Player) => (
        <RatingPlayer
          key={player.id}
          id={player.id}
          avatar={player.img}
          name={player.name}
          lastName={player.last}
          rating={player.rating}
        />
      ))}
      <br />
      <div className="badge mt-5 mb-4">SUBS</div>
      <br />
      {subs.map((player: Player) => (
        <RatingPlayer
          key={player.id}
          id={player.id}
          avatar={player.img}
          name={player.name}
          lastName={player.last}
          rating={player.rating}
        />
      ))}
    </div>
  );
};

export default Ratings;
