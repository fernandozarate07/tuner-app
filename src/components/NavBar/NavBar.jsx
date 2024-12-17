import styles from "./NavBar.module.css";

const NavBar = ({ setSection }) => {
  return (
    <div className={`pading-bl-20 ${styles.navBar}`}>
      <h1 className={`color-primary ${styles.navBar__logo}`}>TrueTone</h1>
      <div className={styles.navBar__itemsContainer}>
        <button className={`btn ${styles.navBar__item}`} onClick={() => setSection("tuner")}>
          Afinar
        </button>
        <button href="#" className={`btn ${styles.navBar__item}`} onClick={() => setSection("games")}>
          Juegos
        </button>
        {/* <a href="#" className={`btn ${styles.navBar__item}`}>
          Credits
        </a> */}
      </div>
      <button className={styles.navBar__menuIcon}>
        <i className="fa-solid fa-bars"></i>
      </button>
    </div>
  );
};
export default NavBar;
