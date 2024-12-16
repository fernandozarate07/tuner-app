import { useState, useEffect, useRef } from "react";
import Indicator from "../Indicator/Indicator";
import InstrumentsBar from "../InstrumentsBar/InstrumentsBar";
import Notes from "../Notes/Notes";
import styles from "./Tuner.module.css";

const Tuner = () => {
  const [selectedInstrument, setSelectedInstrument] = useState("guitar");
  const [frequency, setFrequency] = useState(null);
  const [note, setNote] = useState(null);

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
        analyserRef.current.fftSize = 4096; // Aumentamos el tamaño de la FFT
        dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.smoothingTimeConstant = 0.85; // Suavizamos la señal
        microphoneRef.current.connect(analyserRef.current);
        updateFrequency();
      })
      .catch((error) => console.error("Error accessing microphone: ", error));

    // Limpiar recursos al desmontar el componente
    return () => {
      if (microphoneRef.current) microphoneRef.current.disconnect();
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, [selectedInstrument]);

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

    const instrumentNotes = notes[selectedInstrument];
    let closestNote = null;
    let minDiff = Infinity;

    instrumentNotes.forEach(({ note, freq }) => {
      const diff = Math.abs(frequency - freq);
      if (diff < minDiff) {
        closestNote = note;
        minDiff = diff;
      }
    });

    return closestNote;
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

    // Calcular la frecuencia fundamental (de acuerdo con el índice del pico)
    const sampleRate = audioContextRef.current.sampleRate;
    const frequency = (maxIndex * sampleRate) / analyserRef.current.fftSize;

    // Usamos el valor de la frecuencia con mayor precisión
    setFrequency(frequency.toFixed(2));

    // Encontrar la nota más cercana
    const closestNote = getClosestNote(frequency);
    setNote(closestNote);

    // Continuar con el próximo frame
    requestAnimationFrame(updateFrequency);
  };

  return (
    <div className={`relieve-out ${styles.tuner}`}>
      <div className={styles.tuner__header}>
        <InstrumentsBar setSelectedInstrument={setSelectedInstrument} selectedInstrument={selectedInstrument} />
        <Notes selectedInstrument={selectedInstrument} />
      </div>
      <Indicator frequency={frequency} note={note} selectedInstrument={selectedInstrument} />
    </div>
  );
};

export default Tuner;
