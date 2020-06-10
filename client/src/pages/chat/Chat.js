import React, { useState, useEffect, useContext } from "react";
import { animateScroll } from "react-scroll";
import { Box } from "@material-ui/core";

import { AppContext } from "../../App";
import ChatIO, { useRecievedMessage } from "../../socket_io/ChatIO";
import Dialog from "./Dialog";
import { FieldAgentDialogInput } from "./DialogInput";
import { MESSAGE_TYPE } from "./DialogType";
import "./Chat.css";

const CHAT_LOG_ELEMENT_ID = "chat-log";

function Chat({ matchId, player }) {
  const { chatIO } = useContext(AppContext);
  const [room] = useState(`${matchId}-${player.team}`);
  const [inputText, setInputText] = useState("");
  const [log, setLog] = useState([]);
  const recentMessage = useRecievedMessage(chatIO.state.io);

  useEffect(() => {
    chatIO.state.io.emit("join room", room);
  }, [chatIO.state.io, matchId, room]);

  useEffect(() => {
    const action = {
      type: ChatIO.ACTION_TYPE.CONNECT,
      payload: {
        room: room,
      },
    };
    chatIO.dispatch(action);

    return () => {
      action.type = ChatIO.ACTION_TYPE.DISCONNECT;
      chatIO.dispatch(action);
    };
  }, [chatIO, room]);

  useEffect(() => {
    if (recentMessage) {
      const newLog = [...log, recentMessage];
      setLog(newLog);
    }
    // eslint-disable-next-line
  }, [recentMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [log]);

  const onInputTextChange = (event) => {
    const value = event.target.value;
    setInputText(value);
  };

  const sendMessage = (event, message) => {
    event.preventDefault();
    const action = {
      type: ChatIO.ACTION_TYPE.SEND_MESSAGE,
      payload: { ...message, room, type: MESSAGE_TYPE.PLAYER },
    };
    chatIO.dispatch(action);
    setInputText("");
  };

  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: CHAT_LOG_ELEMENT_ID,
    });
  };

  const generateChatLog = () => {
    return log.map((message, index) => {
      return (
        <Dialog
          key={index}
          from={message.from}
          text={message.text}
          type={message.type}
          player={player}
        />
      );
    });
  };

  return (
    <div id="chat">
      <Box component="div" id={`${CHAT_LOG_ELEMENT_ID}`}>
        {log.length > 0 ? generateChatLog() : null}
      </Box>
      <FieldAgentDialogInput
        onChange={onInputTextChange}
        onSubmit={sendMessage}
        value={inputText}
      />
    </div>
  );
}

export default Chat;
