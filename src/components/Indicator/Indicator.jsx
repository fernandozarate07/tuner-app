import styles from "./Indicator.module.css";

// Eliminamos la definición de las notas de aquí y las pasamos como prop desde Tuner
const Indicator = ({ frequency, note, selectedInstrument, instrumentNotes }) => {
  const getLineSize = (index) => {
    const activeIndex = 6;
    const distance = Math.abs(index - activeIndex);
    return 100 - distance * 15;
  };

  const getLineColor = (index) => {
    const activeIndex = 6;
    const selectedNote = instrumentNotes.find((n) => n.note === note);
    const lineFreq = selectedNote ? selectedNote.freq + (index - activeIndex) * 5 : 0;

    // Usar una pequeña tolerancia para detectar si la frecuencia está cerca
    const tolerance = 2; // 2 Hz de tolerancia

    if (Math.abs(frequency - lineFreq) <= tolerance) {
      // Aquí se cambia el color dependiendo de la cercanía
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
        <span className={`${styles.indicator__item} ${styles.indicator__note}`}>{note || "-"}</span>
        <span className={`${styles.indicator__item} ${styles.indicator__frequency}`}>
          {frequency ? `${frequency} Hz` : "(Detecting...)"}
        </span>
      </div>
    </div>
  );
};

export default Indicator;
