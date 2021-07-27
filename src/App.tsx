import { useState } from "react";
import useApplicationData from "./hooks/useApplicationData";
import "./App.css";

function App() {
  const { searchByCity } = useApplicationData();
  const [city, setCity] = useState("");

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
          onKeyPress={(e) => searchByCity(e, city)}
        ></input>
      </div>
  );
}

export default App;
