import { useState, useEffect } from "react";
import styles from "./Notes.module.css";

const Notes = ({ selectedInstrument }) => {
  const [fadeClass, setFadeClass] = useState(styles.fadeIn); // Estado para manejar la clase de la transición
  const [currentSection, setCurrentSection] = useState(selectedInstrument); // Estado para el instrumento actual
  const [pushIcon, setPushIcon] = useState(false); // Estado para el boton de notas musicales en la version movil.

  const handleClick = () => {
    setPushIcon((prevState) => !prevState);
  };

  let notes = [];

  if (currentSection === "guitar") {
    notes = ["E", "A", "D", "G", "B", "E"];
  } else if (currentSection === "bass") {
    notes = ["E", "A", "D", "G"];
  } else if (currentSection === "ukulele") {
    notes = ["G", "C", "E", "A"];
  }

  useEffect(() => {
    // Activamos la animación de salida
    setFadeClass(styles.fadeOut);

    // Después de que la animación de salida se complete, cambiamos el instrumento y aplicamos fade-in
    const timeout = setTimeout(() => {
      setCurrentSection(selectedInstrument);
      setFadeClass(styles.fadeIn);
    }, 500);

    return () => clearTimeout(timeout);
  }, [selectedInstrument]);

  return (
    <div className={styles.notesContainer}>
      <div
        className={`${!pushIcon ? styles["display-invisible"] : styles["display-visible"]} ${
          styles.notes
        } ${fadeClass}`}>
        {notes.map((note, index) => (
          <div key={index} className={styles.notes__item}>
            {note}
          </div>
        ))}
      </div>
      <button className={styles.menuIcon} onClick={handleClick}>
        <i className="fa-brands fa-itunes-note"></i>
      </button>
    </div>
  );
};

export default Notes;
