import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={styles.navBar}>
      <h1 className={`color-primary ${styles.navBar__logo}`}>TrueTone</h1>
      <div className={styles.navBar__itemsContainer}>
        <a href="#" className={`btn ${styles.navBar__item}`}>
          Tuner
        </a>
        <a href="#" className={`btn ${styles.navBar__item}`}>
          Games
        </a>
        <a href="#" className={`btn ${styles.navBar__item}`}>
          Credits
        </a>
      </div>
    </div>
  );
};
export default NavBar;
