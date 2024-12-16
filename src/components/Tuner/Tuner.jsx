import { useState, useEffect, useRef } from "react";
import Indicator from "../Indicator/Indicator";
import InstrumentsBar from "../InstrumentsBar/InstrumentsBar";
import Notes from "../Notes/Notes";
import styles from "./Tuner.module.css";

const Tuner = () => {
  const [selectedInstrument, setSelectedInstrument] = useState("guitar");
  const [frequency, setFrequency] = useState(null); // Para la frecuencia detectada
  const [note, setNote] = useState(null); // Para la nota detectada
  const [error, setError] = useState(null); // Para manejar errores

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const dataArrayRef = useRef(null);

  useEffect(() => {
    // Iniciar el audio context y conectar el micrófono
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 4096;
        dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.smoothingTimeConstant = 0.85;
        microphoneRef.current.connect(analyserRef.current);
        updateFrequency();
      })
      .catch((err) => {
        setError("No se pudo acceder al micrófono.");
        console.error("Error accessing microphone: ", err);
      });

    return () => {
      if (microphoneRef.current) microphoneRef.current.disconnect();
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  const getClosestNote = (frequency) => {
    const notes = {
      guitar: [
        { note: "E2", freq: 82.41 },
        { note: "A2", freq: 110.0 },
        { note: "D3", freq: 146.83 },
        { note: "G3", freq: 196.0 },
        { note: "B3", freq: 246.94 },
        { note: "E4", freq: 329.63 },
      ],
    };

    const instrumentNotes = notes[selectedInstrument];
    return instrumentNotes.reduce(
      (closestNote, currentNote) => {
        const diff = Math.abs(frequency - currentNote.freq);
        return diff < closestNote.diff ? { note: currentNote.note, diff } : closestNote;
      },
      { note: null, diff: Infinity }
    ).note;
  };

  const updateFrequency = () => {
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    let maxIndex = 0;
    let maxValue = 0;

    // Encontrar el pico más alto (frecuencia fundamental)
    for (let i = 0; i < dataArrayRef.current.length; i++) {
      if (dataArrayRef.current[i] > maxValue) {
        maxValue = dataArrayRef.current[i];
        maxIndex = i;
      }
    }

    // Calcular la frecuencia fundamental
    const sampleRate = audioContextRef.current.sampleRate;
    const frequency = (maxIndex * sampleRate) / analyserRef.current.fftSize;
    setFrequency(frequency.toFixed(2));

    // Encontrar la nota más cercana
    const closestNote = getClosestNote(frequency);
    setNote(closestNote);

    requestAnimationFrame(updateFrequency);
  };

  return (
    <div className={`relieve-out ${styles.tuner}`}>
      <div className={styles.tuner__header}>
        <InstrumentsBar setSelectedInstrument={setSelectedInstrument} selectedInstrument={selectedInstrument} />
        <Notes selectedInstrument={selectedInstrument} />
      </div>
      <Indicator frequency={frequency} note={note} />
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Tuner;
