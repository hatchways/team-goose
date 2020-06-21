import React, { useState, useEffect, useContext } from "react";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import TimerIcon from "@material-ui/icons/Timer";
import { AppContext } from "../../App";
import { TEAM_ROLE } from "../game_lobby/team_select/TeamPresets";

function GamePrompt({ gameState, player }) {
  const { gameIO } = useContext(AppContext);

  const [timer, setTimer] = useState(45);
  const [countDown, setCountDown] = useState(null);
  
  useEffect(() => {
    gameIO.state.io.on("start timer", () => {
      clearTimeout(countDown);
      setTimer(45)
    });
  }, []);

  useEffect(() => {
    if (timer > 0) {
      setCountDown(setTimeout(() => setTimer(timer - 1), 1000));
    }
  });


  return (
    <Container>
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <TimerIcon fontSize="large" />
            </Grid>
            <Grid item>
              <Typography variant="h6">{timer}s left</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
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
        <Grid item xs>
          <Grid container justify="flex-end" alignItems="center">
            <Grid item>
              {player.role === TEAM_ROLE.FIELD_AGENT &&
              player.team === gameState.gameTurn.team &&
              gameState.gameTurn.role !== TEAM_ROLE.SPYMASTER ? (
                <Typography variant="h6">{`Guesses: ${gameState.numGuessLeft}`}</Typography>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default GamePrompt;
