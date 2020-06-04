const NAMESPACE = "/game";

let connection = null;

class GameIO {
  constructor() {
    this.gameIO = null;
  }

  connect(io) {
    this.gameIO = io.of(NAMESPACE);

    this.gameIO.on("connection", (socket) => {
      console.log(`New client connected from the game: ${socket.id}`);

      // room should be a matchId (string)
      socket.on("join room", (room) => {
        socket.join(room);
      });

      socket.on("disconnect", () => {
        console.log(`A client disconnected from the game: ${socket.id}`);
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
