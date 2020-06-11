const Board = require("./Board");
const GameTurns = require("./GameTurns");
const WordRoles = require("./WordRoles");
const Team = require('./Team');

const TeamColor = {
  RED:"RED",
  BLUE:"BLUE"
};

class Game {
  constructor(hostId) {
    this.hostId = hostId;

    this.gameTurn = [GameTurns.BLUE_SPY_TURN, GameTurns.RED_SPY_TURN][
      Math.round(Math.random())
    ];
    // { role: "" , player: { email, id, name } }
    this.redTeam = JSON.parse(JSON.stringify(Team.DEFAULT_TEAM_STATE));
    this.blueTeam = JSON.parse(JSON.stringify(Team.DEFAULT_TEAM_STATE));

    // this.redTeam = [{ role: "Spymaster", player: {id:"id_1", name:"name1"} },
    // { role: "Field Agent", player: {id:"id_2", name:"name2"} }];
    // this.blueTeam = [{ role: "Spymaster", player: {id:"id_3", name:"name3"} },
    // { role: "Field Agent", player: {id:"id_4", name:"name4"} }];

    this.redPoints = 0;
    this.bluePoints = 0;
    this.numGuessLeft = 0;
    this.maxNumOfGuess = 0;
    this.winner = null;

    this.votedCards = new Map();

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
    this.numGuessLeft = num;
  }
  setWinner(team) {
    this.winner = team;
  }
  setGamePoints(guess) {
    switch (guess.role) {
      case WordRoles.BLUE:
        this.addBluePoint();
        guess.select();
        break;
      case WordRoles.RED:
        this.addRedPoint();
        guess.select();
        break;
      case WordRoles.WHITE:
        guess.select();
        break;
      case WordRoles.BLACK:
        // guess.select();
        this.setGameTurn(GameTurns.End);
        break;
    }
  }

  setRedTeam(team) {
    this.redTeam = team;
  }

  setBlueTeam(team) {
    this.blueTeam = team;
  }

  setVotedCards(word) {
    let votedCards = this.getVotedCards();
    if (!votedCards.has(word)) {
      votedCards.set(word, {vote:1});
    } else {
      votedCards.get(word).vote++;
    }
  }

  vote(data) {
    switch(data.team) {
      case TeamColor.RED:
        if (this.getGameTurn() === this.GameTurns.RED_AGENT_TURN) {
          this.getBoard().voteOnCard(data.index, data.user);
          this.setVotedCards(data.word);
        }
        break;
      case TeamColor.BLUE:
        if (this.getGameTurn() === this.GameTurns.BLUE_AGENT_TURN) {
          this.getBoard().voteOnCard(data.index, data.user);
          this.setVotedCards(data.word);
        }
        break;
    }
  }

  nextGameTurn(info) {
    const winner = this.checkIfWinning(info.guess);
    if (winner) {
      this.setGameTurn(GameTurns.End);
    }
    switch (this.gameTurn) {
      case GameTurns.RED_SPY_TURN:
        this.setNumGuessLeft(info.numGuess);
        this.setGameTurn(GameTurns.RED_AGENT_TURN);
        break;
      case GameTurns.BLUE_SPY_TURN:
        this.setNumGuessLeft(info.numGuess);
        this.setGameTurn(GameTurns.BLUE_AGENT_TURN);
        break;
      case GameTurns.RED_AGENT_TURN:
        this.gameBoard.setCard(info.guess);
        this.reduceNumGuessLeft();
        this.setGamePoints(info.guess);

        if (this.getNumGuessLeft() === 0) {
          this.setGameTurn(GameTurns.BLUE_SPY_TURN);
        }
        break;
      case GameTurns.BLUE_AGENT_TURN:
        this.gameBoard.setCard(info.guess);
        this.reduceNumGuessLeft();
        this.setGamePoints(info.guess);

        if (this.getNumGuessLeft() === 0) {
          this.setGameTurn(GameTurns.RED_SPY_TURN);
        }
        break;
      case GameTurns.End:
        console.log("I'm in the end");
        break;
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
