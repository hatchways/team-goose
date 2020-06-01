const NAMESPACE = "/chat";

const MESSAGE_TYPE = {
  PLAYER: "player",
  SYSTEM_INFO: "info",
  SYSTEM_ACTION: "action",
};

let connection = null;

class ChatIO {
  constructor() {
    this.chatIO = null;
  }

  connect(io) {
    this.chatIO = io.of(NAMESPACE);

    this.chatIO.on("connection", (socket) => {
      console.log(`New client connected to chat: ${socket.id}`);

      socket.on("join room", (room) => {
        socket.join(room);
        this.printClients(room);
      });

      socket.on("send message", (message) => {
        this.sendMessage(
          message.room,
          message.from,
          message.text,
          message.type
        );
      });

      socket.on("disconnect", () => {
        console.log(`A client disconnected from chat: ${socket.id}`);
      });
    });
  }

  printClients(room) {
    // current list of socket ids in this room
    this.chatIO.in(room).clients((error, clients) => {
      if (error) throw error;
      console.log(clients);
    });
  }

  sendMessage(room, from = "", text = "", type = MESSAGE_TYPE.SYSTEM_INFO) {
    const message = { room, from, text, type };
    if (room) {
      this.chatIO.to(message.room).emit("recieved message", message);
    }
  }

  static init(io) {
    if (!connection) {
      connection = new ChatIO();
      connection.connect(io);
    }
  }

  static getConnection() {
    if (!connection) {
      throw new Error("No active connection");
    }
    return connection;
  }
}

module.exports = {
  connect: ChatIO.init,
  connection: ChatIO.getConnection,
};
