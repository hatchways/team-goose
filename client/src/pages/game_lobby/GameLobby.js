import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Header from "../common/Header";
import TeamSelect from "./TeamSelect";
import "../common/common.css";
import "./GameLobby.css";

function GameLobby() {
  return (
    <Container>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item className="header">
          <Header title="New Game" />
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <TeamSelect />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary">
                Start Game
              </Button>
            </Grid>
            <Grid item>
              <Grid
                className="grid-content"
                container
                justify="center"
                alignItems="center"
              >
                <Grid className="label" item>
                  <Typography>Share Game ID:</Typography>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="default">
                    Copy
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default GameLobby;
