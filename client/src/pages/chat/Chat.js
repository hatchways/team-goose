import React, { useState, useEffect, useContext } from "react";
import { animateScroll } from "react-scroll";
import { Box } from "@material-ui/core";

import { AppContext } from "../../App";
import ChatIO, { useRecievedMessage } from "../../socket_io/ChatIO";
import Dialog from "./Dialog";
import { FieldAgentDialogInput } from "./DialogInput";
import "./Chat.css";

export const MESSAGE_TYPE = {
  PLAYER: "player",
  SYSTEM_INFO: "info",
  SYSTEM_ACTION: "action",
};
const CHAT_LOG_ELEMENT_ID = "chat-log";
const ROOM = "matchId_redTeam"; // TODO: create a chatUtils.js for generating a room name, given a matchId and team identifier

function Chat() {
  const { chatIO } = useContext(AppContext);
  const [inputText, setInputText] = useState("");
  const [log, setLog] = useState([]);
  const recentMessage = useRecievedMessage(chatIO.state.io);

  useEffect(() => {
    const action = {
      type: ChatIO.ACTION_TYPE.CONNECT,
      payload: {
        room: ROOM,
      },
    };
    chatIO.dispatch(action);

    return () => {
      action.type = ChatIO.ACTION_TYPE.DISCONNECT;
      chatIO.dispatch(action);
    };
  }, [chatIO]);

  useEffect(() => {
    if (recentMessage) {
      const newLog = [...log, recentMessage];
      setLog(newLog);
    }
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
      payload: { ...message, room: ROOM, type: MESSAGE_TYPE.PLAYER },
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
