import useApplicationData from "../hooks/useApplicationData";

function CurrentWeather() {
  const { state } = useApplicationData();
  const {
    currentWeather,
    wind_speed,
    cityName,
    sys,
    temp,
    temp_max,
    temp_min,
    humidity,
  } = state;
  const iconURL = `http://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`;

  return (
    <>
      {cityName && (
        <>
          <div className="location">
            {cityName}, {sys.country}
          </div>
          <div className="weather-container">
            <div className="temp">{Math.round(temp - 273.15)}°C</div>
            <div className="description">{currentWeather.description}</div>
            <div className="weather animate">
              <img src={iconURL} alt="icon"></img>
            </div>
          </div>
        </>
      )};
    </>
  );
}

export default CurrentWeather;
