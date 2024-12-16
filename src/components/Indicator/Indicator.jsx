import styles from "./Indicator.module.css";

// Eliminamos la definición de las notas de aquí y las pasamos como prop desde Tuner
const Indicator = ({ frequency, note, selectedInstrument, instrumentNotes }) => {
  const getLineSize = (index) => {
    const activeIndex = 6;
    const distance = Math.abs(index - activeIndex);
    return 100 - distance * 15;
  };

  const getLineColor = (index, selectedNoteFreq) => {
    const activeIndex = 6;
    const lineFreq = selectedNoteFreq + (index - activeIndex) * 5;
    if (Math.abs(frequency - lineFreq) <= 2) {
      return styles.activeLine;
    }
    return styles.inactiveLine;
  };

  return (
    <div className={styles.indicator}>
      <div className={styles.indicator__screen}>
        {[...Array(13)].map((_, index) => {
          const selectedNote = instrumentNotes.find((n) => n.note === note);
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
