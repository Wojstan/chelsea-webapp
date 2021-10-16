import { Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import styles from "./MatchCountdown.module.css";

type Props = {
  nextMatch: number;
};

const { Title } = Typography;

const MatchCountdown = ({ nextMatch }: Props) => {
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
    <span className={styles.countdown} style={{ zIndex: 5 }}>
      <Title>
        {days} {days === 1 ? "day" : "days"}
      </Title>
      <Title>
        {hours} {hours === 1 ? "hour" : "hours"}
      </Title>
      <Title>
        {minutes} {minutes === 1 ? "minute" : "minutes"}
      </Title>
      <Title>
        {seconds} {seconds === 1 ? "second" : "seconds"}
      </Title>
    </span>
  );
};

export default MatchCountdown;
