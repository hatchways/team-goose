export const TEAM_CODE = {
  RED: "Red",
  BLUE: "Blue",
};

export const TEAM_ROLE = {
  SPYMASTER: "Spymaster",
  FIELD_AGENT: "Field Agent",
};

export const DEFAULT_RED_TEAM_STATE = [
  { team: TEAM_CODE.RED, role: TEAM_ROLE.SPYMASTER, player: null },
  { team: TEAM_CODE.RED, role: TEAM_ROLE.FIELD_AGENT, player: null },
  { team: TEAM_CODE.RED, role: TEAM_ROLE.FIELD_AGENT, player: null },
  { team: TEAM_CODE.RED, role: TEAM_ROLE.FIELD_AGENT, player: null },
];

export const DEFAULT_BLUE_TEAM_STATE = [
  { team: TEAM_CODE.BLUE, role: TEAM_ROLE.SPYMASTER, player: null },
  { team: TEAM_CODE.BLUE, role: TEAM_ROLE.FIELD_AGENT, player: null },
  { team: TEAM_CODE.BLUE, role: TEAM_ROLE.FIELD_AGENT, player: null },
  { team: TEAM_CODE.BLUE, role: TEAM_ROLE.FIELD_AGENT, player: null },
];

export const ACTION_TYPE = {
  SET_PLAYER: "SET_PLAYER",
  REMOVE_PLAYER: "REMOVE_PLAYER",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_PLAYER:
      state[action.payload].player = action.player;
      return state;
    case ACTION_TYPE.REMOVE_PLAYER:
      state[action.payload].player = null;
      return state;
    default:
      return state;
  }
};
