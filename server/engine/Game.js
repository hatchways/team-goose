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
  {
    team: TeamColor.RED,
    role: TEAM_ROLE.SPYMASTER,
    user: { id: "id1", name: "Player 1" },
  },
  {
    team: TeamColor.RED,
    role: TEAM_ROLE.FIELD_AGENT,
    user: { id: "id2", name: "Player 2" },
  },
  { team: TeamColor.RED, role: TEAM_ROLE.FIELD_AGENT, user: null },
  { team: TeamColor.RED, role: TEAM_ROLE.FIELD_AGENT, user: null },
];

const DEFAULT_BLUE_TEAM_STATE = [
  { team: TeamColor.BLUE, role: TEAM_ROLE.SPYMASTER, user: null },
  { team: TeamColor.BLUE, role: TEAM_ROLE.FIELD_AGENT, user: null },
  { team: TeamColor.BLUE, role: TEAM_ROLE.FIELD_AGENT, user: null },
  { team: TeamColor.BLUE, role: TEAM_ROLE.FIELD_AGENT, user: null },
];

const MAX_NUM_OF_GUESSES = 25;

class Game {
  constructor(hostId) {
    this.hostId = hostId;

    // this.gameTurn = [GameTurns.BLUE_SPY_TURN, GameTurns.RED_SPY_TURN][
    //   Math.round(Math.random())
    // ];

    this.gameTurn = GameTurns.BLUE_SPY_TURN;

    this.redTeam = DEFAULT_RED_TEAM_STATE;
    this.blueTeam = DEFAULT_BLUE_TEAM_STATE;

    this.redPoints = 0;
    this.bluePoints = 0;
    this.numGuessLeft = 0;
    this.maxNumOfGuess = MAX_NUM_OF_GUESSES;
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
      case TeamColor.RED:
        if (this.getGameTurn() == GameTurns.RED_AGENT_TURN) {
          if (!this.getBoard().checkIfVoted(data.index, data.player)) {
            this.getBoard().voteOnCard(data.index, data.player);
          }
        }
        break;
      case TeamColor.BLUE:
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
