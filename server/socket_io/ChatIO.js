const NAMESPACE = "/chat";

let connection = null;

class ChatIO {
  constructor() {
    this.chatIO = null;
  }

  connect(io) {
    this.chatIO = io.of(NAMESPACE);

    this.chatIO.on("connection", (socket) => {
      console.log(`New client connected to chat: ${socket.id}`);

      socket.on("join", (room) => {
        socket.join(room);
        // current list of socket ids in this room
        this.chatIO.in(room).clients((error, clients) => {
          if (error) throw error;
          console.log(clients);
        });
      });

      socket.on("send message", (message) => {
        this.sendMessage(message.room, message.from, message.text);
      });

      socket.on("disconnect", () => {
        console.log(`A client disconnected from chat: ${socket.id}`);
      });
    });
  }

  sendMessage(room, from = "", text = "") {
    const message = { room, from, text };
    this.chatIO.to(message.room).emit("recieved message", message);
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
