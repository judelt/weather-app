import { useState } from "react";
import "./App.css";

interface ISearch {
  searchByCity: (city: string) => void;
  searchByZip: (zip: string)=> void;
}

function Search({ searchByCity, searchByZip }: ISearch) {
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  function handleKeyPressCity(e: any) {
    if (e.key === "Enter") {
      searchByCity(city);
      setCity("");
    }
  }

  function handleKeyPressZip(e: any) {
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
