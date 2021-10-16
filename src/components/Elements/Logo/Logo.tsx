import { Typography } from "antd";
import styles from "./Logo.module.css";

const { Title } = Typography;

const Logo = () => (
  <div className={styles.brand}>
    <img
      className={styles.logo}
      height={60}
      src="https://upload.wikimedia.org/wikipedia/fr/5/51/Logo_Chelsea.svg"
      alt=""
    />
    <Title type="secondary" level={2}>
      <span className={styles.blue}>Chelsea</span>
      <br />
      Webapp
    </Title>
  </div>
);

export default Logo;
