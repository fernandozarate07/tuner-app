import Indicator from "../Indicator/Indicator";
import InstrumentsBar from "../InstrumentsBar/InstrumentsBar";
import Notes from "../Notes/Notes";
import styles from "./Tuner.module.css";
import { useState } from "react";

const Tuner = () => {
  const [selectedInstrument, setSelectedInstrument] = useState("guitar");

  return (
    <div className={styles.tuner}>
      <div className={styles.tuner__header}>
        <InstrumentsBar setSelectedInstrument={setSelectedInstrument} selectedInstrument={selectedInstrument} />
        <Notes selectedInstrument={selectedInstrument} />
      </div>
      <Indicator />
    </div>
  );
};

export default Tuner;
