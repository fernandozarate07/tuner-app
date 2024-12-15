import "./App.css";
import Footer from "./components/Footer/Footer.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import Tuner from "./components/Tuner/Tuner.jsx";

function App() {
  return (
    <div className="app">
      <NavBar />
      <div className="containerSpa flex-c-c w-h-100">
        <Tuner />
      </div>
      <Footer />
    </div>
  );
}
export default App;
