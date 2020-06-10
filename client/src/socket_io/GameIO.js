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
      if (state.io.disconnected) {
        state.io.connect();
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

export function useGameState(gameIO, matchId) {
  const EVENT = "game state change";
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    if (!gameState && matchId) {
      gameIO.emit("game state onload", matchId);
    }
  }, [gameIO, gameState, matchId]);

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
  });

  return gameState;
}

export default { ACTION_TYPE, initialState, reducer };
