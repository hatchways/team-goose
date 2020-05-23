class Team {
  constructor(color) {
    this.teamColor = color;
    this.players = [];
    this.operatives = [];
    this.spymaster = null;
  }

  addPlayer(player) {
    this.players.push(player);
  }

  addOperative(operative) {
    this.operatives.push(operative);
  }

  getOperatives() {
    return this.operatives;
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
