export const TEAM_CODE = {
  RED: "Red",
  BLUE: "Blue",
};

export const TEAM_ROLE = {
  SPYMASTER: "Spymaster",
  FIELD_AGENT: "Field Agent",
};

export const ACTION_TYPE = {
  SET_PLAYER: "SET_PLAYER",
  REMOVE_PLAYER: "REMOVE_PLAYER",
  SET_TEAM: "SET_TEAM",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_PLAYER:
      state[action.payload].user = action.user;
      return state;
    case ACTION_TYPE.REMOVE_PLAYER:
      state[action.payload].user = null;
      return state;
    case ACTION_TYPE.SET_TEAM:
      state = action.payload;
      return state;
    default:
      return state;
  }
};
