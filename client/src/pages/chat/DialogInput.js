import React from "react";
import { Button, Grid, TextField } from "@material-ui/core";

export function FieldAgentDialogInput({ onChange, onSubmit, value }) {
  const onSubmitWrapper = (event) => {
    const message = { from: "Tony", text: value }; // TODO: replace 'from' with name from user data and add user id
    onSubmit(event, message);
  };

  return (
    <form onSubmit={onSubmitWrapper}>
      <Grid
        container
        alignItems="center"
        spacing={1}
        className="chat-input-container"
      >
        <Grid item xs>
          <TextField
            type="text"
            value={value}
            placeholder="Type a message"
            onChange={(event) => {
              onChange(event);
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            type="submit"
            variant="text"
            disabled={value.length <= 0}
            disableRipple
            disableFocusRipple
            disableElevation
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
