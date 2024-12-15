import { useState } from "react";
import styles from "./Tuner.module.css";
const Tuner = () => {
  const [selecterInstrument, setSelecterInstrument] = useState("guitar");
  return (
    <div className={styles.tuner}>
      {/* instrumentsBar */}
      <div className={styles.tuner__instrumentsBar}>
        <div
          className={`${styles.tuner__item} ${selecterInstrument === "guitar" ? "active" : "inactive"}`}
          onClick={() => setSelecterInstrument("guitar")}>
          Guitar
        </div>
        <div
          className={`${styles.tuner__item} ${selecterInstrument === "bass" ? "active" : "inactive"}`}
          onClick={() => setSelecterInstrument("bass")}>
          Bass
        </div>
        <div
          className={`${styles.tuner__item} ${selecterInstrument === "ukulele" ? "active" : "inactive"}`}
          onClick={() => setSelecterInstrument("ukulele")}>
          Ukulele
        </div>
      </div>
      {/* tuner */}
      <div className={styles.tuner__content}></div>
    </div>
  );
};
export default Tuner;
