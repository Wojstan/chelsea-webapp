import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navlist.module.css";
import { HomeOutlined, OrderedListOutlined } from "@ant-design/icons";

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
          <li>
            <HomeOutlined />
            <div>MATCHES</div>
          </li>
        </Link>
        <Link
          className={active === 1 ? styles.active : ""}
          onClick={() => setActive(1)}
          to="/table"
        >
          <li>
            <OrderedListOutlined />
            <div>TABLE</div>
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navlist;

/*
 <Link
          className={active === 2 ? styles.active : ""}
          onClick={() => setActive(2)}
          to="/players"
        >
          <li>
            <UsergroupAddOutlined />
            <div>PLAYERS</div>
          </li>
        </Link>
*/
