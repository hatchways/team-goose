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
      state.io = socketIO(NAMESPACE);
      return state;
    case ACTION_TYPE.SHUTDOWN:
      state.io.disconnect();
      return state;
    default:
      return state;
  }
};

export default { ACTION_TYPE, initialState, reducer };
