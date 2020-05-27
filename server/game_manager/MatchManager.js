const Game = require("../engine/Game");

class MatchManager {
    constructor() {
        this.matches = new Map();
    }

    createMatch(hostId) {
        const game = new Game(hostId);
        // console.log("new game", game);
        const matchId = "387489327"; //temp
        this.matches.set(matchId, game);
        console.log(this.matches);
        return {matchId : matchId};
    }

    getMatch(matchId) {
        if(this.matches.has(matchId)) {
            return this.matches.get(matchId);
        }
        return null;
    }

    joinMatch(matchId)  {
        const game = this.getMatch(matchId);
        if (!game) {
            return {message: "Match does not exist"};
        } else {
            return {message: "Join Successfully"};
        }
    }
}

module.exports = new MatchManager();