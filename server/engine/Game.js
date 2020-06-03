const Board = require("./Board");
const { Team, TeamColor } = require("./Team");
const FieldAgent = require("./FieldAgent");
const SpyMaster = require("./SpyMaster");
const GameTurns = require("./GameTurns");
const PlayerRoles = require("./PlayerRoles");
const WordRoles = require("./WordRoles");

class Game {
  constructor(hostId) {
    this.hostId = hostId;

    this.gameTurn = [GameTurns.BLUE_SPY_TURN, GameTurns.RED_SPY_TURN][
      Math.round(Math.random())
    ];

    this.redTeam = new Team(TeamColor.RED);
    this.blueTeam = new Team(TeamColor.BLUE);
    this.redPoints = 0;
    this.bluePoints = 0;
    this.numGuessLeft = 0;
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

  //reducers
  reduceNumGuessLeft() {
    this.numGuessLeft -= 1;
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
  getBoard() {
    return this.gameBoard;
  }
  getGameState() {
    return {
      gameTurn: this.gameTurn,
      redPoints: this.redPoints,
      bluePoints: this.bluePoints,
      //   gameBoard: this.gameBoard,
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

  setRole(player) {
    switch (player.role) {
      case PlayerRoles.RED_FIELD_AGENT:
        const newRedFieldAgent = new FieldAgent(player, TeamColor.RED);
        this.redTeam.addPlayer(newRedFieldAgent);
        this.redTeam.addFieldAgent(newRedFieldAgent);
        break;
      case PlayerRoles.BLUE_FIELD_AGENT:
        const newBlueFieldAgent = new FieldAgent(player, TeamColor.BLUE);
        this.redTeam.addPlayer(newBlueFieldAgent);
        this.redTeam.addFieldAgent(newBlueFieldAgent);
        break;
      case PlayerRoles.RED_SPY_MASTER:
        const newRedSpyMaster = new SpyMaster(player, TeamColor.RED);
        this.redSpyMaster = newRedSpyMaster;
        this.redTeam.addPlayer(newRedSpyMaster);
        this.redTeam.setSpymaster(newRedSpyMaster);
        break;
      case PlayerRoles.BLUE_SPY_MASTER:
        const newBlueSpyMaster = new SpyMaster(player, TeamColor.BLUE);
        this.blueSpyMaster = newBlueSpyMaster;
        this.blueTeam.addPlayer(newBlueSpyMaster);
        this.blueTeam.setSpymaster(newBlueSpyMaster);
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
        // this.redTeam.spymaster.setClue(info);
        this.setGameTurn(GameTurns.RED_AGENT_TURN);
        break;
      case GameTurns.BLUE_SPY_TURN:
        this.setNumGuessLeft(info.numGuess);
        // this.blueTeam.spymaster.setClue(info);
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