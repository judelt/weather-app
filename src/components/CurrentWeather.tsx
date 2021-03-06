import { dateBuilder } from "../helpers/helpers";

interface ICurrentWeather {
  cityName: string;
  country: string;
  temp: number;
  description: string;
  temp_max: number;
  temp_min: number;
  humidity: number;
  wind_speed: number;
  precipitation: number;
}

function CurrentWeather({
  cityName,
  country,
  temp,
  description,
  temp_max,
  temp_min,
  humidity,
  wind_speed,
  precipitation,
}: ICurrentWeather) {
  return (
    <>
      <div className="location">
        {cityName}, {country}
      </div>
      <div className="date">{dateBuilder()}</div>
      <div className="current-weather-container">
        <div className="temp">{Math.round(temp - 273.15)}°C</div>
        <div className="temp-min-max">
          <div className="temp-max">max. {Math.round(temp_max - 273.15)}°C</div>
          <div className="temp-min">min. {Math.round(temp_min - 273.15)}°C</div>
        </div>
        <div className="description">{description}</div>
        <div className="stats">
          <div className="stat">
            <p>Humidity</p>
            <p>{humidity}%</p>
          </div>
          <div className="stat">
            <p>Wind Speed</p>
            <p>{wind_speed}MPH</p>
          </div>
          <div className="stat">
            <p>Precipitation</p>
            <p>{precipitation}%</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CurrentWeather;
