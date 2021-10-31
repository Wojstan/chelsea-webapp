import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navlist.module.css";

const Navlist = () => {
  const [active, setActive] = useState(0);

  return (
    <nav>
      <ul className={styles.navlist}>
        <Link
          className={active === 0 ? styles.active : ""}
          onClick={() => setActive(0)}
          to="/"
        >
          <li>Home</li>
        </Link>
        <Link
          className={active === 1 ? styles.active : ""}
          onClick={() => setActive(1)}
          to="/fixture"
        >
          <li>Fixture</li>
        </Link>
        <Link
          className={active === 2 ? styles.active : ""}
          onClick={() => setActive(2)}
          to="/results"
        >
          <li>Results</li>
        </Link>
        <li>Players</li>
      </ul>
    </nav>
  );
};

export default Navlist;
