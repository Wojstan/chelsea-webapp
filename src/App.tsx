import { Layout } from "antd";
import Menu from "./components/Modules/Menu/Menu";
import Home from "./views/Home/Home";

const { Sider, Content, Header } = Layout;

const App = () => (
  <Layout>
    <Sider
      style={{
        overflow: "hidden",
        height: "100vh",
        position: "fixed",
        left: 0,
      }}
      width="18rem"
    >
      <Menu />
    </Sider>
    <Layout className="site-layout" style={{ marginLeft: "18rem" }}>
      <Header></Header>
      <Content>
        <Home />
      </Content>
    </Layout>
  </Layout>
);

export default App;
