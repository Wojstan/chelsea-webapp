import styles from "./Players.module.css";

const Players = () => {
  return (
    <main>
      <div className="container" style={{ display: "flex" }}>
        <section className={styles.players}>
          <h1>Players</h1>
        </section>
        <section className={styles.lineup}>
          <h1>Lineup & Ratings</h1>

          <div className={styles.playerimg}>
            <img
              src="https://resources.premierleague.com/premierleague/photos/players/250x250/p228286.png"
              alt=""
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Players;
