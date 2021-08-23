const badgeReducer = (
  state = localStorage.getItem("badge")
    ? Number(localStorage.getItem("badge"))
    : 0,
  action
) => {
  switch (action.type) {
    case "increaseBadge":
      return state + 1;
    case "decreaseBadge":
      return state - 1;
    default:
      return state;
  }
};

export default badgeReducer;
