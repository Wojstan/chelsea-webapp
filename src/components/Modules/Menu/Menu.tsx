import { Menu } from "antd";
import { HomeOutlined, FundOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import Logo from "../../Elements/Logo/Logo";

const MyMenu = () => (
  <>
    <Logo />
    <Menu
      inlineIndent={992}
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
