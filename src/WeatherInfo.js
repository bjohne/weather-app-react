import React from "react";
import FormattedDate from "./FormattedDate";

export default function WeatherInfo(props) {
  return (
    <div className="WeatherInfo">
      <h1 className="cityFirst">{props.data.city}</h1>

      <div className="row">
        <div className="col-sm-6">
          <div className=" currentTemperature">
            <img className="currentIcon" src={props.data.icon} alt="Icon" />
            <span className="currentTempDegrees">{props.data.temperature}</span>
            <span className="currentTempUnit">°C</span>
          </div>
        </div>
        <div className="col-sm-6">
          <ul className="list-group">
            <li>
              Humidity:{""}
              <span className="humidity"> {props.data.humidity}</span> %
            </li>
            <li>
              Wind:{""}
              <span className="wind"> {props.data.wind}</span> km/h
            </li>
            <li className="currentDescription text-capitalize">
              {props.data.description}
            </li>
          </ul>
        </div>
      </div>
      <div className="weather-forecast">
        <div className="forecast-text">
          This week's weather in {""}
          <span className="citySecond">{props.data.city}</span>
          <br />
          <div className="last-update">
            last update :{" "}
            <span className="current-date">
              <FormattedDate date={props.data.date} />
            </span>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}
