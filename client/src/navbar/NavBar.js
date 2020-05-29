import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { useAuth } from "../contexts/auth";
import ProfileMenu from "./ProfileMenu";
import GameScore from "../pages/game/GameScore";
import NavTitle from "./NavTitle";
import "./NavBar.css";
import avatar from "../static/assets/default-avatar.png";

function NavBar() {
  const title = "CLUEWORDS";
  const { authTokens } = useAuth();

  return (
    <div id="navbar" className="MuiPaper-elevation4">
      <Grid container justify="space-around" alignItems="center">
        <Grid item>
          <NavTitle title={title} />
        </Grid>
        {authTokens ? (
          <>
            <Grid item>
              <GameScore />
            </Grid>
            <Grid item>
              <Grid container justify="center" alignItems="center" spacing={7}>
                <Grid item>
                  <Button variant="contained" color="primary" size="large">
                    New Game
                  </Button>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item>
                      <Avatar src={avatar} />
                    </Grid>
                    <Grid item>
                      <Grid container justify="center" alignItems="center">
                        <Grid item>
                          <Typography variant="body1">My Profile</Typography>
                        </Grid>
                        <Grid item>
                          <ProfileMenu />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
        ) : null}
      </Grid>
    </div>
  );
}

export default NavBar;
