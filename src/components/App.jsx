import { useState } from "react";
import useApplicationData from "../hooks/useApplicationData";
import Search from "./Search";
import CurrentWeather from "./CurrentWeather";
import "./App.css";

function App() {
  const { searchByCity, searchByZip, state } = useApplicationData();
  const {
    currentWeather,
    wind_speed,
    cityName,
    sys,
    temp,
    temp_max,
    temp_min,
    humidity,
  } = state;
  const iconURL = `http://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`;
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

  console.log("state", state);

  return (
    <div className="App">
      {cityName ? (
        <>
          <Search/>
          <CurrentWeather/>
          <div className="forecast-container">
            
          </div>
        </>
      ) : (
        <>
          <section className="question">
            <h1>What's the weather like in...?</h1>
          </section>
          <div className="search-box">
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
        </>
      )}
    </div>
  );
}

export default App;
