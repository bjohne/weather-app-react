import axios from "axios";
import React, { useState } from "react";
import "./Weather.css";
import WeatherInfo from "./WeatherInfo";
import { Circles } from "react-loader-spinner";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      temperature: Math.round(response.data.temperature.current),
      wind: Math.round(response.data.wind.speed),
      humidity: response.data.temperature.humidity,
      city: response.data.city,
      description: response.data.condition.description,
      iconUrl:
        "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png",
      date: new Date(response.data.time * 1000),
    });
  }
  function search() {
    let units = "metric";

    const apiKey = "31596ta47a643ofdbb992da3f1ed09dc";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(handleResponse);
  }
  function handleSubmit(event) {
    event.preventDefault();
    search();
  }
  function handleCityChange(event) {
    setCity(event.target.value);
  }
  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Enter city"
            autoComplete="off"
            onChange={handleCityChange}
          />
          {""}
          <button>
            <i className="fas fa-search"></i>
          </button>
          {""}
          <button className="btn-currentLocation">
            <i className="fas fa-map-marker-alt"></i>
          </button>
        </form>
        <br />
        <WeatherInfo data={weatherData} />
      </div>
    );
  } else {
    search();
    return (
      <Circles
        height="80"
        width="80"
        color="#EBB219"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    );
  }
}
