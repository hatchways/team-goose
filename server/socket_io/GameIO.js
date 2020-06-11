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

      // room should be a matchId (string)
      socket.on("join room", (matchId) => {
        console.log(socket, matchId, "joined room");
        socket.join(matchId);
      });

      // invoked when user join blue team
      socket.on("join blue team", ({ index, player, matchId }) => {
        const game = MatchManager.getMatch(matchId);
        console.log(`player ${player.name} joined blue team`);
        game.addPlayerToBlueTeam(player, index);
        // socket.emit("update blue team", game.getBlueTeam());
        socket.broadcast.to(matchId).emit("update blue team", game.getBlueTeam());
      });

      // invoked when user join red team
      socket.on("join red team", ({ index, player, matchId }) => {
        const game = MatchManager.getMatch(matchId);
        console.log(`player ${player.name} joined red team`);
        game.addPlayerToRedTeam(player, index);
        // socket.emit("update red team", game.getRedTeam());
        socket.broadcast.to(matchId).emit("update red team", game.getRedTeam());
      });

      // invoked when user leave blue team
      socket.on("leave blue team", ({ index, matchId }) => {
        const game = MatchManager.getMatch(matchId);
        console.log(`player ${index} left blue team`);
        game.removePlayerFromBlueTeam(index);
        // socket.emit("update blue team", game.getBlueTeam());
        socket.broadcast.to(matchId).emit("update blue team", game.getBlueTeam());
      });

      // invoked when user leave red team
      socket.on("leave red team", ({ index, matchId }) => {
        const game = MatchManager.getMatch(matchId);
        console.log(`player ${index} left red team`);
        game.removePlayerFromRedTeam(index);
        // socket.emit("update red team", game.getRedTeam());
        socket.broadcast.to(matchId).emit("update red team", game.getRedTeam());
      });

      socket.on("disconnect", () => {
        console.log(`A client disconnected from the game: ${socket.id}`);
      });

      socket.on("create game", (hostId) => {
        const matchId = MatchManager.createMatch(hostId);
        console.log(matchId);
        socket.emit("resolve create game", matchId);
      });

      socket.on("game start", (matchId) => {
        const match = MatchManager.getMatch(matchId);
        socket.emit("start turn", match.getGameState());
      });

      // setInterval(() => {
      //   countdown--;
      //   this.gameIO.to(matchId).emit("timer", { countdown: countdown });
      // }, 1000);

      socket.on("end turn", (matchId) => {
        const match = MatchManager.getMatch(matchId);
        match.setGameTurn();
        // match.nextGameTurn();
        this.gameIO.to(matchId).emit("game state change", match.getGameState());
        countdown = 30;
      });

      socket.on("word select", (matchId, data) => {
        const match = MatchManager.getMatch(matchId);
        match.vote(data);
        this.gameIO
          .to(matchId)
          .emit("word select", match.getBoard().getCards());
      });
    });
  }

  // game engine listens in on when game gets started ("Game Start" button gets pressed)
  registerGameStartEvent(callback) {
    socket.on("game start", callback);
  }

  // game engine listens in on team role changes in the lobby
  registerRoleChangeEvent(callback) {
    socket.on("role change", callback);
  }

  // game engine can listen in on player’s word select moves
  registerWordSelectEvent(callback) {
    socket.on("word select", callback);
  }

  //game engine can listen in on a Field Agent’s end turn
  registerEndTurnEvent(callback) {
    socket.on("end turn", callback);
  }

  // game engine sends its game state back to the client in reaction to a user's recent action (word gets selected, end their turn, etc.)
  sendGameState(gameState) {
    this.gameIO.to(message.room).emit("game state change", gameState);
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
