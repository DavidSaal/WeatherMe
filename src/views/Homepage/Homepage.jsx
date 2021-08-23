import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Home.css";
import "./darkLightSwitcher.css";
import Header from "../../components/Header";

import SearchbarContainer from "../../containers/SearchbarContainer";
import ForecastContainer from "../../containers/ForecastContainer";
import CurrentWeatherContainer from "../../containers/CurrentWeatherContainer";
import FavoritesContainer from "../../containers/FavoritesContainer";

import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../../actions";

const Homepage = () => {
  const dispatch = useDispatch();
  let searchBar = useSelector((state) => state.searchBar);
  let darkMode = useSelector((state) => state.darkMode);
  let isDarkMode = darkMode ? "text-secondary text-shadow-white" : "text-white";

  const handleSwitcher = () => {
    dispatch(setDarkMode());
  };

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Switch>
        <Route path="/favorites">
          <FavoritesContainer />
        </Route>
        <Route path="/">
          {searchBar && <SearchbarContainer />}
          <CurrentWeatherContainer />
          <ForecastContainer />
        </Route>
      </Switch>
      <div className="darkModeSwitcher">
        <input
          id="darkMode"
          type="checkbox"
          name="check"
          onChange={handleSwitcher}
        />
        <label htmlFor="darkMode"></label>
        <h6 className={`mt-3 ms-2 ${isDarkMode}`}>
          {darkMode ? "Dark Mode" : "Light Mode"}
        </h6>
      </div>
    </Router>
  );
};

export default Homepage;
