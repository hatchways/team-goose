import React, { useState, useEffect, useContext } from "react";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import TimerIcon from "@material-ui/icons/Timer";
import { AppContext } from "../../App";
import { TEAM_ROLE } from "../game_lobby/team_select/TeamPresets";

function GamePrompt({ gameState, player }) {
  const [timer, setTimer] = useState(null);
  const [countDown, setCountDown] = useState(null);
  
  useEffect(() => {
    setCountDown(Math.floor((gameState.timeEnd - Date.now()) / 1000));
  }, [gameState.timeEnd]);

  useEffect(() => {
    clearTimeout(timer);
    if (countDown > 0) {
      setTimer(setTimeout(() => setCountDown(countDown - 1), 1000));
    }
  },[countDown]);


  return (
    <Container>
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <TimerIcon fontSize="large" />
            </Grid>
            <Grid item>
              <Typography variant="h6">{gameState.winner ? 0 : countDown}s left</Typography>
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
