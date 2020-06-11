import React, { useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { AppContext } from "../../App";
import { useGameState } from "../../socket_io/GameIO";

import { useMatchId } from "../../socket_io/GameIO";
import "./Game.css";

function GameScore() {
  const { gameIO } = useContext(AppContext);
  const [matchId] = useMatchId();
  const gameState = useGameState(gameIO.state.io, matchId);

  const generateScore = (score, teamName) => {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
          <Typography variant="h3">{score}</Typography>
        </Grid>
        <Grid item>
          <Typography>{teamName}</Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      {gameState ? (
        <Grid container justify="center" alignItems="flex-start" spacing={4}>
          <Grid item className="red-team-color">
            {generateScore(gameState.redPoints, "Red Team")}
          </Grid>
          <Grid item>
            <Typography variant="h3">-</Typography>
          </Grid>
          <Grid item className="blue-team-color">
            {generateScore(gameState.bluePoints, "Blue Team")}
          </Grid>
        </Grid>
      ) : null}
    </>
  );
}

export default GameScore;
