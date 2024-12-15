import styles from "./Notes.module.css";

const Notes = ({ selectedInstrument }) => {
  let notes = [];

  if (selectedInstrument === "guitar") {
    notes = ["E", "A", "D", "G", "B", "E"];
  } else if (selectedInstrument === "bass") {
    notes = ["E", "A", "D", "G"];
  } else if (selectedInstrument === "ukulele") {
    notes = ["G", "C", "E", "A"];
  }

  return (
    <div className={styles.notes}>
      {notes.map((note, index) => (
        <div key={index} className={styles.notes__item}>
          {note}
        </div>
      ))}
    </div>
  );
};

export default Notes;
