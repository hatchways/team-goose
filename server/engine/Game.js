const Board = require("./Board");
const GameTurns = require("./GameTurns");
const WordRoles = require("./WordRoles");
const Team = require('./Team');

const MAX_NUM_OF_GUESS = 25;

class Game {
  constructor(hostId) {
    this.hostId = hostId;
    // this.gameTurn = [GameTurns.BLUE_SPY_TURN, GameTurns.RED_SPY_TURN][
    //   Math.round(Math.random())
    // ];
    this.gameTurn = GameTurns.BLUE_SPY_TURN;
    this.redTeam = JSON.parse(JSON.stringify(Team.DEFAULT_RED_TEAM_STATE));
    this.blueTeam = JSON.parse(JSON.stringify(Team.DEFAULT_BLUE_TEAM_STATE));

    // this.redTeam = [
    //   { role: "Spymaster", player: { id: "id_1", name: "name1" } },
    //   { role: "Field Agent", player: { id: "id_2", name: "name2" } },
    // ];
    // this.blueTeam = [
    //   { role: "Spymaster", player: { id: "id_3", name: "name3" } },
    //   { role: "Field Agent", player: { id: "id_4", name: "name4" } },
    // ];
    this.redPoints = 0;
    this.bluePoints = 0;
    this.numGuessLeft = 0;
    this.maxNumOfGuess = MAX_NUM_OF_GUESS;
    this.winner = null;

    this.gameBoard = new Board();
  }

  //adders
  addRedPoint() {
    this.redPoints += 1;
  }
  addBluePoint() {
    this.bluePoints += 1;
  }
  addPlayerToBlueTeam(player, index) {
    this.blueTeam[index].player = player;
  }
  addPlayerToRedTeam(player, index) {
    this.redTeam[index].player = player;
  }

  //reducers
  reduceNumGuessLeft() {
    this.numGuessLeft -= 1;
  }
  removePlayerFromBlueTeam(index) {
    this.blueTeam[index].player = null;
  }
  removePlayerFromRedTeam(index) {
    this.redTeam[index].player = null;
  }

  //getters
  getHostId() {
    return this.hostId;
  }
  getGameTurn() {
    return this.gameTurn;
  }
  getRedTeam() {
    return this.redTeam;
  }
  getBlueTeam() {
    return this.blueTeam;
  }
  getRedPoints() {
    return this.redPoints;
  }
  getBluePoints() {
    return this.bluePoints;
  }
  getNumGuessLeft() {
    return this.numGuessLeft;
  }
  getMaxNumGuess() {
    return this.maxNumOfGuess;
  }
  getWinner() {
    return this.winner;
  }
  getVotedCards() {
    return this.votedCards;
  }
  getBoard() {
    return this.gameBoard;
  }
  getGameState() {
    return {
      gameTurn: this.gameTurn,
      redPoints: this.redPoints,
      bluePoints: this.bluePoints,
      gameBoard: this.gameBoard,
      numGuessLeft: this.numGuessLeft,
    };
  }

  //setters
  setGameTurn(turn) {
    this.gameTurn = turn;
  }
  setNumGuessLeft(num) {
    this.numGuessLeft = num + 1;
  }
  setMaxNumGuess(num) {
    this.maxNumOfGuess = num + 1;
  }
  setWinner(team) {
    this.winner = team;
  }

  setRedTeam(team) {
    this.redTeam = team;
  }

  setBlueTeam(team) {
    this.blueTeam = team;
  }

  vote(data) {
    switch (data.player.team) {
      case Team.TEAM_COLOR.RED:
        if (this.getGameTurn() == GameTurns.RED_AGENT_TURN) {
          if (!this.getBoard().checkIfVoted(data.index, data.player)) {
            this.getBoard().voteOnCard(data.index, data.player);
          }
        }
        break;
      case Team.TEAM_COLOR.BLUE:
        if (!this.getBoard().checkIfVoted(data.index, data.player)) {
          this.getBoard().voteOnCard(data.index, data.player);
        }
        break;
    }
  }

  decideCardSelect() {
    let votedCards = this.getBoard().getVotedCards();
    votedCards.sort((cardA, cardB) => cardB.voted.length - cardA.voted.length);
    const actualGuessNum = Math.min(votedCards.length, this.getMaxNumGuess());
    for (let num = 0; num < actualGuessNum; num++) {
      if (votedCards[num].role === WordRoles.BLACK) {
        if (this.getGameTurn() === GameTurns.RED_AGENT_TURN) {
          this.setWinner(Team.TEAM_COLOR.BLUE);
        } else if (this.getGameTurn() === GameTurns.BLUE_AGENT_TURN) {
          this.setWinner(Team.TEAM_COLOR.RED);
        }
        votedCards[num].select();
        this.setGameTurn(GameTurns.End);
        break;
      }
      if (votedCards[num].role === WordRoles.RED) {
        if (this.getGameTurn() === GameTurns.RED_AGENT_TURN) {
          this.addRedPoint();
          votedCards[num].select();
        } else if (this.getGameTurn() === GameTurns.BLUE_AGENT_TURN) {
          this.addRedPoint();
          votedCards[num].select();
          this.setGameTurn(GameTurns.RED_AGENT_TURN); //should be GameTurns.RED_SPY_TURN
          this.delRestVotes(votedCards, num);
          break;
        }
      }
      if (votedCards[num].role === WordRoles.BLUE) {
        if (this.getGameTurn() === GameTurns.BLUE_AGENT_TURN) {
          this.addBluePoint();
          votedCards[num].select();
        } else if (this.getGameTurn() === GameTurns.RED_AGENT_TURN) {
          this.addBluePoint();
          votedCards[num].select();
          this.setGameTurn(GameTurns.BLUE_AGENT_TURN); // should be GameTurns.BLUE_SPY_TURN
          this.delRestVotes(votedCards, num);
          break;
        }
      }
      if (votedCards[num].role === WordRoles.WHITE) {
        votedCards[num].select();
      }
    }
    this.delRestVotes(votedCards, actualGuessNum - 1);
    console.log("============voted cards=============\n", ...votedCards);
    console.log(
      "============points=============\n",
      "Blue points",
      this.getBluePoints(),
      "Red Points",
      this.getRedPoints()
    );
  }

