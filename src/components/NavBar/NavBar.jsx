import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={`pading-bl-20 ${styles.navBar}`}>
      <h1 className={`color-primary ${styles.navBar__logo}`}>TrueTone</h1>
      <div className={styles.navBar__itemsContainer}>
        <button className={`btn ${styles.navBar__item}`}>Tuner</button>
        <button href="#" className={`btn ${styles.navBar__item}`}>
          Games
        </button>
        {/* <a href="#" className={`btn ${styles.navBar__item}`}>
          Credits
        </a> */}
      </div>
    </div>
  );
};
export default NavBar;
