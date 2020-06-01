import React, { useState, useEffect, useRef } from "react";
import { Box, Grid, Typography } from "@material-ui/core";

import "../common/common.css";

const DIRECTIONS = {
  LEFT: "row",
  RIGHT: "row-reverse",
};

const SENDER_DIALOG_STYLE = {
  text: "message-out",
  background: "bg-red", // TODO: will need to assign background color depending on player's team color
};

const SYSTEM_DIALOG_STYLE = "system-message";

function Dialog({ from, text }) {
  const isSender = false;
  const [styles, setStyles] = useState("");
  const [direction, setDirection] = useState(DIRECTIONS.LEFT);
  const spacing = useRef(3);

  useEffect(() => {
    let newStyles = "";
    let newDirection = "";

    if (isSender) {
      newStyles = `${SENDER_DIALOG_STYLE.text} ${SENDER_DIALOG_STYLE.background}`;
      newDirection = DIRECTIONS.RIGHT;
    } else {
      newDirection = DIRECTIONS.LEFT;
      if (!from) {
        newStyles = SYSTEM_DIALOG_STYLE;
        spacing.current = 0;
      }
    }

    setDirection(newDirection);
    setStyles(newStyles);
  }, [isSender, from]);

  return (
    <Grid
      container
      direction={`${direction}`}
      justify="flex-start"
      spacing={spacing.current}
    >
      <Grid item className="message">
        {from ? (
          <Box component="div" className="sender">
            <Typography variant="body2">{`${from}:`}</Typography>
          </Box>
        ) : null}
        <Box component="div" className={`dialog ${styles}`}>
          <Typography variant="body1">{text}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Dialog;
