import { useState, useEffect } from "react";
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

  const [state, setState] = useState({});

  useEffect(() => {
    searchByCity("toronto");
  }, []);

  async function getCurrentWeatherandCoordinates(city) {
    const { data } = await axios.get(
      `${api.base}/weather?q=${city}&appid=${api.key}`
    );
    console.log('data', data)
    setState((prev) => ({
      ...prev,
      currentWeather: data.weather[0], //description, icon, id, main
      wind_speed: data.wind.speed,
      cityName: data.name,
      sys: data.sys, //type, id, country, sunrise, sunset
      temp: data.main.temp,
      temp_max: data.main.temp_max,
      temp_min: data.main.temp_min,
      humidity: data.main.humidity,

    }));
    const lon = data.coord.lon;
    const lat = data.coord.lat;
    console.log("lon", lon, "lat", lat);
    return { lon, lat };
  }

  async function getForecastandPrecipitation(lon, lat) {
    const { data } = await axios.get(
      `${api.base}/onecall?lat=${lat}&lon=${lon}&appid=${api.key}`
    );

    console.log('useApp 52', data)

    setState((prev) => ({
      ...prev,
      forecast: data.daily,
      precipitation: data.minutely[0].precipitation,

    }));
  }

  async function searchByCity(city) {
    try {
      const { lon, lat } = await getCurrentWeatherandCoordinates(city);
      getForecastandPrecipitation(lon, lat);
    } catch (err) {
      setError(err);
      console.log("err", err);
    }
  }

  async function getCity(zip) {
    const { data } = await axios.get(
      `${zipApi.base}/search?apikey=${zipApi.key}&codes=${zip}`
    );
    // .then(() => setZipCity(data.results[zip][0].city));

    // console.log("city", data.results[zip][0].city);
    return { data };
  }

  async function searchByZip(zip) {
    try {
      const { data } = await getCity(zip);
      setZipCity(data.results[zip][0].city);

      const { lon, lat } = await getCurrentWeatherandCoordinates(zipCity);
      getForecastandPrecipitation(lon, lat);
    } catch (err) {
      setError(err);
      console.log("err", err);
    }
  }
  // console.log('state', state)
  return { searchByCity, searchByZip, state, error };
}
