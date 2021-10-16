import { HomeOutlined, FundOutlined } from "@ant-design/icons";
import Logo from "../../Elements/Logo/Logo";

import styles from "./MobileMenu.module.css";

const MobileMenu = () => (
  <nav className={styles.mobile}>
    <Logo />
    <ul className={styles.menu}>
      <li>
        <HomeOutlined />
      </li>
      <li>
        <FundOutlined />
      </li>
    </ul>
  </nav>
);

export default MobileMenu;
