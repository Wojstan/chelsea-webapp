import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Statistic } from "antd";
import HomeSection from "../HomeSection/HomeSection";

const StatSections = () => (
  <>
    <HomeSection title="AVG xG" style={{ minHeight: "11.7rem" }}>
      <div style={{ display: "flex" }}>
        <Statistic
          prefix={<ArrowUpOutlined />}
          valueStyle={{ color: "#3f8600" }}
          title="AVG xG per match"
          value={3.53}
          style={{ marginRight: "1.5rem" }}
        />

        <Statistic
          prefix={<ArrowUpOutlined />}
          valueStyle={{ color: "#3f8600" }}
          title="AVG xGA per match"
          value={0.53}
        />
      </div>
    </HomeSection>

    <HomeSection title="Last match stats" style={{ minHeight: "11.7rem" }}>
      <div style={{ display: "flex" }}>
        <Statistic
          prefix={<ArrowDownOutlined />}
          valueStyle={{ color: "#cf1322" }}
          title="Last match xG"
          value={2.51}
          style={{ marginRight: "1.5rem" }}
        />
        <Statistic
          prefix={<ArrowUpOutlined />}
          valueStyle={{ color: "#3f8600" }}
          title="Last match xGA"
          value={0.11}
        />
      </div>
    </HomeSection>
  </>
);

export default StatSections;