  delRestVotes(votedCards, index) {
    for (let num = index + 1; num < votedCards.length; num++) {
      console.log(votedCards[num], "in delRestVotes");
      votedCards[num].voted = [];
    }
  }

  nextGameTurn() {
    switch (this.gameTurn) {
      case GameTurns.RED_SPY_TURN:
        this.setGameTurn(GameTurns.BLUE_AGENT_TURN);
        break;
      case GameTurns.BLUE_SPY_TURN:
        this.setGameTurn(GameTurns.RED_AGENT_TURN);
        break;
      case GameTurns.RED_AGENT_TURN:
        this.decideCardSelect();
        if (this.getGameTurn() === GameTurns.RED_AGENT_TURN) {
          this.setGameTurn(GameTurns.BLUE_AGENT_TURN); //should be blue spy turn
        }
        break;
      case GameTurns.BLUE_AGENT_TURN:
        this.decideCardSelect();
        if (this.getGameTurn() === GameTurns.BLUE_AGENT_TURN) {
          this.setGameTurn(GameTurns.RED_AGENT_TURN); //should be Red spy turn
        }
        break;
      case GameTurns.End:
        console.log("I'm in the end");
        break;
    }
  }

  giveHint(numGuess) {
    if (numGuess > 0) {
      this.setMaxNumGuess(numGuess);
      this.setNumGuessLeft(numGuess);
    }
  }

  checkIfWinning(info) {
    if (
      this.getGameTurn() === GameTurns.BLUE_AGENT_TURN ||
      this.getGameTurn() === GameTurns.RED_AGENT_TURN
    ) {
      if (
        info.role === WordRoles.BLACK &&
        this.getGameTurn() === GameTurns.BLUE_AGENT_TURN
      ) {
        this.setWinner(this.getRedTeam());
        return true;
      }
      if (
        info.role === WordRoles.BLACK &&
        this.getGameTurn() === GameTurns.RED_AGENT_TURN
      ) {
        this.setWinner(this.getBlueTeam());
        return true;
      }
      if (this.getRedPoints() === this.gameBoard.getRedAgentNum()) {
        this.setWinner(this.getRedTeam());
        return true;
      }
      if (this.getBluePoints() === this.gameBoard.getBlueAgentNum()) {
        this.setWinner(this.getBlueTeam());
        return true;
      }
    }
    return false;
  }

  stopGuess() {
    switch (this.gameTurn) {
      case GameTurns.BLUE_AGENT_TURN:
        this.setNumGuessLeft = 0;
        this.setGameTurn(GameTurns.RED_SPY_TURN);
        break;
      case GameTurns.RED_AGENT_TURN:
        this.setNumGuessLeft = 0;
        this.setGameTurn(GameTurns.BLUE_SPY_TURN);
        break;
    }
  }
  resetGame() {
    this.bluePoints = 0;
    this.redPoints = 0;
    this.numGuessLeft = 0;
    this.gameBoard.generateNewRound();
    this.gameTurn = [GameTurns.BLUE_SPY_TURN, GameTurns.RED_SPY_TURN][
      Math.round(Math.random())
    ];
    this.winner = null;
  }
}

module.exports = Game;

// const newGame = new Game("user1");
// newGame.giveHint(1);
// newGame.nextGameTurn();
// console.log("============game Turn============\n", newGame.getGameState().gameTurn);
// newGame.vote({ index: 0, player: { name: "user1", team: "Red", id: "id_1" } });
// newGame.vote({ index: 1, player: { name: "user2", team: "Red", id: "id_2" } });
// newGame.vote({ index: 1, player: { name: "user1", team: "Red", id: "id_1" } });
// newGame.vote({ index: 2, player: { name: "user2", team: "Red", id: "id_2" } });
// newGame.nextGameTurn();
// console.log(
//   "=============cards===========\n",
//   newGame.getGameState().gameBoard.getCards()[0], "index 0\n",
//   newGame.getGameState().gameBoard.getCards()[1], "index 1\n",
//   newGame.getGameState().gameBoard.getCards()[2], "index 2\n"
// );
// console.log("============points============\n", "red points", newGame.getRedPoints(), "blue points", newGame.getBluePoints());
// console.log("=============game Turn=========\n", newGame.getGameTurn());
// newGame.giveHint(3);
// newGame.nextGameTurn();
