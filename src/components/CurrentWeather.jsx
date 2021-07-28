import useApplicationData from "../hooks/useApplicationData";

function CurrentWeather({cityName, country, temp, description, icon}) {
  const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  return (
    <>
      <div className="location">
        {cityName}, {country}
      </div>
      <div className="weather-container">
        <div className="temp">{Math.round(temp - 273.15)}°C</div>
        <div className="description">{description}</div>
        <div className="weather animate">
          <img src={iconURL} alt="icon"></img>
        </div>
      </div>
    </>
  );
}

export default CurrentWeather;
