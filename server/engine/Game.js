const Board = require("./Board");
const Team = require("./Team");
const Operative = require("./Operative");
const SpyMaster = require("./SpyMaster");
const GameTurns = require("./GameTurns");
const PlayerRoles = require("./PlayerRoles");
const WordRoles = require("./WordRoles");

class Game {
  constructor(machId) {
    this.machId = machId;

    this.gameTurn = [GameTurns.BLUE_SPY_TURN, GameTurns.RED_SPY_TURN][
      Math.round(Math.random())
    ];

    this.redTeam = new Team();
    this.blueTeam = new Team();
    this.redPoints = 0;
    this.bluePoints = 0;
    this.numGuessLeft = 0;

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
  getMatchId() {
      return this.machId;
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
  getBoard() {
    return this.gameBoard;
  }
  getGameState() {
    return {
      gameTurn: this.gameTurn,
      redPoints: this.redPoints,
      bluePoints: this.bluePoints,
    //   gameBoard: this.gameBoard,
      numGuessLeft: this.numGuessLeft
    };
  }

  //setters
  setGameTurn(turn) {
    this.gameTurn = turn;
  }
  setNumGuessLeft(num) {
      this.numGuessLeft = num;
  }

  setGamePoints(guess) {
    switch(guess.role) {
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
            guess.select();
            this.setGameTurn(GameTurns.End);
            break;
    }
  }

  setRoles(players) {
    players.forEach((player) => {
      switch (player.role) {
        case PlayerRoles.RED_OP:
          const newRedOperative = new Operative(player, "Red");
          this.redTeam.addPlayer(newRedOperative);
          this.redTeam.addOperative(newRedOperative);
          break;
        case PlayerRoles.BLUE_OP:
          const newBlueOperative = new Operative(player, "Blue");
          this.redTeam.addPlayer(newBLueOperative);
          this.redTeam.addOperative(newBlueOperative);
          break;
        case PlayerRoles.RED_SPY:
          const newRedSpyMaster = new SpyMaster(player, "Red");
          this.redSpyMaster = newRedSpyMaster;
          this.redTeam.addPlayer(newRedSpyMaster);
          this.redTeam.setSpymaster(newRedSpyMaster);
          break;
        case PlayerRoles.BLUE_SPY:
          const newBlueSpyMaster = new SpyMaster(player, "Blue");
          this.blueSpyMaster = newBlueSpyMaster;
          this.blueTeam.addPlayer(newBlueSpyMaster);
          this.blueTeam.setSpymaster(newBlueSpyMaster);
          break;
      }
    });
  }

  nextGameTurn(info) {
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
        break;
    }   
  }

  isGameOver() {
  }

}


const newGame = new Game("123");
newGame.setRoles([{"user1":"user1", role:"Blue agent"}, {"user2":"user2", role:"Blue spymaster"}]);
//spymaster
console.log("============Spymaster===========");
newGame.nextGameTurn({clue:"afkj", numGuess:4});
console.log(newGame.getGameState());
//agents
console.log("=========Agents========")
newGame.nextGameTurn({guess:newGame.gameBoard.cards[0]});
console.log(newGame.gameBoard.cards[0]);
console.log(newGame.getGameState());
newGame.nextGameTurn({guess:newGame.gameBoard.cards[1]});
console.log(newGame.gameBoard.cards[1]);
console.log(newGame.getGameState());
newGame.nextGameTurn({guess:newGame.gameBoard.cards[2]});
console.log(newGame.gameBoard.cards[2]);
console.log(newGame.getGameState());
newGame.nextGameTurn({guess:newGame.gameBoard.cards[3]});
console.log(newGame.gameBoard.cards[3]);
console.log(newGame.getGameState());
//spymaster
console.log("========Spymaster=======");
newGame.nextGameTurn({clue:"asga", numGuess:2});
console.log(newGame.getGameState());
//agents
console.log("=======Agents=======")
newGame.nextGameTurn({guess:newGame.gameBoard.cards[4]});
console.log(newGame.gameBoard.cards[4]);
console.log(newGame.getGameState());
newGame.nextGameTurn({guess:newGame.gameBoard.cards[5]});
console.log(newGame.gameBoard.cards[5]);
console.log(newGame.getGameState());