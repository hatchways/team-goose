import { useState, useEffect } from "react";
import socketIO from "socket.io-client";

const NAMESPACE = "/chat";

const ACTION_TYPE = {
  START: "START",
  SHUTDOWN: "SHUTDOWN",
  SEND_MESSAGE: "SEND_MESSAGE",
};

const initialState = {
  io: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.START:
      if (!state.io) {
        state.io = socketIO(NAMESPACE);
        state.io.on("connect", () => {
          state.io.emit("join", action.payload.room);
        });
      }
      return state;
    case ACTION_TYPE.SHUTDOWN:
      if (state.io) {
        state.io.disconnect();
        if (state.io.disconnected) {
          state.io = null;
        }
      }
      return state;
    case ACTION_TYPE.SEND_MESSAGE:
      if (state.io) {
        state.io.emit("send message", action.payload);
      }
      return state;
    default:
      return state;
  }
};

export function useRecievedMessage(chatIO) {
  const event = "recieved message";
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (chatIO) {
      function handleNewMessage(message) {
        setMessage(message);
      }

      chatIO.on(event, handleNewMessage);
      return () => {
        chatIO.off(event, handleNewMessage);
      };
    }
  });

  return message;
}

export default { ACTION_TYPE, initialState, reducer };
