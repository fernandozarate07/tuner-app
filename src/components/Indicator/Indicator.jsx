import styles from "./Indicator.module.css";

const Indicator = ({ frequency, note, selectedInstrument }) => {
  const getLineSize = (index, selectedNoteFreq) => {
    const activeIndex = 6; // Este es el índice de la "nota central"
    const distance = Math.abs(index - activeIndex);
    return 100 - distance * 15;
  };

  // Definir las notas para cada instrumento
  const instrumentNotes = {
    guitar: [
      { note: "E2", freq: 82.41 },
      { note: "A2", freq: 110.0 },
      { note: "D3", freq: 146.83 },
      { note: "G3", freq: 196.0 },
      { note: "B3", freq: 246.94 },
      { note: "E4", freq: 329.63 },
    ],
    bass: [
      { note: "E1", freq: 41.2 },
      { note: "A1", freq: 55.0 },
      { note: "D2", freq: 73.42 },
      { note: "G2", freq: 98.0 },
    ],
    ukulele: [
      { note: "G4", freq: 392.0 },
      { note: "C4", freq: 261.63 },
      { note: "E4", freq: 329.63 },
      { note: "A4", freq: 440.0 },
    ],
  };

  const notes = instrumentNotes[selectedInstrument];

  const getLineColor = (index, selectedNoteFreq) => {
    const activeIndex = 6;
    const lineFreq = selectedNoteFreq + (index - activeIndex) * 5; // 5Hz interval for each line
    if (Math.abs(frequency - lineFreq) <= 2) {
      // ±2Hz margin for active line
      return styles.activeLine; // Clase CSS para pintar de verde
    }
    return styles.inactiveLine; // Clase CSS para las líneas inactivas
  };

  return (
    <div className={styles.indicator}>
      <div className={styles.indicator__screen}>
        {[...Array(13)].map((_, index) => {
          const selectedNote = notes.find((n) => n.note === note);
          const lineColor = selectedNote ? getLineColor(index, selectedNote.freq) : styles.inactiveLine;
          return (
            <div key={index} className={styles.indicator__lineContainer}>
              <div
                className={`${styles.indicator__line} ${lineColor}`}
                style={{ height: `${getLineSize(index, selectedNote ? selectedNote.freq : 0)}%` }}
              />
            </div>
          );
        })}
      </div>
      <div className={`flex-c-c-column ${styles.indicator__noteDisplay}`}>
        <span className={`${styles.indicator__item} ${styles.indicator__note}`}>{note || "-"}</span>
        <span className={`${styles.indicator__item} ${styles.indicator__frequency}`}>
          {frequency ? `${frequency} Hz` : "(Detecting...)"}
        </span>
      </div>
    </div>
  );
};

export default Indicator;
