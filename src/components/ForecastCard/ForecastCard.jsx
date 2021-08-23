import React from "react";
import { useSelector } from "react-redux";
import "./ForecastCard.css";

const ForecastCard = ({
  minimumTemperature,
  maximumTemperature,
  index,
  day,
  night,
  dayIcon,
  nightIcon,
}) => {
  let isCelsius = useSelector((state) => state.isCelsius);
  let darkMode = useSelector((state) => state.darkMode);
  let bgDarkMode = darkMode ? "bg-dark border-dark" : "bg-white ";
  let textDarkMode = darkMode ? "text-white" : "text-dark";
  dayIcon = dayIcon < 10 ? "0" + dayIcon : dayIcon;
  nightIcon = nightIcon < 10 ? "0" + nightIcon : nightIcon;

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <div className={`card h-100 ${bgDarkMode}`}>
      <div className={`card-body text-center pb-1 ${textDarkMode}`}>
        <h5 className="text-center pb-1 border-bottom mb-3">
          {weekDays[index]}
        </h5>
        <div className="row m-0">
          <div className="col-6">
            <p className="my-1">Min</p>
            <img
              src={`https://developer.accuweather.com/sites/default/files/${dayIcon}-s.png`}
              alt="Weather"
            />
            {isCelsius ? (
              <div className="h2 m-0 text-secondary d-flex justify-content-center">
                {Math.ceil((minimumTemperature - 32) / 1.8)}
                <p className="fs-6 mt-1">℃</p>
              </div>
            ) : (
              <div className="h2 m-0 text-secondary d-flex justify-content-center">
                {minimumTemperature}
                <p className="fs-6 mt-1">℉</p>
              </div>
            )}
          </div>
          <div className="col-6">
            <p className="my-1">Max</p>
            <img
              src={`https://developer.accuweather.com/sites/default/files/${nightIcon}-s.png`}
              alt="Weather"
            />
            {isCelsius ? (
              <div className="h2 m-0 text-secondary d-flex justify-content-center">
                {Math.ceil((maximumTemperature - 32) / 1.8)}
                <p className="fs-6 mt-1">℃</p>
              </div>
            ) : (
              <div className="h2 m-0 text-secondary d-flex justify-content-center">
                {maximumTemperature}
                <p className="fs-6 mt-1">℉</p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-3">
          <p className="fs-7 m-0 pt-2">Day: {day}</p>
          <p className="fs-7">Night: {night}</p>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;
