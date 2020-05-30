import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@material-ui/core";

import "../common/common.css";

const DIRECTIONS = {
  LEFT: "row",
  RIGHT: "row-reverse",
};

const SENDER_COLOR = {
  text: "message-out",
  background: "bg-red", // TODO: will need to assign background color depending on player's team color
};

function Dialog({ from, text }) {
  const [isSender] = useState(false);
  const [styles, setStyles] = useState("");
  const [direction, setDirection] = useState(DIRECTIONS.LEFT);

  useEffect(() => {
    let newStyles = "";
    let newDirection = "";

    if (isSender) {
      newStyles = `${SENDER_COLOR.text} ${SENDER_COLOR.background}`;
      newDirection = DIRECTIONS.RIGHT;
    } else {
      newDirection = DIRECTIONS.LEFT;
    }

    setDirection(newDirection);
    setStyles(newStyles);
  }, [isSender]);

  return (
    <Grid container direction={`${direction}`} justify="flex-start" spacing={3}>
      <Grid item className="message">
        <Box component="div" className="sender">
          <Typography variant="body2">{`${from}:`}</Typography>
        </Box>
        <Box component="div" className={`dialog ${styles}`}>
          <Typography variant="body1">{text}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Dialog;
