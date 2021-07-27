import { useState } from "react";
import useApplicationData from "./hooks/useApplicationData";
import "./App.css";

function App() {
  const { searchByCity, searchByZip } = useApplicationData();
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  function handleKeyPressCity(e) {
    if (e.key === "Enter") {
      console.log(city)
      searchByCity(city);
      setCity("");
    }
  }

  function handleKeyPressZip(e) {
    if (e.key === "Enter") {
      console.log(zip);
      searchByZip(zip);
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
        onChange={(e) => setCity(e.target.value)}
        value={city}
        onKeyPress={handleKeyPressCity}
      ></input>
      <input
        type="text"
        placeholder="Search by zip code..."
        onChange={(e) => setZip(e.target.value)}
        value={zip}
        onKeyPress={handleKeyPressZip}
      ></input>
    </div>
  );
}

export default App;
