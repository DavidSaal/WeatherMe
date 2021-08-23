const searchBarReducer = (state = true, action) => {
  switch (action.type) {
    case "setSearchBar":
      return !state;
    default:
      return state;
  }
};

export default searchBarReducer;
