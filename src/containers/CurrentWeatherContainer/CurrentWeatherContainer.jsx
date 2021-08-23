import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentWeatherAPI } from "../../services/axiosService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import urls from "../../config/urls";
import { increaseBadge } from "../../actions";
import Skeleton from "react-loading-skeleton";

const CurrentWeatherContainer = () => {
  const [currentWeather, setCurrentWeather] = useState({});
  const dispatch = useDispatch();

  let cityName = useSelector((state) => state.city.name);
  let cityKey = useSelector((state) => state.city.key);
  let isCelsius = useSelector((state) => state.isCelsius);
  let loader = useSelector((state) => state.loader);
  let darkMode = useSelector((state) => state.darkMode);
  let isDarkMode = darkMode
    ? "text-dark border-dark"
    : "text-white border-white";

  const getCurrent = async () => {
    const url = urls.current.daily(cityKey);
    try {
      const { data } = await currentWeatherAPI.get(url);
      setCurrentWeather(data[0]);
    } catch (error) {
      console.error({ error: error.message });
    }
  };

  useEffect(() => {
    getCurrent();
  }, [cityKey]);

  const handleFavorite = () => {
    if (currentWeather.LocalObservationDateTime) {
      const favoriteCities =
        JSON.parse(localStorage.getItem("favoriteCities")) || [];
      let checkDuplicate = favoriteCities.find(
        (city) => cityName === city.cityName
      );
      if (!checkDuplicate) {
        dispatch(increaseBadge());
        favoriteCities.push({ cityName, cityKey, currentWeather });
        localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
        toast.success(cityName + " is added to your favorites.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else toast.error(cityName + " is already in your favorites.");
    } else toast.error("There was a problem with the API, please try later.");
  };

  return (
    <div className="mt-2 mb-4">
      <ToastContainer
        className="mt-3"
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        draggable
        pauseOnHover
      />
      <div>
        <div className="row d-flex shadow p-5 m-0">
          <div className="col-12 col-sm-4 d-flex justify-content-center">
            {loader ? (
              <Skeleton className="rounded-0 mt-4" width={220} height={180} />
            ) : (
              currentWeather.LocalObservationDateTime && (
                <div
                  className={`border display-7 text-white shadow-sm p-4 pb-0 ${
                    darkMode ? "border-dark" : "border-white"
                  }`}
                >
                  <div className={`d-flex ${isDarkMode}`}>
                    <p className="fs-3">Date:&nbsp;</p>
                    <p className="fs-4 mt-1">
                      {currentWeather.LocalObservationDateTime.split("T")[0]}
                    </p>
                  </div>
                  <div className={`d-flex ${isDarkMode}`}>
                    <p className="fs-3">Time:&nbsp;</p>
                    <p className="fs-4 mt-1">
                      {currentWeather.LocalObservationDateTime.split("T")[1]
                        .split("+")[0]
                        .split(":")[0] +
                        ":" +
                        currentWeather.LocalObservationDateTime.split("T")[1]
                          .split("+")[0]
                          .split(":")[1]}
                    </p>
                  </div>
                  <div className={`d-flex ${isDarkMode}`}>
                    <p className="fs-3">UTC:&nbsp;</p>
                    <p className="fs-4 mt-1">
                      +
                      {
                        currentWeather.LocalObservationDateTime.split(
                          "T"
                        )[1].split("+")[1]
                      }
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="col-12 col-sm-4 mt-4 text-center">
            <h1 className="display-1 fw-bold">
              {loader ? (
                <Skeleton
                  className="rounded-0 display-4"
                  width={400}
                  height="20"
                />
              ) : (
                cityName
              )}
            </h1>
            <h2 className={`text-shadow-white ${isDarkMode}`}>
              {loader ? (
                <Skeleton className="rounded-0" width={200} />
              ) : (
                currentWeather.WeatherText && currentWeather.WeatherText
              )}
            </h2>
          </div>
          <div className="col-12 col-sm-4 mt-5 text-center">
            {loader ? (
              <Skeleton className="rounded-circle" width={70} height={70} />
            ) : (
              currentWeather.WeatherIcon && (
                <img
                  src={`https://developer.accuweather.com/sites/default/files/${
                    currentWeather.WeatherIcon < 10
                      ? "0" + currentWeather.WeatherIcon
                      : currentWeather.WeatherIcon
                  }-s.png`}
                  alt="Weather"
                  width="110"
                />
              )
            )}
            <div className="h3 text-white">
              {loader ? (
                <Skeleton className="rounded-0 mt-2" width={100} />
              ) : (
                currentWeather.Temperature &&
                (isCelsius ? (
                  <div
                    className={`d-flex justify-content-center ${isDarkMode}`}
                  >
                    {currentWeather.Temperature.Metric.Value}
                    <p className="fs-6 mt-1">℃</p>
                  </div>
                ) : (
                  <div
                    className={`d-flex justify-content-center ${isDarkMode}`}
                  >
                    {currentWeather.Temperature.Imperial.Value}
                    <p className="fs-6 mt-1">℉</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <button
          className={`btn col-12 rounded-0 border fs-5 bg-transparent shadow favorite ${isDarkMode}`}
          onClick={handleFavorite}
        >
          Add To Favorite
        </button>
      </div>
    </div>
  );
};

export default CurrentWeatherContainer;
