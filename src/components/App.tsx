import { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import Search from "./Search";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import "./App.css";

const api = {
  key: process.env.REACT_APP_WEATHER_API_KEY,
  base: process.env.REACT_APP_WEATHER_API_BASE,
};

const zipApi = {
  key: process.env.REACT_APP_ZIP_API_KEY,
  base: process.env.REACT_APP_ZIP_API_BASE,
};

interface ICurrWeather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface IForecast {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: { day: number; night: number; eve: number; morn: number };
  humidity: number;
  moon_phase: number;
  moonrise: number;
  moonset: number;
  pop: number;
  pressure: number;
  rain: number;
  sunrise: number;
  sunset: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  uvi: number;
  weather: [{ id: number; main: string; description: string; icon: string }];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

interface IState {
  cityName: string;
  currentWeather: ICurrWeather;
  forecast: IForecast[];
  humidity: number;
  precipitation: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  temp: number;
  temp_max: number;
  temp_min: number;
  wind_speed: number;
}

function App() {
  const [state, setState] = useState<IState>();
  const [error, setError] = useState(false);

  //Default location. Loads on first render
  useEffect(() => {
    searchByCity("toronto");
  }, []);

  async function getCurrentWeatherandCoordinates(city: string) {
    const { data } = await axios.get(
      `${api.base}/weather?q=${city}&appid=${api.key}`
    );
    setState((prev:  any) => ({
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
    return { lon, lat };
  }

  async function getForecastandPrecipitation(lon: string, lat: string) {
    const { data } = await axios.get(
      `${api.base}/onecall?lat=${lat}&lon=${lon}&appid=${api.key}`
    );

    setState((prev: any ) => ({
      ...prev,
      forecast: data.daily,
      precipitation: data.minutely[0].precipitation,
    }));
  }

  async function searchByCity(city: string) {
    try {
      const { lon, lat } = await getCurrentWeatherandCoordinates(city);
      getForecastandPrecipitation(lon, lat);
      setError(false);
    } catch (err) {
      setError(true);
    }
  }
  // returns de first city with that zip code
  async function getCity(zip: string) {
    const { data } = await axios.get(
      `${zipApi.base}/search?apikey=${zipApi.key}&codes=${zip}`
    );
    const zipCity = data.results[zip][0].city;

    return { zipCity };
  }

  async function searchByZip(zip: string) {
    try {
      const { zipCity } = await getCity(zip);
      const { lon, lat } = await getCurrentWeatherandCoordinates(zipCity);
      getForecastandPrecipitation(lon, lat);
      setError(false);
    } catch (err) {
      setError(true);
    }
  }

  return (
    <div className="App">
      {state ? (
        <>
          <Search searchByCity={searchByCity} searchByZip={searchByZip} />
          {error && <p className="error">Invalid city or zip code</p>}
          <CurrentWeather
            cityName={state.cityName}
            country={state.sys.country}
            temp={state.temp}
            description={state.currentWeather.description}
            temp_max={state.temp_max}
            temp_min={state.temp_min}
            humidity={state.humidity}
            wind_speed={state.wind_speed}
            precipitation={state.precipitation}
          />
          <Forecast forecast={state.forecast} />
        </>
      ) : (
        <div className="circularProgress-container">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default App;
