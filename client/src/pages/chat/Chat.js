import React, { useState, useEffect } from "react";
import { animateScroll } from "react-scroll";
import { Button, Grid, TextField, Box } from "@material-ui/core";

import Dialog from "./Dialog";
import "./Chat.css";

const CHAT_LOG_ELEMENT_ID = "chat-log";

function Chat() {
  const [inputText, setInputText] = useState("");
  const [log, setLog] = useState([]);

  useEffect(() => {
    // listen to messages being broadcasted from backend's socket
    // message: {from: "Bonnie", text: "Let's pick dog!"};
    // setLog([...log, message]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [log]);

  const onInputTextChange = (event) => {
    const value = event.target.value;
    setInputText(value);
  };

  const sendMessage = (event, inputText) => {
    event.preventDefault();
    const message = { from: "Tony", text: inputText };
    const newLog = [...log, message];
    setLog(newLog);
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
