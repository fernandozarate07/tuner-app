import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import Tuner from "./components/Tuner/Tuner.jsx";
import Games from "./components/Games/Games.jsx";

function App() {
  const [section, setSection] = useState("tuner");
  return (
    <div className="app">
      <NavBar setSection={setSection} />
      <div className="containerSpa flex-c-c w-h-100">
        {section === "tuner" ? <Tuner /> : null}
        {section === "games" ? <Games /> : null}
      </div>
      <Footer />
    </div>
  );
}
export default App;
