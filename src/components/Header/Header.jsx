import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import "./switcher.css";
import home from "../../assets/images/home.png";
import favorite from "../../assets/images/favorite.png";

import { useDispatch, useSelector } from "react-redux";
import { setIsCelsius, setSearchBar } from "../../actions";

const Header = (props) => {
  const dispatch = useDispatch();
  let badge = useSelector((state) => state.badge);
  let darkMode = useSelector((state) => state.darkMode);
  let isDarkMode = darkMode ? "text-white" : "text-dark";
  let bgDarkMode = darkMode ? "bg-white" : "bg-dark";

  const handleSwitcher = () => {
    dispatch(setIsCelsius());
  };

  const handleSearchBarToggle = () => {
    dispatch(setSearchBar());
  };

  return (
    <nav
      className={`navbar sticky-top navbar-light shadow-sm px-4 border-bottom ${
        darkMode ? "bg-dark" : "bg-light"
      }`}
    >
      <div className="container-fluid">
        <div className="navbar-brand d-flex align-items-center">
          <div className="menu mt-1" onClick={handleSearchBarToggle}>
            <span className={`${bgDarkMode}`}></span>
            <span className={`${bgDarkMode}`}></span>
            <span className={`${bgDarkMode}`}></span>
          </div>
          <p className={`display-6 ms-4 mt-3 ${isDarkMode}`}>WhetherMe</p>
          <p className={`display-6 ms-2 fs-6 mt-4 ${isDarkMode}`}>
            By David Saal
          </p>
        </div>
        <div className="row d-flex align-items-center">
          <div className="col-4">
            <Link to="/favorites" className="text-dark text-decoration-none">
              <div className="mt-4">
                <img className="mb-2-5 ms-4" src={favorite} alt="Favorite" />
                <span className="badge rounded-pill badge-notification bg-danger">
                  {badge}
                </span>
                <p className={`font m-0 ${isDarkMode}`}>Favorites</p>
              </div>
            </Link>
          </div>
          <div className="col">
            <Link to="/" className="text-dark text-decoration-none">
              <div className="mx-4 mt-4">
                <img className="mb-2-5" src={home} alt="Home" />
                <p className={`font m-0 ${isDarkMode}`}>Home</p>
              </div>
            </Link>
          </div>
          <div className="col">
            <div className="switch-wrapper py-4 py-sm-0">
              <input
                type="checkbox"
                id="switch"
                defaultChecked="checked"
                onChange={handleSwitcher}
              />
              <label htmlFor="switch" className={`${isDarkMode}`}>
                <span>
                  <em></em>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
