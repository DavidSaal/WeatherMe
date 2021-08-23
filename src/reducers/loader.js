const loaderReducer = (state = false, action) => {
  switch (action.type) {
    case "setLoader":
      return !state;
    default:
      return state;
  }
};

export default loaderReducer;
