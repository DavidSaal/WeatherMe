const darkModeReducer = (state = false, action) => {
  switch (action.type) {
    case "setDarkMode":
      return !state;
    default:
      return state;
  }
};

export default darkModeReducer;
