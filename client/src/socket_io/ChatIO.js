import { useState, useEffect } from "react";
import socketIO from "socket.io-client";

const NAMESPACE = "/chat";

const ACTION_TYPE = {
  CONNECT: "CONNECT",
  DISCONNECT: "DISCONNECT",
  SEND_MESSAGE: "SEND_MESSAGE",
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
      state.io.on("connect", () => {
        state.io.emit("join room", action.payload.room);
      });
      return state;
    case ACTION_TYPE.DISCONNECT:
      state.io.disconnect();
      return state;
    case ACTION_TYPE.SEND_MESSAGE:
      if (state.io.connected) {
        state.io.emit("send message", action.payload);
      }
      return state;
    default:
      return state;
  }
};

export function useRecievedMessage(chatIO) {
  const EVENT = "recieved message";
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (chatIO) {
      function handleNewMessage(message) {
        setMessage(message);
      }

      chatIO.on(EVENT, handleNewMessage);
      return () => {
        chatIO.off(EVENT, handleNewMessage);
      };
    }
  });

  return message;
}

export default { ACTION_TYPE, initialState, reducer };
