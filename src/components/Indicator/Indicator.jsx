import styles from "./Indicator.module.css";

// El componente Indicator ahora recibe la frecuencia y la nota como props
const Indicator = ({ frequency, note }) => {
  const getLineSize = (index) => {
    const activeIndex = 6; // Este es el índice de la "nota central"
    const distance = Math.abs(index - activeIndex);
    return 100 - distance * 15;
  };

  return (
    <div className={styles.indicator}>
      <div className={styles.indicator__screen}>
        {[...Array(13)].map((_, index) => (
          <div key={index} className={styles.indicator__lineContainer}>
            <div className={styles.indicator__line} style={{ height: `${getLineSize(index)}%` }}></div>
          </div>
        ))}
      </div>
      <div className={`flex-c-c-column ${styles.indicator__noteDisplay}`}>
        {/* Mostrar la nota más cercana */}
        <span className={`${styles.indicator__item} ${styles.indicator__note}`}>{note || "No note"}</span>
        {/* Mostrar la frecuencia detectada */}
        <span className={`${styles.indicator__item} ${styles.indicator__frequency}`}>
          {frequency ? `${frequency} Hz` : "(Detecting...)"}
        </span>
      </div>
    </div>
  );
};

export default Indicator;
