import { useState } from "react";
import styles from "./InstrumentsBar.module.css";

const InstrumentsBar = ({ setSelectedInstrument, selectedInstrument }) => {
  const [pushIcon, setPushIcon] = useState(false); // Estado para el boton de menu de instrumentos
  const handleClick = () => {
    setPushIcon((prevState) => !prevState);
  };

  return (
    <div className={styles.barContainer}>
      <div
        className={`${!pushIcon ? styles["display-invisible"] : styles["display-visible"]} ${styles.instrumentsBar}`}>
        <button
          className={` btn ${styles.instrumentsBar__item} ${selectedInstrument === "guitar" ? "active" : "inactive"}`}
          onClick={() => setSelectedInstrument("guitar")}>
          Guitarra
        </button>
        <button
          className={` btn ${styles.instrumentsBar__item} ${selectedInstrument === "bass" ? "active" : "inactive"}`}
          onClick={() => setSelectedInstrument("bass")}>
          Bajo
        </button>
        <button
          className={` btn ${styles.instrumentsBar__item} ${selectedInstrument === "ukulele" ? "active" : "inactive"}`}
          onClick={() => setSelectedInstrument("ukulele")}>
          Ukulele
        </button>
      </div>
      <button className={styles.menuIcon} onClick={handleClick}>
        <i className="fa-solid fa-bars"></i>
      </button>
    </div>
  );
};

export default InstrumentsBar;
