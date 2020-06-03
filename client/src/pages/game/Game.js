import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import GamePrompt from "./GamePrompt";
import GameBoard from "./GameBoard";
import Chat from "../chat/Chat";
import "./Game.css";

function Game() {
  return (
    <Container>
      <Grid container justify="space-evenly">
        <Grid item xs>
          <Chat />
        </Grid>
        <Grid item xs={9} className="game-panel">
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={4}
          >
            <Grid item className="game-prompt">
              <GamePrompt />
            </Grid>
            <Grid item>
              <GameBoard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Game;
