import React, { useState, useEffect, useContext } from "react";
import { animateScroll } from "react-scroll";
import { Button, Grid, TextField, Box } from "@material-ui/core";

import { AppContext } from "../../App";
import ChatIO, { useRecievedMessage } from "../../socket_io/ChatIO";
import Dialog from "./Dialog";
import "./Chat.css";

const CHAT_LOG_ELEMENT_ID = "chat-log";
const ROOM = "matchId_redTeam";

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
    // listen to messages being emitted from backend's socket
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

  const sendMessage = (event, inputText) => {
    event.preventDefault();
    const message = { from: "Tony", text: inputText, room: ROOM };
    const action = {
      type: ChatIO.ACTION_TYPE.SEND_MESSAGE,
      payload: message,
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
      return <Dialog key={index} from={message.from} text={message.text} />;
    });
  };

  return (
    <div id="chat">
      <Box component="div" id={`${CHAT_LOG_ELEMENT_ID}`}>
        {log.length > 0 ? generateChatLog() : null}
      </Box>
      <form
        onSubmit={(event) => {
          sendMessage(event, inputText);
        }}
      >
        <Grid
          container
          alignItems="center"
          spacing={1}
          className="chat-input-container"
        >
          <Grid item xs>
            <TextField
              type="text"
              value={inputText}
              placeholder="Type a message"
              onChange={(event) => {
                onInputTextChange(event);
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              type="submit"
              variant="text"
              disabled={inputText.length <= 0}
              disableRipple
              disableFocusRipple
              disableElevation
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default Chat;
