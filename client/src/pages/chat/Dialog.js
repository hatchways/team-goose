import React, { useRef } from "react";
import { Box, Grid, Typography } from "@material-ui/core";

import { useDialogType } from "./DialogType";
import "../common/common.css";

function Dialog({ from, text, type, player }) {
  const isSender = useRef(from ? from.id === player.user.id : false);
  const { showFrom, style, direction, spacing, justify } = useDialogType(
    type,
    player,
    isSender
  );

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
