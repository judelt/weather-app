import { dateBuilder } from "../helpers/helpers";

interface IDayForecast {
  forecast: {
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
  };
  i: number;
}

function DayForecast({ forecast, i }: IDayForecast) {
  return (
    <div className="forecast-container-days">
      <div className="date">{dateBuilder(i + 1)}</div>
      <img
        src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
        alt="icon"
      ></img>
      <div>{forecast.weather[0].description}</div>

      <div className="stats">
        <div className="stat">
          <p>max temp</p>
          <p>{Math.round(forecast.temp.max - 273.15)}°C</p>
        </div>
        <div className="stat">
          <p>min temp</p>
          <p>{Math.round(forecast.temp.min - 273.15)}°C</p>
        </div>
        <div className="stat">
          <p>Humidity</p>
          <p>{forecast.humidity}%</p>
        </div>
        <div className="stat">
          <p>Wind Speed</p>
          <p>{forecast.wind_speed}MPH</p>
        </div>
      </div>
    </div>
  );
}

export default DayForecast;
