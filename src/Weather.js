import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [city, setCity] = useState("Amsterdam");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function showWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: Math.round(response.data.wind.speed),
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function showCity(event) {
    event.preventDefault();

    let apiKey = "85504bf7b1be17a8a141d12a004a2570";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showWeather);
  }
  function updateCity(event) {
    setCity(event.target.value);
  }
  let form = (
    <div className="row">
      <div className="col-sm-6">
        <div className="form">
          <form onSubmit={showCity}>
            <input
              type="search"
              placeholder="Enter a city"
              onChange={updateCity}
            />
            <button>
              <i className="fas fa-search"></i>
            </button>
          </form>
          <button className="btn-currentLocation">
            <i className="fas fa-map-marker-alt"></i>
          </button>
        </div>
      </div>
      <div className="col-sm-2"></div>
      <div className="col-sm-4">
        <div className="Cityfirst">
          {city}
          <div />
          <br />
          <ul className="list-group">
            <li>Humidity: {weather.humidity} %</li>
            <li>Wind: {weather.wind} km/h</li>
            <li className="currentDescription">{weather.description}</li>
          </ul>
        </div>{" "}
      </div>
      <div className="currentWeather">
        <h1 className="currentTemperature">{weather.temperature}°C</h1>
        <p className="currentIcon">
          <img src={weather.icon} alt={weather.description} />
        </p>
        <p className="forecast-text">
          This week's weather in <span className="Citysecond">{city}</span>
          <br />
          <span id="last-update">
            last update : <span id="current-date"></span>
          </span>
        </p>
        <br />
      </div>
    </div>
  );
  if (loaded) {
    return <div>{form}</div>;
  } else {
    return form;
  }
}
