const NAMESPACE = "/game";
const MatchManager = require("../manager/MatchManager");

let connection = null;
let countdown = 30;

class GameIO {
  constructor() {
    this.gameIO = null;
  }

  connect(io) {
    this.gameIO = io.of(NAMESPACE);

    this.gameIO.on("connection", (socket) => {
      console.log(`New client connected from the game: ${socket.id}`);

      // room should be a matchId (string)
      socket.on("join game", (matchId) => {
        socket.join(matchId);
        const message = MatchManager.joinMatch(matchId);
        socket.emit("resolve join game", message);
      });

      socket.on("disconnect", () => {
        console.log(`A client disconnected from the game: ${socket.id}`);
      });

      socket.on("create game", (hostId) => {
        const matchId = MatchManager.createMatch(hostId);
        socket.join(matchId);
        console.log(matchId);
        socket.emit("resolve create game", matchId);
      });

      socket.on("game start", (matchId, teams) => {
        // handle assigning red and blue team players data
      });

      socket.on("game state onload", (matchId) => {
        socket.join(matchId);
        const match = MatchManager.getMatch(matchId);
        socket.emit("game state change", match.getGameState());
      });

      // setInterval(() => {
      //   countdown--;
      //   this.gameIO.to(matchId).emit("timer", { countdown: countdown });
      // }, 1000);

      socket.on("end turn", (matchId) => {
        const match = MatchManager.getMatch(matchId);
        match.nextGameTurn();
        socket.emit("game state change", match.getGameState());
        // countdown = 30;
      });

      socket.on("card select", (matchId, data) => {
        const match = MatchManager.getMatch(matchId);
        match.vote(data);
        this.gameIO.to(matchId).emit("game state change", match.getGameState());
      });
    });
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
};
