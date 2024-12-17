import styles from "./Indicator.module.css";

// Componente Indicator que muestra el estado del afinador visualmente
const Indicator = ({ frequency, note, instrumentNotes, isRunning, setIsRunning }) => {
  const activeIndex = 6; // Índice de la línea central (nota afinada correctamente)

  // Función para calcular el tamaño de cada línea según su distancia a la línea central
  const getLineSize = (index) => {
    const distance = Math.abs(index - activeIndex);
    return 100 - distance * 15; // Reduce el tamaño en función de la distancia
  };

  // Función para determinar el color de cada línea según la proximidad a la frecuencia correcta
  const getLineColor = (index) => {
    const selectedNote = instrumentNotes.find((n) => n.note === note);
    // Calcular la frecuencia de la línea actual en relación con la frecuencia de la nota seleccionada
    const lineFreq = selectedNote ? selectedNote.freq + (index - activeIndex) * 5 : 0;
    const tolerance = 2; // Tolerancia de ±2 Hz para considerar que está cerca

    // Determinar el color según la proximidad a la frecuencia
    if (Math.abs(frequency - lineFreq) <= tolerance) {
      if (index < 3) {
        return styles.redLine; // Líneas rojas a la izquierda
      } else if (index < 6) {
        return styles.yellowLine; // Líneas amarillas cerca de la central
      } else if (index === activeIndex) {
        return styles.greenLine; // Línea verde en el centro
      } else if (index < 10) {
        return styles.yellowLine; // Líneas amarillas cerca de la central
      } else {
        return styles.redLine; // Líneas rojas a la derecha
      }
    }
    return styles.inactiveLine; // Línea inactiva si no está cerca de la frecuencia correcta
  };

  // Determina si la línea central está activa (cuando la frecuencia está dentro de la tolerancia)
  const selectedNote = instrumentNotes.find((n) => n.note === note);
  const isCentralLineActive = selectedNote && Math.abs(frequency - selectedNote.freq) <= 2;
  const noteColorClass = isCentralLineActive ? styles.greenNote : styles.defaultNote; // Color de la nota mostrada

  return (
    <div className={styles.indicator}>
      <div className={styles.indicator__screen}>
        {/* Renderiza 13 líneas para el indicador visual */}
        {[...Array(13)].map((_, index) => {
          const lineColor = getLineColor(index);

          return (
            <div key={index} className={styles.indicator__lineContainer}>
              <div
                className={`${styles.indicator__line} ${isRunning ? lineColor : ""}`} // Aplica el color solo si está en ejecución
                style={{ height: `${getLineSize(index)}%` }} // Establece la altura de la línea
              />
            </div>
          );
        })}
      </div>

      {/* Muestra la nota detectada */}
      <div className={`flex-c-c-column ${styles.indicator__noteDisplay}`}>
        <span className={`${styles.indicator__item} ${styles.indicator__note} ${noteColorClass}`}>{note || "-"}</span>
      </div>

      {/* Botones para iniciar y detener el afinador */}
      <div className={`flex-c-c ${styles.indicator__btnContainer}`}>
        <button className={`btn ${styles.indicator__btn}`} onClick={() => setIsRunning(true)}>
          <i className="fa-solid fa-microphone"></i>
        </button>
        <button className={`btn ${styles.indicator__btn}`} onClick={() => setIsRunning(false)}>
          <i className="fa-solid fa-pause"></i>
        </button>
      </div>
    </div>
  );
};
export default Indicator;
