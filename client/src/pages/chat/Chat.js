import React, { useState } from "react";
import { Button, Grid, TextField, Box } from "@material-ui/core";

import Dialog from "./Dialog";
import "./Chat.css";

function Chat() {
  const [inputText, setInputText] = useState("");
  const [log, setLog] = useState([]);

  const onInputTextChange = (event) => {
    const value = event.target.value;
    setInputText(value);
  };

  const sendMessage = (event, inputText) => {
    event.preventDefault();
    const newLog = [...log, inputText];
    setLog(newLog);
    setInputText("");
  };

  const generateChatLog = () => {
    return log.map((message, index) => {
      return (
        <Grid item key={index}>
          <Dialog message={message} />
        </Grid>
      );
    });
  };

  return (
    <div id="chat">
      <Box component="div" className="chat-log">
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-end"
          spacing={2}
        >
          {log.length > 0 ? generateChatLog() : null}
        </Grid>
      </Box>
      <form
        onSubmit={(event) => {
          sendMessage(event, inputText);
        }}
      >
        <Grid container alignItems="center" spacing={1}>
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
