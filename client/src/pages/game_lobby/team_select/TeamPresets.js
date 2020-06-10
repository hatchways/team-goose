export const TEAM_CODE = {
  RED: "RED",
  BLUE: "BLUE",
};

export const DEFAULT_TEAM_STATE = [
  { role: "Spymaster", player: null },
  { role: "Field Agent", player: null },
  { role: "Field Agent", player: null },
  { role: "Field Agent", player: null },
];

export const ACTION_TYPE = {
  SET_PLAYER: "SET_PLAYER",
  REMOVE_PLAYER: "REMOVE_PLAYER",
  UPDATE_PLAYERS: "UPDATE_PLAYERS",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_PLAYER:
      state[action.payload].player = action.player;
      return state;
    case ACTION_TYPE.REMOVE_PLAYER:
      state[action.payload].player = null;
      return state;
    case ACTION_TYPE.UPDATE_PLAYERS:
      state = [...action.players];
      return state;
    default:
      return state;
  }
};
