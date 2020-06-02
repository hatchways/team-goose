import React, { useState, useEffect, useRef } from "react";
import { Box, Grid, Typography } from "@material-ui/core";

import { useUser } from "../../contexts/user";
import { MESSAGE_TYPE } from "./Chat";
import "../common/common.css";

const DIRECTION = {
  LEFT: "row",
  RIGHT: "row-reverse",
};

const JUSTIFY = {
  FLEX_START: "flex-start",
  CENTER: "center",
};

const SENDER_DIALOG_STYLE = {
  TEXT: "message-out",
  BACKGROUND: "bg-red", // TODO: will need to assign background color depending on player's team color
};

const SYSTEM_DIALOG_STYLE = {
  INFO: "system-message",
  ACTION: "system-message action",
};

function Dialog({ from, text, type }) {
  const { user } = useUser();
  const isSender = useRef(from ? from.id === user.id : false);
  const [showFrom, setShowFrom] = useState(true);
  const [style, setStyle] = useState("");
  const [direction, setDirection] = useState(DIRECTION.LEFT);
  const [spacing, setSpacing] = useState(3);
  const [justify, setJustify] = useState(JUSTIFY.FLEX_START);

  useEffect(() => {
    if (type === MESSAGE_TYPE.PLAYER) {
      if (isSender.current) {
        setDirection(DIRECTION.RIGHT);
        setStyle(
          `${SENDER_DIALOG_STYLE.TEXT} ${SENDER_DIALOG_STYLE.BACKGROUND}`
        );
        setShowFrom(false);
      }
    } else if (type === MESSAGE_TYPE.SYSTEM_INFO) {
      setStyle(SYSTEM_DIALOG_STYLE.INFO);
      setSpacing(0);
      setShowFrom(false);
    } else if (type === MESSAGE_TYPE.SYSTEM_ACTION) {
      setStyle(SYSTEM_DIALOG_STYLE.ACTION);
      setSpacing(0);
      setJustify(JUSTIFY.CENTER);
      setShowFrom(false);
    }
  }, [type]);

  return (
    <Grid
      container
      direction={`${direction}`}
      justify={justify}
      spacing={spacing}
    >
      <Grid item className="message">
        {showFrom ? (
          <Box component="div" className="sender">
            <Typography variant="body2">{`${from.name}:`}</Typography>
          </Box>
        ) : null}
        <Box component="div" className={`dialog ${style}`}>
          <Typography variant="body1">{text}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Dialog;
