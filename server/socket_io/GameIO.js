const NAMESPACE = "/game";
const MatchManager = require("../manager/MatchManager");

let connection = null;
let countdown = 30;

class GameIO {
  constructor() {
    this.gameIO = null;
    this.chatIO = null;

    this.timer = null;
  }

  connect(io) {
    this.gameIO = io.of(NAMESPACE);

    this.gameIO.on("connection", (socket) => {
      console.log(`New client connected from the game: ${socket.id}`);

      socket.on("join game", (matchId) => {
        const message = MatchManager.joinMatch(matchId);
        socket.emit("resolve join game", message);
      });

      socket.on("disconnect", () => {
        console.log(`A client disconnected from the game: ${socket.id}`);
      });

      socket.on("create game", (hostId) => {
        const match = MatchManager.createMatch(hostId);
        if (match) {
          socket.emit("resolve create game", match);
        }
      });

      socket.on("game start", (matchId) => {
        this.gameIO.to(matchId).emit("resolve start game");
        this.gameIO.to(matchId).emit("start timer");
        this.timer = this.startTimerInterval(matchId);
      });

      socket.on("game state onload", (matchId) => {
        const match = MatchManager.getMatch(matchId);
        if (match) {
          socket.join(matchId);
          socket.emit("game state change", match.getGameState());
        }
      });

      socket.on("end turn", (matchId) => {
        clearInterval(this.timer);
        const match = MatchManager.getMatch(matchId);
        match.nextGameTurn();
        this.gameIO.to(matchId).emit("game state change", match.getGameState());
        this.gameIO.to(matchId).emit("start timer");
        this.timer = this.startTimerInterval(matchId);
      });

      socket.on("card select", (matchId, data) => {
        const match = MatchManager.getMatch(matchId);

        if (match) {
          const room = `${matchId}-${data.player.team}`;
          const card = match.getBoard().getACard(data.index);
          const text = `${data.player.user.name} has voted for ${card.word}`;

          match.vote(data);
          this.chatIO
            .connection()
            .sendMessage(room, undefined, text, undefined);
          this.gameIO
            .to(matchId)
            .emit("game state change", match.getGameState());
        }
      });

      socket.on("send max allowed guesses", (matchId, numOfGuesses) => {
        const match = MatchManager.getMatch(matchId);
        if (match) {
          match.giveHint(numOfGuesses);
          match.nextGameTurn();
          this.gameIO
            .to(matchId)
            .emit("game state change", match.getGameState());
        }
      });

      socket.on("lobby role change", (matchId, redTeam, blueTeam) => {
        const match = MatchManager.getMatch(matchId);

        if (match) {
          match.setRedTeam(redTeam);
          match.setBlueTeam(blueTeam);
          socket
            .to(matchId)
            .emit(
              "resolve lobby role change",
              match.getRedTeam(),
              match.getBlueTeam()
            );
        }
      });

      socket.on("game lobby onload", (matchId) => {
        const match = MatchManager.getMatch(matchId);

        if (match) {
          socket.join(matchId);
          const redTeam = match.getRedTeam();
          const blueTeam = match.getBlueTeam();
          socket.emit("resolve game lobby onload", redTeam, blueTeam);
        }
      });

      socket.on("start new game", (matchId) => {
        const match = MatchManager.getMatch(matchId);

        if (match) {
          match.resetGame();
          this.gameIO
            .to(matchId)
            .emit("game state change", match.getGameState());
        }
        this.gameIO.to(matchId).emit("start timer");
      });
    });
  }

  startTimerInterval(matchId) {
    setInterval(() => {
      console.log("timer started");
      const match = MatchManager.getMatch(matchId);
      console.log(match.getGameState());
      if (match) {
        match.nextGameTurn();
        this.gameIO
          .to(matchId)
          .emit("game state change", match.getGameState());
      }
      this.gameIO.to(matchId).emit("start timer");
    }, 46000);
  }

  setChatIO(chatIO) {
    this.chatIO = chatIO;
  }

  static use(io) {
    if (connection) {
      connection.setChatIO(io);
    }
  }

  static init(io) {
    if (!connection) {
      connection = new GameIO();
      connection.connect(io);
    }
  }

  // use this to get a reference to the io pointing to the "/game" namespace. To be used by the game engine/managers.
  static getConnection() {
    if (!connection) {
      throw new Error("No active connection");
    }
    return connection;
  }
}

module.exports = {
  connect: GameIO.init,
  connection: GameIO.getConnection,
  use: GameIO.use,
};
