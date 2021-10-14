import { Card } from "antd";

type Props = {
  children?: React.ReactNode;
  style?: any;
};

const HomeSection = ({ children, style }: Props) => (
  <section>
    <Card style={style} bordered={false}>
      {children}
    </Card>
  </section>
);

export default HomeSection;
