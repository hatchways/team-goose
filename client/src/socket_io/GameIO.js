import socketIO from "socket.io-client";

const NAMESPACE = "/game";

const ACTION_TYPE = {
  CONNECT: "CONNECT",
  SHUTDOWN: "SHUTDOWN",
};

const initialState = {
  io: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.CONNECT:
      if (!state.io) {
        state.io = socketIO(NAMESPACE);
      }
      state.io.on("connect", () => {
        state.io.emit("join room", action.payload.room);
      });
      return state;
    case ACTION_TYPE.SHUTDOWN:
      if (state.io) {
        state.io.disconnect();
        state.io = null;
      }
      return state;
    default:
      return state;
  }
};

export default { ACTION_TYPE, initialState, reducer };
