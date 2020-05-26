import React from "react";
import Grid from "@material-ui/core/Grid";

import GameBoard from "./GameBoard";
import Chat from "../chat/Chat";

function Game() {
  return (
    <Grid container justify="space-evenly" alignItems="center">
      <Grid item>
        <Chat />
      </Grid>
      <Grid item>
        <GameBoard />
      </Grid>
    </Grid>
  );
}

export default Game;
