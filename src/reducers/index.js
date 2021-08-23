import { combineReducers } from "redux";

import cityKeyReducer from "./city";
import loaderReducer from "./loader";
import isCelsiusReducer from "./isCelsius";
import badgeReducer from "./badge";
import searchBarReducer from "./searchBar";
import darkModeReducer from "./darkMode";

const allReducers = combineReducers({
  city: cityKeyReducer,
  loader: loaderReducer,
  isCelsius: isCelsiusReducer,
  badge: badgeReducer,
  searchBar: searchBarReducer,
  darkMode: darkModeReducer,
});

export default allReducers;
