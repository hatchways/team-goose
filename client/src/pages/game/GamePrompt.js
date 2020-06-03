import React, { useContext } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import TimerIcon from "@material-ui/icons/Timer";

import { AppContext } from "../../App";
import { useGameState } from "../../socket_io/GameIO";

function GamePrompt() {
  const { gameIO } = useContext(AppContext);
  const gameState = useGameState(gameIO);

  return (
    <Container>
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <TimerIcon fontSize="large" />
            </Grid>
            <Grid item>
              <Typography variant="h5">20s left</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h5">It's Red Spymaster's turn!</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default GamePrompt;
