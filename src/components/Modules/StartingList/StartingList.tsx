import styles from "./StartingList.module.css";
import StartingLineup from "./StartingLineup/StartingLineup";
import StartingSubs from "./StartingSubs/StartingSubs";

const StartingList = () => {
  return (
    <section>
      <div className="badge mt-5">STARTING LINEUP</div>
      <table className={styles.table}>
        <tbody>
          <StartingLineup />
          <tr className="table-parity">
            <td colSpan={5}>
              <div className="badge mt-3 mb-3">SUBS</div>
            </td>
          </tr>
          <StartingSubs />
        </tbody>
      </table>
    </section>
  );
};

export default StartingList;
