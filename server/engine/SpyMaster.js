class SpyMaster {
    constructor(user, team) {
        this.user = user;
        this.team = team;
        this.clue = {};
    }

    setClue(clue) {
        //todo
        //return moves?
        this.clue = clue;
    }

    getClue() {
        return this.clue;
    }

    deleteClue() {
        this.clue = {};
    }
}

module.exports = SpyMaster;