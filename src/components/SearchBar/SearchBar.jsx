import React from "react";
import "./SearchBar.css";
import search from "../../assets/images/‏‏search.png";
import { useSelector } from "react-redux";

const SearchBar = ({ placeholder, onChangeHandler, value }) => {
  let darkMode = useSelector((state) => state.darkMode);
  let isDarkMode = darkMode ? "bg-dark" : "bg-white";

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="w-50 input-group">
        <input
          type="search"
          className={`form-control py-3 border-end-0 ${isDarkMode}`}
          placeholder={placeholder}
          aria-label="Search"
          aria-describedby="basic-addon1"
          onChange={onChangeHandler}
          value={value}
        />
        <span className={`input-group-text ${isDarkMode}`} id="basic-addon1">
          <img src={search} alt="Search" />
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
