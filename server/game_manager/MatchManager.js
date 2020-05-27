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