import { useState } from "react";
import { CircularProgress } from "@material-ui/core";
import useApplicationData from "../hooks/useApplicationData";
import Search from "./Search";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
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
    precipitation,
  } = state;

  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  console.log("state", state);

  return (
    <div className="App">
      {cityName ? (
        <>
          <Search />
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
          <Forecast />
        </>
      ) : (
        <div className="circularProgress">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default App;
