import { Layout } from "antd";

const { Header, Footer, Sider, Content } = Layout;

const App = () => {
  return (
    <Layout>
      <Sider>side</Sider>
      <Layout>
        <Header>header</Header>
        <Content>content</Content>
        <Footer>footer</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
