import DayForecast from "./DayForecast";

function Forecast({ forecast }) {
  console.log(forecast);
  return (
    <div className="forecast">
      {/* <p>Forecast</p> */}
      <div className="forecast-container">
        {forecast && forecast.map((day) => <DayForecast forecast={day} />)}
      </div>
    </div>
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
