import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import "./Game.css";

function GameScore() {
  const [redScore, setRedScore] = useState(0);
  const [blueScore, setBlueScore] = useState(0);

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
    <Grid container justify="center" alignItems="flex-start" spacing={4}>
      <Grid item className="red-team-color">
        {generateScore(redScore, "Red Team")}
      </Grid>
      <Grid item>
        <Typography variant="h3">-</Typography>
      </Grid>
      <Grid item className="blue-team-color">
        {generateScore(blueScore, "Blue Team")}
      </Grid>
    </Grid>
  );
}

export default GameScore;
