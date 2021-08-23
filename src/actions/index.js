const setCity = (name, key) => {
  return { type: "setCity", payload: { name, key } };
};

const setLoader = () => {
  return { type: "setLoader" };
};

const setIsCelsius = () => {
  return { type: "setIsCelsius" };
};

const increaseBadge = () => {
  return { type: "increaseBadge" };
};

const decreaseBadge = () => {
  return { type: "decreaseBadge" };
};

const setSearchBar = () => {
  return { type: "setSearchBar" };
};

const setDarkMode = () => {
  return { type: "setDarkMode" };
};

export {
  setCity,
  setLoader,
  setIsCelsius,
  increaseBadge,
  decreaseBadge,
  setSearchBar,
  setDarkMode,
};
