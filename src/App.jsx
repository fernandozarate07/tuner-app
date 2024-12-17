import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import Tuner from "./components/Tuner/Tuner.jsx";
import Games from "./components/Games/Games.jsx";

function App() {
  const [section, setSection] = useState("tuner"); // Estado para seccioens
  const [fadeOut, setFadeOut] = useState(false); //Estado para la transiciones
  const [currentSection, setCurrentSection] = useState(section); // Utilizo este estado para activar el fadeOut antes que se actualize la sección

  useEffect(() => {
    setFadeOut(true);

    const timeout = setTimeout(() => {
      setCurrentSection(section);
      setFadeOut(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [section]);

  return (
    <div className={`app ${fadeOut ? "fadeOut" : "fadeIn"}`}>
      <NavBar setSection={setSection} />
      <div className="containerSpa flex-c-c w-h-100">
        {currentSection === "tuner" ? <Tuner /> : null}
        {currentSection === "games" ? <Games /> : null}
      </div>
      <Footer />
    </div>
  );
}
export default App;
