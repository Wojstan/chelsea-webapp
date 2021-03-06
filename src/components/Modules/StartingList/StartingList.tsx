import styles from "./StartingList.module.css";
import StartingLineup from "./StartingLineup/StartingLineup";
import StartingSubs from "./StartingSubs/StartingSubs";

const StartingList = () => (
  <section>
    <div className="badge mt-5">STARTING LINEUP</div>
    <table className={styles.table}>
      <tbody>
        <StartingLineup />

        <StartingSubs />
      </tbody>
    </table>
  </section>
);

export default StartingList;
