import { dateBuilder } from "../helpers/helpers";

function DayForecast({ forecast, date, i }) {
  return (
    <div className="forecast-container-days">
      <div className="date">{dateBuilder(i+1)}</div>
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
