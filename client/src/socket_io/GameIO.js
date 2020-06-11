import { useState, useEffect } from "react";
import socketIO from "socket.io-client";

const NAMESPACE = "/game";

const ACTION_TYPE = {
  CONNECT: "CONNECT",
  DISCONNECT: "DISCONNECT",
};

const initialState = {
  io: socketIO(NAMESPACE),
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.CONNECT:
      // if (!state.io) {
      //   state.io = socketIO(NAMESPACE);
      // }
      // incase we refresh
      state.io.on("connect", () => {
        state.io.emit("join room", action.payload.room);
      });

      if (state.io.disconnected) {
        state.io.connect();
      } else {
        state.io.emit("join room", action.payload.room);
      }

      return state;
    case ACTION_TYPE.DISCONNECT:
      if (state.io.connected) {
        state.io.disconnect();
      }
      return state;
    default:
      return state;
  }
};

export function useGameState(gameIO) {
  const EVENT = "game state change";
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    function handler(gameState) {
      setGameState(gameState);
    }

    if (gameIO.connected) {
      gameIO.on(EVENT, handler);
    }

    return () => {
      gameIO.off(EVENT, handler);
    };
  }, [gameIO]);

  return gameState;
}

export default { ACTION_TYPE, initialState, reducer };
