const isCelsiusReducer = (state = true, action) => {
  switch (action.type) {
    case "setIsCelsius":
      return !state;
    default:
      return state;
  }
};

export default isCelsiusReducer;
