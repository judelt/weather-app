import { useState, KeyboardEvent } from "react";
import axios from "axios";

const api = {
  key: process.env.REACT_APP_WEATHER_API_KEY,
  base: process.env.REACT_APP_WEATHER_API_BASE,
};

const zipApi = {
  key: process.env.REACT_APP_ZIP_API_KEY,
  base: process.env.REACT_APP_ZIP_API_BASE,
};

export default function useApplicationData() {
  const [error, setError] = useState("");
  const [city, setCity] = useState("");

  const [state, setState] = useState({
    currentWeather: "",
    forecast: [],
    lon: "",
    lat: "",
  });

  function searchByCity(e: KeyboardEvent, city: string): void {
    axios
      .get(`${api.base}/weather?q=${city}&appid=${api.key}`)
      .then((res) => {
        setState((prev) => ({
          ...prev,
          currentWeather: res.data.weather[0],
          lon: res.data.coord.lon,
          lat: res.data.coord.lat,
        }));
        // console.log("res", res);
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
  const searchByZip = (e: KeyboardEvent, zip: string): void => {
    axios
      .get(`${zipApi.base}/search?apikey=${zipApi.key}&codes=${zip}`)
      .then((res) => {
        setCity(res.data.results[zip][0].city);
        console.log("city", res.data.results[zip][0].city);
      })
      .then(() => {
        axios
          .get(`${api.base}/weather?q=${city}&appid=${api.key}`)
          .then((res) => {
            console.log("res", res);
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
                setState((prev) => ({
                  ...prev,
                  forecast: res.data.daily,
                }));
              });
          })
          .then(() => console.log("state", state))
          .catch((err) => setError(err));
      });
  };

  return { searchByCity, searchByZip, state, error };
}
