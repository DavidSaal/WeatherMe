import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { decreaseBadge, setCity, setLoader } from "../../actions";
import "./FavoriteCard.css";

const FavoriteCard = ({ cityKey, cityName, currentWeather }) => {
  const dispatch = useDispatch();
  let isCelsius = useSelector((state) => state.isCelsius);
  let loader = useSelector((state) => state.loader);
  let darkMode = useSelector((state) => state.darkMode);
  let bgDarkMode = darkMode ? "bg-dark  border-dark" : "bg-white ";
  let textDarkMode = darkMode ? "text-white" : "text-dark";

  const handleRemoveCity = () => {
    const favoriteCities =
      JSON.parse(localStorage.getItem("favoriteCities")) || [];
    let removedCity = favoriteCities.filter(
      (city) => cityName !== city.cityName
    );
    localStorage.setItem("favoriteCities", JSON.stringify(removedCity));
    dispatch(decreaseBadge());
  };

  const favoriteClickHandler = () => {
    dispatch(setCity(cityName, cityKey));
  };

  return (
    <div className={`card h-100 ${bgDarkMode}`} onClick={favoriteClickHandler}>
      <button
        type="button"
        className={`btn-close mt-2 ms-2 ${darkMode && "btn-white"}`}
        aria-label="Close"
        onClick={handleRemoveCity}
      ></button>
      <Link to="/" className="text-dark text-decoration-none">
        <div className={`card-body text-center ${textDarkMode}`}>
          <img
            src={`https://developer.accuweather.com/sites/default/files/${
              currentWeather.WeatherIcon < 10
                ? "0" + currentWeather.WeatherIcon
                : currentWeather.WeatherIcon
            }-s.png`}
            alt="Weather"
          />
          <h5 className="pt-3 text-center pb-1 border-bottom mb-2">
            {cityName}
          </h5>
          {isCelsius ? (
            <div className="h4 d-flex justify-content-center text-secondary">
              {currentWeather.Temperature.Metric.Value}
              <p className="fs-6">℃</p>
            </div>
          ) : (
            <div className="h4 d-flex justify-content-center text-secondary">
              {currentWeather.Temperature.Imperial.Value}
              <p className="fs-6">℉</p>
            </div>
          )}
          <div>{currentWeather.WeatherText}</div>
        </div>
      </Link>
    </div>
  );
};

export default FavoriteCard;
