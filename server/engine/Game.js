const Board = require("./Board");
const GameTurns = require("./GameTurns");
const WordRoles = require("./WordRoles");

const TeamColor = {
  RED: "Red",
  BLUE: "Blue",
};

const TEAM_ROLE = {
  SPYMASTER: "Spymaster",
  FIELD_AGENT: "Field Agent",
};

const DEFAULT_RED_TEAM_STATE = [
  { team: TeamColor.RED, role: TEAM_ROLE.SPYMASTER, user: {id: "id1", name: "name1"} },
  { team: TeamColor.RED, role: TEAM_ROLE.FIELD_AGENT, user: null },
  { team: TeamColor.RED, role: TEAM_ROLE.FIELD_AGENT, user: null },
  { team: TeamColor.RED, role: TEAM_ROLE.FIELD_AGENT, user: null },
];

const DEFAULT_BLUE_TEAM_STATE = [
  { team: TeamColor.BLUE, role: TEAM_ROLE.SPYMASTER, user: {id: "id3", name: "name3"} },
  { team: TeamColor.BLUE, role: TEAM_ROLE.FIELD_AGENT, user: null },
  { team: TeamColor.BLUE, role: TEAM_ROLE.FIELD_AGENT, user: null },
  { team: TeamColor.BLUE, role: TEAM_ROLE.FIELD_AGENT, user: null },
];

const MAX_NUM_OF_GUESSES = 25;
const TIME_INTERVAL = 46;

class Game {
  constructor(hostId) {
    this.hostId = hostId;

    this.gameTurn = [GameTurns.BLUE_SPY_TURN, GameTurns.RED_SPY_TURN][
      Math.round(Math.random())
    ];

    this.redTeam = DEFAULT_RED_TEAM_STATE;
    this.blueTeam = DEFAULT_BLUE_TEAM_STATE;

    this.redPoints = 0;
    this.bluePoints = 0;
    this.numGuessLeft = MAX_NUM_OF_GUESSES;
    this.maxNumOfGuess = MAX_NUM_OF_GUESSES;
    this.winner = null;
    this.timer = null;
    this.timeEnd = null;
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
    const { blueAgentNum, cards, redAgentNum } = this.gameBoard;
    return {
      gameTurn: this.gameTurn,
      redPoints: this.redPoints,
      bluePoints: this.bluePoints,
      gameBoard: { blueAgentNum, cards, redAgentNum },
      numGuessLeft: this.numGuessLeft,
      winner: this.winner,
      timeEnd: this.timeEnd
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
  setTimer(timer) {
    this.timer = timer;
  }
  setTimeEnd() {
    this.timeEnd = Date.now() + TIME_INTERVAL * 1000;
  }


  vote(data) {
    switch (data.player.team) {
      case TeamColor.RED:
        if (this.getGameTurn() == GameTurns.RED_AGENT_TURN) {
          if (!this.getBoard().checkIfVoted(data.index, data.player)) {
            this.getBoard().voteOnCard(data.index, data.player);
          }
        }
        break;
      case TeamColor.BLUE:
        if (this.getGameTurn() == GameTurns.BLUE_AGENT_TURN) {
          if (!this.getBoard().checkIfVoted(data.index, data.player)) {
            this.getBoard().voteOnCard(data.index, data.player);
          }
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
          this.setWinner(TeamColor.BLUE);
        } else if (this.getGameTurn() === GameTurns.BLUE_AGENT_TURN) {
          this.setWinner(TeamColor.RED);
        }
        votedCards[num].select();
        break;
      }
      if (votedCards[num].role === WordRoles.RED) {
        if (this.getGameTurn() === GameTurns.RED_AGENT_TURN) {
          this.addRedPoint();
          votedCards[num].select();
        } else if (this.getGameTurn() === GameTurns.BLUE_AGENT_TURN) {
          this.addRedPoint();
          votedCards[num].select();
          this.setGameTurn(GameTurns.RED_SPY_TURN); //GameTurns.RED_SPY_TURN
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
          this.setGameTurn(GameTurns.BLUE_SPY_TURN); //GameTurns.BLUE_SPY_TURN
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
      votedCards[num].voted = [];
    }
  }

  nextGameTurn() {
    if (!this.checkIfWinning()) {
      switch (this.gameTurn) {
        case GameTurns.RED_SPY_TURN:
          this.setGameTurn(GameTurns.RED_AGENT_TURN);
          break;
        case GameTurns.BLUE_SPY_TURN:
          this.setGameTurn(GameTurns.BLUE_AGENT_TURN);
          break;
        case GameTurns.RED_AGENT_TURN:
          this.decideCardSelect();
          if (this.getGameTurn() === GameTurns.RED_AGENT_TURN) {
            this.setGameTurn(GameTurns.BLUE_SPY_TURN); //GameTurns.BLUE_SPY_TURN
          }
          break;
        case GameTurns.BLUE_AGENT_TURN:
          this.decideCardSelect();
          if (this.getGameTurn() === GameTurns.BLUE_AGENT_TURN) {
            this.setGameTurn(GameTurns.RED_SPY_TURN); //GameTurns.RED_SPY_TURN
          }
          break;
        case GameTurns.END:
          console.log("I'm in the end");
          break;
      }
    }
  }

  giveHint(numGuess) {
    numGuess = parseInt(numGuess);
    this.setMaxNumGuess(numGuess);
    this.setNumGuessLeft(numGuess);
  }

  checkIfWinning() {
    if (this.getRedPoints() === this.gameBoard.getRedAgentNum()) {
      this.setWinner(TeamColor.RED);
      return true;
    }
    if (this.getBluePoints() === this.gameBoard.getBlueAgentNum()) {
      this.setWinner(TeamColor.BLUE);
      return true;
    }
    return false;
  }

  resetGame() {
    this.bluePoints = 0;
    this.redPoints = 0;
    this.numGuessLeft = MAX_NUM_OF_GUESSES;
    this.gameBoard.generateNewRound();
    this.gameTurn = [GameTurns.BLUE_SPY_TURN, GameTurns.RED_SPY_TURN][
      Math.round(Math.random())
    ];
    this.winner = null;
    this.timeEnd = null;
    clearInterval(this.timer);
  }

  startTimerInterval(gameIO, matchId) {
    clearInterval(this.timer);
    this.setTimeEnd();
    this.setTimer(setInterval(() => {      
        this.setTimeEnd();
        this.nextGameTurn();
        gameIO.to(matchId).emit("game state change", this.getGameState());
    }, TIME_INTERVAL * 1000));
  }
}

module.exports = Game;

