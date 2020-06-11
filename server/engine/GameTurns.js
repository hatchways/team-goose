
const Team = require('./Team');

const GameTurns = {
  RED_AGENT_TURN: {
    team: Team.TEAM_COLOR.RED,
    role: "Field Agent",
  },
  BLUE_AGENT_TURN: {
    team: Team.TEAM_COLOR.BLUE,
    role: "Field Agent",
  },
  RED_SPY_TURN: {
    team: Team.TEAM_COLOR.RED,
    role: "Spymaster",
  },
  BLUE_SPY_TURN: {
    team: Team.TEAM_COLOR.BLUE,
    role: "Spymaster",
  },
  //For now 
  END: "End",
};

module.exports = GameTurns;