import styles from "./InstrumentsBar.module.css";

const InstrumentsBar = ({ setSelectedInstrument, selectedInstrument }) => {
  return (
    <div className={styles.instrumentsBar}>
      <div
        className={` btn ${styles.instrumentsBar__item} ${selectedInstrument === "guitar" ? "active" : "inactive"}`}
        onClick={() => setSelectedInstrument("guitar")}>
        Guitarra
      </div>
      <div
        className={` btn ${styles.instrumentsBar__item} ${selectedInstrument === "bass" ? "active" : "inactive"}`}
        onClick={() => setSelectedInstrument("bass")}>
        Bajo
      </div>
      <div
        className={` btn ${styles.instrumentsBar__item} ${selectedInstrument === "ukulele" ? "active" : "inactive"}`}
        onClick={() => setSelectedInstrument("ukulele")}>
        Ukulele
      </div>
    </div>
  );
};

export default InstrumentsBar;
