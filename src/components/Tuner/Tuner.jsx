import { useState, useEffect, useRef } from "react";
import Indicator from "../Indicator/Indicator";
import InstrumentsBar from "../InstrumentsBar/InstrumentsBar";
import Notes from "../Notes/Notes";
import styles from "./Tuner.module.css";

// Definición de notas y frecuencias estándar para cada instrumento
const instrumentNotes = {
  guitar: [
    { note: "E2", freq: 82.41 },
    { note: "A", freq: 110.0 },
    { note: "D", freq: 146.83 },
    { note: "G", freq: 196.0 },
    { note: "B", freq: 246.94 },
    { note: "E4", freq: 329.63 },
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
  // Estados para el instrumento seleccionado, frecuencia actual, nota detectada y control de ejecución
  const [selectedInstrument, setSelectedInstrument] = useState("guitar");
  const [frequency, setFrequency] = useState(null);
  const [note, setNote] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  // Referencias para manejar el AudioContext, Analyser y otros elementos de audio
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const dataArrayRef = useRef(null);

  // Hook de efecto para inicializar y limpiar el audio cuando "isRunning" cambia
  useEffect(() => {
    if (!isRunning) return; // No iniciar el procesamiento si isRunning es false

    // Crear el contexto de audio
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();

    // Obtener acceso al micrófono
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        // Conectar el micrófono al AnalyserNode
        microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 8192; // Tamaño de la FFT para mayor precisión
        dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.smoothingTimeConstant = 0.85;
        microphoneRef.current.connect(analyserRef.current);

        // Iniciar el análisis de frecuencia
        updateFrequency();
      })
      .catch((error) => console.error("Error accessing microphone: ", error));

    // Cleanup: Desconectar y cerrar el contexto de audio cuando el componente se desmonte o "isRunning" cambie
    return () => {
      if (microphoneRef.current) microphoneRef.current.disconnect();
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, [selectedInstrument, isRunning]);

  // Función para encontrar la nota más cercana a una frecuencia dada
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

  // Función para actualizar la frecuencia detectada continuamente
  const updateFrequency = () => {
    if (!isRunning) return;

    // Obtener datos de frecuencia del AnalyserNode
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    let maxIndex = 0;
    let maxValue = 0;

    // Buscar el índice con el valor más alto (frecuencia dominante)
    for (let i = 0; i < dataArrayRef.current.length; i++) {
      if (dataArrayRef.current[i] > maxValue) {
        maxValue = dataArrayRef.current[i];
        maxIndex = i;
      }
    }

    // Calcular la frecuencia dominante
    const sampleRate = audioContextRef.current.sampleRate;
    const frequency = calculateFrequency(maxIndex, analyserRef.current.fftSize, sampleRate, dataArrayRef.current);

    // Actualizar los estados de frecuencia y nota
    setFrequency(frequency.toFixed(2));
    setNote(getClosestNote(frequency));

    // Llamar recursivamente para analizar continuamente
    requestAnimationFrame(updateFrequency);
  };

  // Calcular la frecuencia interpolada para mayor precisión
  const calculateFrequency = (maxIndex, fftSize, sampleRate, dataArray) => {
    const peakValue = dataArray[maxIndex];
    const leftValue = dataArray[maxIndex - 1] || 0;
    const rightValue = dataArray[maxIndex + 1] || 0;

    // Interpolación parabólica para ajustar el pico de frecuencia
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
        isRunning={isRunning}
        setIsRunning={setIsRunning}
      />
    </div>
  );
};

export default Tuner;
