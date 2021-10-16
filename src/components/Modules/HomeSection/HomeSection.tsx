import { Card, Typography } from "antd";

type Props = {
  children?: React.ReactNode;
  className?: string;
  style?: any;
  titleStyle?: any;
  title?: string;
};

const { Title } = Typography;

const HomeSection = ({ children, title, titleStyle, style }: Props) => (
  <section>
    <Card style={style} bordered={false}>
      {title && (
        <Title style={{ ...titleStyle, marginBottom: "2rem" }} level={3}>
          {title}
        </Title>
      )}

      {children}
    </Card>
  </section>
);

export default HomeSection;
