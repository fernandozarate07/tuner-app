import styles from "./InstrumentsBar.module.css";

const InstrumentsBar = ({ setSelectedInstrument, selectedInstrument }) => {
  return (
    <div className={styles.instrumentsBar}>
      <div
        className={`${styles.instrumentsBar__item} ${
          selectedInstrument === "guitar" ? styles.active : styles.inactive
        }`}
        onClick={() => setSelectedInstrument("guitar")}>
        Guitar
      </div>
      <div
        className={`${styles.instrumentsBar__item} ${selectedInstrument === "bass" ? styles.active : styles.inactive}`}
        onClick={() => setSelectedInstrument("bass")}>
        Bass
      </div>
      <div
        className={`${styles.instrumentsBar__item} ${
          selectedInstrument === "ukulele" ? styles.active : styles.inactive
        }`}
        onClick={() => setSelectedInstrument("ukulele")}>
        Ukulele
      </div>
    </div>
  );
};

export default InstrumentsBar;
