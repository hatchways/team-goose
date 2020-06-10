const TEAM_CODE = {
    RED: "RED",
    BLUE: "BLUE",
};

const PLAYER_ROLE = {
    FIELD_AGENT: 'Field Agent',
    SPYMASTER: 'Spymaster'
}

const DEFAULT_TEAM_STATE = [
    { role: "Spymaster", player: null },
    { role: "Field Agent", player: null },
    { role: "Field Agent", player: null },
    { role: "Field Agent", player: null },
  ];
  
module.exports = {
    TEAM_CODE: TEAM_CODE,
    PLAYER_ROLE: PLAYER_ROLE,
    DEFAULT_TEAM_STATE: DEFAULT_TEAM_STATE
}