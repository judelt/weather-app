import { useState } from "react";
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
  const [zipCity, setZipCity] = useState("");

  const [state, setState] = useState({
    currentWeather: "",
    forecast: [],
    lon: "",
    lat: "",
  });

  function getCurrentWeatherandCoordinates(city) {
    axios.get(`${api.base}/weather?q=${city}&appid=${api.key}`).then((res) => {
      setState((prev) => ({
        ...prev,
        currentWeather: res.data.weather[0],
        lon: res.data.coord.lon,
        lat: res.data.coord.lat,
      }));
    });
  }

  function getForecast() {
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
  }

  async function searchByCity(city) {
    try {
      getCurrentWeatherandCoordinates(city)
      .then(() => getForecast())
    } catch (err) {
      setError(err);
    }
  }

  function getCity(zip) {
    axios
      .get(`${zipApi.base}/search?apikey=${zipApi.key}&codes=${zip}`)
      .then((res) => {
        setZipCity(res.data.results[zip][0].city);
        console.log("city", res.data.results[zip][0].city);
      })
  }

  async function searchByZip (zip) {
    try {
      getCity(zip)
        .then(() => getCurrentWeatherandCoordinates(zipCity))
        .then(() => getForecast())
    } catch (err) {
      setError(err);
    }
  }

  return { searchByCity, searchByZip, state, error };
}
