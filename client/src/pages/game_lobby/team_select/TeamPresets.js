export const TEAM_CODE = {
  RED: "Red",
  BLUE: "Blue",
};

export const DEFAULT_TEAM_STATE = [
  { role: "Spymaster", player: {id:"id_1", name:"name1"} },
  { role: "Field Agent", player: {id:"id_2", name:"name2"} },
  { role: "Field Agent", player: null },
  { role: "Field Agent", player: null },
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
