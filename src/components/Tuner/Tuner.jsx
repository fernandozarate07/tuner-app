import { useState, useEffect, useRef } from "react";
import Indicator from "../Indicator/Indicator";
import InstrumentsBar from "../InstrumentsBar/InstrumentsBar";
import Notes from "../Notes/Notes";
import styles from "./Tuner.module.css";

const instrumentNotes = {
  guitar: [
    { note: "E", freq: 82.41 },
    { note: "A", freq: 110.0 },
    { note: "D", freq: 146.83 },
    { note: "G", freq: 196.0 },
    { note: "B", freq: 246.94 },
    { note: "E", freq: 329.63 },
  ],
  bass: [
    { note: "E", freq: 41.2 },
    { note: "A", freq: 55.0 },
    { note: "D", freq: 73.42 },
    { note: "G", freq: 98.0 },
  ],
  ukulele: [
    { note: "G", freq: 392.0 },
    { note: "C", freq: 261.63 },
    { note: "E", freq: 329.63 },
    { note: "A", freq: 440.0 },
  ],
};

const Tuner = () => {
  const [selectedInstrument, setSelectedInstrument] = useState("guitar");
  const [frequency, setFrequency] = useState(null);
  const [note, setNote] = useState(null);
  const [isRunning, setIsRunning] = useState(false); // Estado para controlar el inicio/pausa
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const dataArrayRef = useRef(null);

  useEffect(() => {
    if (!isRunning) return; // No iniciar el procesamiento si no está en "running"

    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 8192;
        dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.smoothingTimeConstant = 0.85;
        microphoneRef.current.connect(analyserRef.current);
        updateFrequency();
      })
      .catch((error) => console.error("Error accessing microphone: ", error));

    return () => {
      if (microphoneRef.current) microphoneRef.current.disconnect();
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, [selectedInstrument, isRunning]); // Depende de "isRunning" para activar/desactivar el análisis

  const getClosestNote = (frequency) => {
    const instrumentNotesForSelected = instrumentNotes[selectedInstrument];
    let closestNote = null;
    let minDiff = Infinity;

    instrumentNotesForSelected.forEach(({ note, freq }) => {
      const diff = Math.abs(frequency - freq);
      if (diff < minDiff) {
        closestNote = note;
        minDiff = diff;
      }
    });

    return closestNote;
  };

  const updateFrequency = () => {
    if (!isRunning) return; // Solo procesar si está "running"

    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    let maxIndex = 0;
    let maxValue = 0;

    for (let i = 0; i < dataArrayRef.current.length; i++) {
      if (dataArrayRef.current[i] > maxValue) {
        maxValue = dataArrayRef.current[i];
        maxIndex = i;
      }
    }

    const sampleRate = audioContextRef.current.sampleRate;
    const frequency = calculateFrequency(maxIndex, analyserRef.current.fftSize, sampleRate, dataArrayRef.current);

    setFrequency(frequency.toFixed(2));
    setNote(getClosestNote(frequency));

    requestAnimationFrame(updateFrequency);
  };

  const calculateFrequency = (maxIndex, fftSize, sampleRate, dataArray) => {
    const peakValue = dataArray[maxIndex];
    const leftValue = dataArray[maxIndex - 1] || 0;
    const rightValue = dataArray[maxIndex + 1] || 0;

    const interpolatedFreq =
      (maxIndex + (0.5 * (rightValue - leftValue)) / (2 * peakValue - leftValue - rightValue)) * (sampleRate / fftSize);
    return interpolatedFreq;
  };

  return (
    <div className={`${styles.tuner}`}>
      <div className={styles.tuner__header}>
        <InstrumentsBar setSelectedInstrument={setSelectedInstrument} selectedInstrument={selectedInstrument} />
        <Notes selectedInstrument={selectedInstrument} />
      </div>
      <Indicator
        frequency={frequency}
        note={note}
        selectedInstrument={selectedInstrument}
        instrumentNotes={instrumentNotes[selectedInstrument]}
        isRunning={isRunning} // Pasamos el estado isRunning como prop
        setIsRunning={setIsRunning} // Pasamos la función para cambiar el estado
      />
    </div>
  );
};

export default Tuner;
