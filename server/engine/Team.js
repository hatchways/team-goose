class Team {
  constructor() {
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

  setSpymaster(player) {
    this.spymaster = player;
  }

  getSpymaster() {
    return this.spymaster;
  }
}

module.exports = Team;
