import socketIO from "socket.io-client";

const NAMESPACE = "/game";

const ACTION_TYPE = {
  START: "START",
  SHUTDOWN: "SHUTDOWN",
};

const initialState = {
  io: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.START:
      if (!state.io) {
        state.io = socketIO(NAMESPACE);
      }
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
