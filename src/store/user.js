const DEFAULT_STATE = {
  id: "",
  role: "",
  name: "",
  username: "",
  profile: "",
};

export const userReducer = (state = DEFAULT_STATE, action) => {
  if (action.type === "USER_LOGIN") {
    const dupState = { ...state };

    dupState.id = action.payload.id;
    dupState.role = action.payload.role;
    dupState.name = action.payload.name;
    dupState.username = action.payload.username;
    dupState.profile_url = action.payload.profile_url;

    return dupState;
  } else if (action.type === "USER_PROFILE") {
    const dupState = { ...state };

    dupState.profile_url = action.payload.profile_url;

    return dupState;
  } else if (action.type === "USER_LOGOUT") {
    return DEFAULT_STATE;
  }
  return state;
};
