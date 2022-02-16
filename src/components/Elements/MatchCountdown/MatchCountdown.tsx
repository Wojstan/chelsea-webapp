import { useCallback, useEffect, useState } from "react";
import styles from "./MatchCountdown.module.css";

type Props = {
  nextMatch: number;
  awayTeam: string;
};

const MatchCountdown = ({ nextMatch, awayTeam }: Props) => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const { days, hours, minutes, seconds } = time;

  const tick = useCallback(() => {
    const now = new Date().getTime();
    const distance = nextMatch - now;

    setTime({
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    });
  }, [nextMatch]);

  useEffect(() => {
    tick();
    const timer = setInterval(tick, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [tick]);

  return (
    <h6 className={styles.countdown}>
      NEXT GAME: {days}D {hours}H {minutes}M {seconds}S with{" "}
      <strong>{awayTeam}</strong>
    </h6>
  );
};

export default MatchCountdown;
