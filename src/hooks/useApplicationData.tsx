import { useState, KeyboardEvent } from "react";
import axios from "axios";

const api = {
  key: process.env.REACT_APP_WEATHER_API_KEY,
  base: process.env.REACT_APP_WEATHER_API_BASE,
};

export default function useApplicationData() {
  const [error, setError] = useState("");

  const [state, setState] = useState({
    currentWeather: "",
    forecast: [],
    lon: "",
    lat: "",
  });

  function searchByCity(e: KeyboardEvent, city: string): void {
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
          console.log("res", res);
        })
        .then(() => {
          axios
            .get(
              `${api.base}/onecall?lat=${state.lat}&lon=${state.lon}&appid=${api.key}`
            )
            .then((res) => {
              setState((prev) => ({
                ...prev,
                forecast: res.data.daily,
              }));
            });
        })
        .catch((err) => setError(err));
    }
  }

  return { searchByCity, state, error };
}
