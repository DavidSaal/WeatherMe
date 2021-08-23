/* eslint-disable import/no-anonymous-default-export */
export default {
  autocomplete: {
    base: "https://dataservice.accuweather.com/locations/v1/cities/autocomplete",
    cities: (query) =>
      `?apikey=${process.secrets.REACT_APP_API_KEY}&q=${query}`,
  },
  forecast: {
    base: "https://dataservice.accuweather.com/forecasts/v1/daily/5day",
    daily: (query) => `/${query}?apikey=${process.secrets.REACT_APP_API_KEY}`,
  },
  current: {
    base: "https://dataservice.accuweather.com/currentconditions/v1",
    daily: (query) => `/${query}?apikey=${process.secrets.REACT_APP_API_KEY}`,
  },
};
