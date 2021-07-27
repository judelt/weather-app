import { useState } from "react";
import useApplicationData from "./hooks/useApplicationData";
import "./App.css";

require("dotenv").config();

function App() {
  const { searchByCity, searchByZip } = useApplicationData();
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  function handleKeyPressCity(e, city) {
    if (e.key === "Enter") {
      searchByCity(e, city);
      setCity("");
    }
  }

  function handleKeyPressZip(e, zip) {
    if (e.key === "Enter") {
      searchByZip(e, zip);
      setZip("");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather app</h1>
      </header>
      <input
        type="text"
        placeholder="Search by city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={handleKeyPressCity}
      ></input>
      <input
        type="text"
        placeholder="Search by zip code..."
        value={zip}
        onChange={(e) => {
          setZip(e.target.value);
        }}
        onKeyPress={handleKeyPressZip}
      ></input>
    </div>
  );
}

export default App;
