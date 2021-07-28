import { useState } from "react";
import "./App.css";

function Search({ searchByCity, searchByZip }) {
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  function handleKeyPressCity(e) {
    if (e.key === "Enter") {
      searchByCity(city);
      setCity("");
    }
  }

  function handleKeyPressZip(e) {
    if (e.key === "Enter") {
      searchByZip(zip);
      setZip("");
    }
  }

  return (
    <div className="search-box">
      <input
        className="search-bar"
        type="text"
        placeholder="Search by city..."
        onChange={(e) => setCity(e.target.value)}
        value={city}
        onKeyPress={handleKeyPressCity}
      ></input>
      <input
        className="search-bar"
        type="text"
        placeholder="Search by zip code..."
        onChange={(e) => setZip(e.target.value)}
        value={zip}
        onKeyPress={handleKeyPressZip}
      ></input>
    </div>
  );
}

export default Search;
