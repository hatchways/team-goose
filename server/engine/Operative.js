class Operative {
    constructor(user, team) {
        this.user = user;
        this.team = team;
    }

    selectCard(card, board) {
        return board.chooseCard(card);
    }
}

module.exports = Operative;