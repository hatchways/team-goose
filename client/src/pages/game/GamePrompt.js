import React from "react";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import TimerIcon from "@material-ui/icons/Timer";

function GamePrompt({ gameState }) {
  return (
    <Container>
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <TimerIcon fontSize="large" />
            </Grid>
            <Grid item>
              <Typography variant="h5">30s left</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h5">
            It's
            <Box
              component="span"
              className={gameState.gameTurn.team.toLowerCase()}
            >
              {` ${gameState.gameTurn.team} ${gameState.gameTurn.role}`}
            </Box>
            's turn!
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default GamePrompt;
