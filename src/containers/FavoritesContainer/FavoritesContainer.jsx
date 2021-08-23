import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import FavoriteCard from "../../components/FavoriteCard";

const FavoritesContainer = () => {
  const favoriteCities =
    JSON.parse(localStorage.getItem("favoriteCities")) || [];
  let badge = useSelector((state) => state.badge);
  let darkMode = useSelector((state) => state.darkMode);
  let isDarkMode = darkMode
    ? "text-dark border-dark"
    : "text-white border-white";

  useEffect(() => {
    localStorage.setItem("badge", badge);
  }, [badge]);

  return (
    <div className="row d-flex justify-content-center m-0 mt-3">
      <h1
        className={`display-1 text-center border bg-transparent shadow fw-500 ${isDarkMode}`}
      >
        Favorite Cities
      </h1>
      {favoriteCities.length > 0 ? (
        favoriteCities.map((city, index) => (
          <div className="col-12 col-sm-2 px-3 mt-4" key={index}>
            <FavoriteCard
              cityName={city.cityName}
              cityKey={city.cityKey}
              currentWeather={city.currentWeather}
            />
          </div>
        ))
      ) : (
        <h1 className="text-center text-shadow-dark fs-2 mt-4">
          Favorites is empty!, Please add a city first.
        </h1>
      )}
    </div>
  );
};

export default FavoritesContainer;
