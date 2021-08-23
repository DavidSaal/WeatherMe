import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import urls from "../../config/urls";
import { autoCompleteAPI } from "../../services/axiosService";

import { useDispatch } from "react-redux";
import { setCity, setLoader } from "../../actions";

const SearchbarContainer = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState("");
  const [cities, setCities] = useState([]);

  const onChangeHandler = (e) => {
    setValue(e.target.value);
  };

  const onClickHandler = (e) => {
    //dispatch(setLoader());
    dispatch(setCity(e.target.name, e.target.id));
    setValue("");
  };

  const getCities = async () => {
    const url = urls.autocomplete.cities(value);
    try {
      const { data } = await autoCompleteAPI.get(url);
      setCities(data);
    } catch (error) {
      console.error({ error: error.message });
    }
  };

  useEffect(() => {
    value && getCities();
  }, [value]);

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <SearchBar
          placeholder="where are we... 🤔"
          onChangeHandler={onChangeHandler}
          value={value}
        />
        {value &&
          cities.length > 0 &&
          cities.map((city) => (
            <button
              key={city.Key}
              id={city.Key}
              name={city.LocalizedName}
              onClick={onClickHandler}
              className="m-3 py-06 btn btn-white shadow-sm fs-4 col-12 col-sm-4"
            >
              {city.LocalizedName}
            </button>
          ))}
      </div>
    </div>
  );
};

export default SearchbarContainer;
