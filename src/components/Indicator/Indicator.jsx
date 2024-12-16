import styles from "./Indicator.module.css";

const Indicator = ({ frequency, note, instrumentNotes, isRunning, setIsRunning }) => {
  const activeIndex = 6;

  const getLineSize = (index) => {
    const distance = Math.abs(index - activeIndex);
    return 100 - distance * 15;
  };

  const getLineColor = (index) => {
    const selectedNote = instrumentNotes.find((n) => n.note === note);
    const lineFreq = selectedNote ? selectedNote.freq + (index - activeIndex) * 5 : 0;
    const tolerance = 2;

    if (Math.abs(frequency - lineFreq) <= tolerance) {
      if (index < 3) {
        return styles.redLine;
      } else if (index < 6) {
        return styles.yellowLine;
      } else if (index === activeIndex) {
        return styles.greenLine;
      } else if (index < 10) {
        return styles.yellowLine;
      } else {
        return styles.redLine;
      }
    }
    return styles.inactiveLine;
  };

  const selectedNote = instrumentNotes.find((n) => n.note === note);
  const isCentralLineActive = selectedNote && Math.abs(frequency - selectedNote.freq) <= 2;
  const noteColorClass = isCentralLineActive ? styles.greenNote : styles.defaultNote;

  return (
    <div className={styles.indicator}>
      <div className={styles.indicator__screen}>
        {[...Array(13)].map((_, index) => {
          const lineColor = getLineColor(index);

          return (
            <div key={index} className={styles.indicator__lineContainer}>
              <div
                className={`${styles.indicator__line} ${isRunning ? lineColor : ""}`}
                style={{ height: `${getLineSize(index)}%` }}
              />
            </div>
          );
        })}
      </div>
      <div className={`flex-c-c-column ${styles.indicator__noteDisplay}`}>
        <span className={`${styles.indicator__item} ${styles.indicator__note} ${noteColorClass}`}>{note || "-"}</span>
      </div>
      <div className={`flex-c-c ${styles.indicator__btnContainer}`}>
        <button className={`btn ${styles.indicator__btn}`} onClick={() => setIsRunning(true)}>
          Start
        </button>
        <button className={`btn ${styles.indicator__btn}`} onClick={() => setIsRunning(false)}>
          Pause
        </button>
      </div>
    </div>
  );
};

export default Indicator;
