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

function App() {
  const [state, setState] = useState({});
  const [error, setError] = useState(false);

  //Default location. Loads on first render
  useEffect(() => {
    searchByCity("toronto");
  }, []);

  async function getCurrentWeatherandCoordinates(city) {
    const { data } = await axios.get(
      `${api.base}/weather?q=${city}&appid=${api.key}`
    );
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
    return { lon, lat };
  }

  async function getForecastandPrecipitation(lon, lat) {
    const { data } = await axios.get(
      `${api.base}/onecall?lat=${lat}&lon=${lon}&appid=${api.key}`
    );

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
      setError(false);
    } catch (err) {
      setError(true);
    }
  }
  // returns de first city with that zip code
  async function getCity(zip) {
    const { data }  = await axios.get(
      `${zipApi.base}/search?apikey=${zipApi.key}&codes=${zip}`
    )
    const zipCity = data.results[zip][0].city
    
    return { zipCity };
  }

  async function searchByZip(zip) {
    try {
      const { zipCity } = await getCity(zip);
      const { lon, lat } = await getCurrentWeatherandCoordinates(zipCity);
      getForecastandPrecipitation(lon, lat);
      setError(false);
    } catch (err) {
      setError(true);
    }
  }

  const {
    currentWeather,
    wind_speed,
    cityName,
    sys,
    temp,
    temp_max,
    temp_min,
    humidity,
    precipitation,
    forecast,
  } = state;

  return (
    <div className="App">
      {cityName ? (
        <>
          <Search searchByCity={searchByCity} searchByZip={searchByZip} />
          {error && <p className='error'>Invalid city or zip code</p>}
          <CurrentWeather
            cityName={cityName}
            country={sys.country}
            temp={temp}
            description={currentWeather.description}
            icon={currentWeather.icon}
            temp_max={temp_max}
            temp_min={temp_min}
            humidity={humidity}
            wind_speed={wind_speed}
            precipitation={precipitation}
          />
          <Forecast forecast={forecast}/>
        </>
      ) : (
        <div className="circularProgress-container">
          <CircularProgress/>
        </div>
      )}
    </div>
  );
}

export default App;
