const NAMESPACE = "/game";

let connection = null;
let countdown = 30;

const MatchManager = require("../manager/MatchManager");
const Team = require("../engine/Team");

class GameIO {
  constructor() {
    this.gameIO = null;
  }

  connect(io) {
    this.gameIO = io.of(NAMESPACE);

    this.gameIO.on("connection", (socket) => {
      console.log(`New client connected from the game: ${socket.id}`);

      // invoked when user join blue team
      socket.on("join blue team", ({ index, player, matchId }) => {
        const game = MatchManager.getMatch(matchId);
        console.log(`player ${player.name} joined blue team`);
        game.addPlayerToBlueTeam(player, index);
        // socket.emit("update blue team", game.getBlueTeam());
        socket.broadcast.emit("update blue team", game.getBlueTeam());
      });

      // invoked when user join red team
      socket.on("join red team", ({ index, player, matchId }) => {
        const game = MatchManager.getMatch(matchId);
        console.log(`player ${player.name} joined red team`);
        game.addPlayerToRedTeam(player, index);
        // socket.emit("update red team", game.getRedTeam());
        socket.broadcast.emit("update red team", game.getRedTeam());
      });

      // invoked when user leave blue team
      socket.on("leave blue team", ({ index, matchId }) => {
        const game = MatchManager.getMatch(matchId);
        console.log(`player ${index} left blue team`);
        game.removePlayerFromBlueTeam(index);
        // socket.emit("update blue team", game.getBlueTeam());
        socket.broadcast.emit("update blue team", game.getBlueTeam());
      });

      // invoked when user leave red team
      socket.on("leave red team", ({ index, matchId }) => {
        const game = MatchManager.getMatch(matchId);
        console.log(`player ${index} left red team`);
        game.removePlayerFromRedTeam(index);
        // socket.emit("update red team", game.getRedTeam());
        socket.broadcast.emit("update red team", game.getRedTeam());
      });

      socket.on("get teams", (matchId) => {
        const game = MatchManager.getMatch(matchId);
        const blueTeam = game.getBlueTeam();
        const redTeam = game.getRedTeam();
        socket.emit("update teams", { blueTeam: blueTeam, redTeam: redTeam});
      });

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
        console.log(`Created match ${matchId} by host ${hostId}`);
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

      socket.on("send max allowed guesses", (matchId, numOfGuesses) => {
        const match = MatchManager.getMatch(matchId);
        // do something with the number numOfGuesses on this line
        // end current team spymaster's turn
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
