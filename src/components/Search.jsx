import { useState } from "react";
import useApplicationData from "../hooks/useApplicationData";
import "./App.css";

function Search() {
  const { searchByCity, searchByZip } = useApplicationData();
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  function handleKeyPressCity(e) {
    if (e.key === "Enter") {
      console.log(city);
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
