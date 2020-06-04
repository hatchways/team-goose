const Game = require("../engine/Game");
const uuid = require("uuid");

class MatchManager {
  constructor() {
    this.matches = new Map();
  }

  createMatch(hostId) {
    const game = new Game(hostId);
    const matchId = uuid.v4();
    this.matches.set(matchId, game);
    return {
      matchId: matchId,
      redTeam: game.getRedTeam(),
      blueTeam: game.getBlueTeam(),
    };
  }

  getMatch(matchId) {
    if (this.matches.has(matchId)) {
      return this.matches.get(matchId);
    }
    return null;
  }

  joinMatch(matchId) {
    const game = this.getMatch(matchId);
    if (!game) {
      return { status: 400, message: "Match does not exist" };
    } else {
      return {
        status: 200,
        message: "Join Successfully",
        redTeam: game.getRedTeam(),
        blueTeam: game.getBlueTeam(),
      };
    }
  }
}

module.exports = new MatchManager();
