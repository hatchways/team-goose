import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import GameBoard from "./GameBoard";
import Chat from "../chat/Chat";
import "./Game.css";

function Game() {
  return (
    <Container>
      <Grid container justify="space-evenly" alignItems="center">
        <Grid item xs>
          <Chat />
        </Grid>
        <Grid item xs={8}>
          <GameBoard />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Game;
