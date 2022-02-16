import football from "../../../../images/football.png";
import assist from "../../../../images/assist.png";
import { StarOutlined } from "@ant-design/icons";

type Props = {
  number: number;
  nation: string;
  name: string;
  last: string;
  rating: number;
  isParity: boolean;
  goalNumber: number;
  asssitNumber: number;
};

const StartingItem = ({
  number,
  nation,
  name,
  last,
  rating,
  isParity,
  goalNumber,
  asssitNumber,
}: Props) => (
  <tr className={`${isParity ? "table-parity" : ""}`}>
    <td style={{ width: "10%" }}>{number}</td>
    <td>
      <img src={nation} alt="" style={{ borderRadius: "5px" }} />
    </td>
    <td>
      {name} {last}
    </td>
    <td>
      {[...Array(goalNumber)].map((block) => (
        <img className="mr-2" src={football} alt="" />
      ))}
      {[...Array(asssitNumber)].map((block) => (
        <img className="mr-2" src={assist} alt="" />
      ))}
    </td>
    <td>
      <StarOutlined /> {rating === 0 ? "-" : rating}
    </td>
  </tr>
);

export default StartingItem;
