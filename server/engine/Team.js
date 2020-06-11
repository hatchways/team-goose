const TEAM_ROLE = {
  FIELD_AGENT: "Field Agent",
  SPYMASTER: "Spymaster",
};

const TeamColor = {
    RED: "Red",
    BLUE: "Blue",
};

const DEFAULT_RED_TEAM_STATE = [
  { team: TeamColor.RED, role: TEAM_ROLE.SPYMASTER, player: null },
  { team: TeamColor.RED, role: TEAM_ROLE.FIELD_AGENT, player: null },
  { team: TeamColor.RED, role: TEAM_ROLE.FIELD_AGENT, player: null },
  { team: TeamColor.RED, role: TEAM_ROLE.FIELD_AGENT, player: null },
];

const DEFAULT_BLUE_TEAM_STATE = [
  { team: TeamColor.BLUE, role: TEAM_ROLE.SPYMASTER, player: null },
  { team: TeamColor.BLUE, role: TEAM_ROLE.FIELD_AGENT, player: null },
  { team: TeamColor.BLUE, role: TEAM_ROLE.FIELD_AGENT, player: null },
  { team: TeamColor.BLUE, role: TEAM_ROLE.FIELD_AGENT, player: null },
];

module.exports = {
  TEAM_COLOR: TeamColor,
  TEAM_ROLE: TEAM_ROLE,
  DEFAULT_RED_TEAM_STATE: DEFAULT_RED_TEAM_STATE,
  DEFAULT_BLUE_TEAM_STATE: DEFAULT_BLUE_TEAM_STATE,
};
