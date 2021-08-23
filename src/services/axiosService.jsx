import axios from "axios";
import urls from "../config/urls";

export const autoCompleteAPI = axios.create({
  baseURL: urls.autocomplete.base,
});

export const forecastAPI = axios.create({
  baseURL: urls.forecast.base,
});

export const currentWeatherAPI = axios.create({
  baseURL: urls.current.base,
});
