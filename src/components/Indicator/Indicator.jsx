import styles from "./Indicator.module.css";

// Eliminamos la definición de las notas de aquí y las pasamos como prop desde Tuner
const Indicator = ({ frequency, note, instrumentNotes }) => {
  const activeIndex = 6; // Índice de la línea central

  const getLineSize = (index) => {
    const distance = Math.abs(index - activeIndex);
    return 100 - distance * 15;
  };

  const getLineColor = (index) => {
    const selectedNote = instrumentNotes.find((n) => n.note === note);
    const lineFreq = selectedNote ? selectedNote.freq + (index - activeIndex) * 5 : 0;

    // Usar una pequeña tolerancia para detectar si la frecuencia está cerca
    const tolerance = 2; // 2 Hz de tolerancia

    if (Math.abs(frequency - lineFreq) <= tolerance) {
      if (index < 3) {
        return styles.redLine; // Primera sección roja
      } else if (index < 6) {
        return styles.yellowLine; // Segunda sección amarilla
      } else if (index === activeIndex) {
        return styles.greenLine; // Línea central verde
      } else if (index < 10) {
        return styles.yellowLine; // Cuarta sección amarilla
      } else {
        return styles.redLine; // Última sección roja
      }
    }
    return styles.inactiveLine; // Línea inactiva (negra por defecto)
  };

  // Verificar si la línea central debe estar activa para aplicar el color a la nota
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
              <div className={`${styles.indicator__line} ${lineColor}`} style={{ height: `${getLineSize(index)}%` }} />
            </div>
          );
        })}
      </div>
      <div className={`flex-c-c-column ${styles.indicator__noteDisplay}`}>
        <span className={`${styles.indicator__item} ${styles.indicator__note} ${noteColorClass}`}>{note || "-"}</span>
      </div>
      <div className={`flex-c-c ${styles.indicator__btnContainer}`}>
        <button className={`btn ${styles.indicator__btn}`}>Start</button>
        <button className={`btn ${styles.indicator__btn}`}>Pause</button>
      </div>
    </div>
  );
};

export default Indicator;
