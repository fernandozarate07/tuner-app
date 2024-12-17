import styles from "./NavBar.module.css";
import { useState } from "react";

const NavBar = ({ setSection }) => {
  const [pushIcon, setPushIcon] = useState(false);
  const handleClick = () => {
    setPushIcon((prevState) => !prevState);
  };
  return (
    <div className={`pading-bl-20 ${styles.navBar}`}>
      <h1 className={`color-primary ${styles.navBar__logo}`}>TrueTone</h1>
      <div
        className={`${!pushIcon ? styles["display-invisible"] : styles["display-visible"]} ${
          styles.navBar__itemsContainer
        }`}>
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
      <button className={styles.navBar__menuIcon} onClick={handleClick}>
        <i className="fa-solid fa-bars"></i>
      </button>
    </div>
  );
};
export default NavBar;
