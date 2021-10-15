import { Menu, Typography } from "antd";
import { HomeOutlined, FundOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";

import styles from "./Menu.module.css";

const { Title } = Typography;

const MyMenu = () => (
  <>
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
    <Menu
      defaultSelectedKeys={["1"]}
      style={{ height: "88vh", padding: "1.5rem", border: "none" }}
    >
      <Menu.Item key="1" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<FundOutlined />}>
        <Link to="/cryptocurrencies">Fixture Table</Link>
      </Menu.Item>
    </Menu>
  </>
);

export default MyMenu;
