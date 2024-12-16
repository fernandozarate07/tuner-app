import styles from "./Games.module.css";

const Games = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>¡Oops!</h1>
      <div>
        <p className={styles.message}>Estamos trabajando en esta sección.</p>
        <p className={styles.message}>Por favor, vuelve más tarde.</p>
      </div>
    </div>
  );
};

export default Games;
