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

  async function getCurrentWeatherandCoordinates(city) {
    const { data } = await axios.get(
      `${api.base}/weather?q=${city}&appid=${api.key}`
    );
    setState((prev) => ({
      ...prev,
      currentWeather: data.weather[0],
      lon: data.coord.lon,
      lat: data.coord.lat,
    }));
  }

  async function getForecast() {
    const { data } = await axios.get(
      `${api.base}/onecall?lat=${state.lat}&lon=${state.lon}&appid=${api.key}`
    );

    setState((prev) => ({
      ...prev,
      forecast: data.daily,
    }));
  }

  async function searchByCity(city) {
    try {
      await getCurrentWeatherandCoordinates(city);
      getForecast();
    } catch (err) {
      setError(err);
    }
  }

  async function getCity(zip) {
    const { data } = await axios.get(
      `${zipApi.base}/search?apikey=${zipApi.key}&codes=${zip}`
    );
    setZipCity(data.results[zip][0].city);
    // console.log("city", data.results[zip][0].city);
  }

  async function searchByZip(zip) {
    try {
      await getCity(zip);
      await getCurrentWeatherandCoordinates(zipCity);
      getForecast();
    } catch (err) {
      setError(err);
    }
  }
  // console.log('state', state)
  return { searchByCity, searchByZip, state, error };
}
