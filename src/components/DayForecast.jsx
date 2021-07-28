function Forecast({ forecast }) {
  console.log(forecast);
  return (
    <>
      <div>
        <img
          src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
          alt="icon"
        ></img>
        <div>max. {Math.round(forecast.temp.max - 273.15)}°C</div>
        <div>min. {Math.round(forecast.temp.min - 273.15)}°C</div>
        <div>{forecast.weather[0].description}</div>
      </div>
</>
  );

  /* <div className="stats">
            <div className="stat">
              <p>Humidity:</p>
              <p>{forecast.humidity}%</p>
            </div>
            <div className="stat">
              <p>Wind Speed:</p>
              <p>{forecast.wind_speed}MPH</p>
            </div>
            <div className="stat">
              <p>Precipitation:</p>
              <p>{precipitation}%</p>
            </div>
          </div> */
}

export default Forecast;
