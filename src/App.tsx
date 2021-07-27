import { useState, KeyboardEvent } from "react";
import axios from "axios";
import "./App.css";

const api = {
  key: process.env.REACT_APP_WEATHER_API_KEY,
  base: process.env.REACT_APP_WEATHER_API_BASE,
};

function App() {
  const [city, setCity] = useState("");
  
  const [state, setState] = useState({
    currentWeather: "",
    forecast: [],
    lon: "",
    lat: "",
  });
  const [error, setError] = useState("");

  const searchByCity = (e: KeyboardEvent): void => {
    if (e.key === "Enter") {
      axios
        .get(`${api.base}/weather?q=${city}&appid=${api.key}`)
        .then((res) => {
          setState((prev) => ({
            ...prev,
            currentWeather: res.data.weather[0],
            lon: res.data.coord.lon,
            lat: res.data.coord.lat,
          }));
        })
        .then(() => {
          axios
            .get(
              `${api.base}/onecall?lat=${state.lat}&lon=${state.lon}&appid=${api.key}`
            )
            .then((res) => {
              console.log("res.data.daily", res.data.daily);
              setState((prev) => ({
                ...prev,
                forecast: res.data.daily,
              }));
            });
        })
        .catch((err) => setError(err));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather app</h1>
      </header>
      <body>
        <input
          type="text"
          placeholder="Search for city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={searchByCity}
        ></input>
      </body>
    </div>
  );
}

export default App;
