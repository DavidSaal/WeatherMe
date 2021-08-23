const cityReducer = (state = { name: "Tel-Aviv", key: "215854" }, action) => {
  switch (action.type) {
    case "setCity":
      return { name: action.payload.name, key: action.payload.key };
    default:
      return state;
  }
};

export default cityReducer;
