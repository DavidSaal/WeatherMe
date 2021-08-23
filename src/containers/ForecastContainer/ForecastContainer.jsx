import React, { useEffect, useState } from "react";
import urls from "../../config/urls";
import { forecastAPI } from "../../services/axiosService";
import { useDispatch, useSelector } from "react-redux";
import ForecastCard from "../../components/ForecastCard";
import Skeleton from "react-loading-skeleton";
import { setLoader } from "../../actions";

const ForecastContainer = () => {
  const dispatch = useDispatch();
  let cityKey = useSelector((state) => state.city.key);
  let loader = useSelector((state) => state.loader);
  let badge = useSelector((state) => state.badge);
  const [forecast, setForecast] = useState([]);

  const getForecast = async () => {
    const url = urls.forecast.daily(cityKey);
    try {
      const { data } = await forecastAPI.get(url);
      setForecast(data.DailyForecasts);
    } catch (error) {
      console.error({ error: error.message });
    }
    dispatch(setLoader());
  };

  useEffect(() => {
    if (!loader) {
      dispatch(setLoader());
      getForecast();
    }
  }, [cityKey]);

  useEffect(() => {
    localStorage.setItem("badge", badge);
  }, [badge]);

  return (
    <div className="d-flex justify-content-center mb-5">
      {loader ? (
        [...Array(5)].map((_, i) => {
          return (
            <div className="col-12 col-sm-2 px-3" key={i}>
              <div className="card p-3 pb-4 text-center">
                <Skeleton className="rounded-0 mt-4" count={4} />
              </div>
            </div>
          );
        })
      ) : forecast.length > 0 ? (
        forecast.map((forecast, index) => (
          <div className="col-12 col-sm-2 px-3" key={index}>
            <ForecastCard
              minimumTemperature={forecast.Temperature.Minimum.Value}
              maximumTemperature={forecast.Temperature.Maximum.Value}
              index={index}
              day={forecast.Day.IconPhrase}
              night={forecast.Night.IconPhrase}
              dayIcon={forecast.Day.Icon}
              nightIcon={forecast.Night.Icon}
            />
          </div>
        ))
      ) : (
        <div className="text-center mt-4">
          <h1 className="text-danger ">
            There was a problem with the API, please try later.
          </h1>
        </div>
      )}
    </div>
  );
};

export default ForecastContainer;
