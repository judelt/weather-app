import DayForecast from "./DayForecast";

function Forecast({ forecast, date }) {

  return (
    <div className="forecast">
      <div className="forecast-container">
        {forecast &&
          forecast.map((day, i) => (
            <DayForecast key={i} forecast={day} i={i}/>
          ))}
      </div>
    </div>
  );
}

export default Forecast;
