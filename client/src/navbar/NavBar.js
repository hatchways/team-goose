import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import GameScore from "../pages/game/GameScore";
import "./NavBar.css";

function NavBar() {
  const title = "CLUEWORDS";

  return (
    <div id="navbar" className="MuiPaper-elevation4">
      <Grid container justify="space-around" alignItems="center">
        <Grid item>
          <Typography variant="h4">{title}</Typography>
        </Grid>
        <Grid item>
          <GameScore />
        </Grid>
        <Grid item>
          <Grid container justify="center" alignItems="center" spacing={7}>
            <Grid item>
              <Button variant="contained">New Game</Button>
            </Grid>
            <Grid item>
              <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item>
                  <Avatar>TG</Avatar>
                </Grid>
                <Grid item>
                  <Typography variant="body1">My Profile</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default NavBar;
