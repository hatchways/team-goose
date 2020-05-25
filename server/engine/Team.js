class Team {
  constructor(color) {
    this.teamColor = color;
    this.players = [];
    this.fieldAgents = [];
    this.spymaster = null;
  }

  addPlayer(player) {
    this.players.push(player);
  }

  addFieldAgent(fieldAgent) {
    this.fieldAgents.push(fieldAgent);
  }

  getFieldAgent() {
    return this.fieldAgents;
  }

  getPlayers() {
    return this.players;
  }

  getSpymaster() {
    return this.spymaster;
  }

  setSpymaster(player) {
    this.spymaster = player;
  }
}

const TeamColor = {
  RED: "RED",
  BLUE: "BLUE",
};
module.exports = { Team, TeamColor };
