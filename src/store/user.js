const DEFAULT_STATE = {
  id: "",
  role: "",
  username: "",
};

export const userReducer = (state = DEFAULT_STATE, action) => {
  if (action.type === "USER_LOGIN") {
    const dupState = { ...state };

    dupState.id = action.payload.id;
    dupState.role = action.payload.role;
    dupState.username = action.payload.username;

    return dupState;
  } else if (action.type === "USER_LOGOUT") {
    return DEFAULT_STATE;
  }
  return state;
};
