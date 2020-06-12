import React, { useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { AppContext } from "../App";
import { useAuth } from "../contexts/auth";
import NavMenu from "./NavMenu";
import GameScore from "../pages/game/GameScore";
import NavTitle from "./NavTitle";
import "./NavBar.css";

function NavBar() {
  const title = "CLUEWORDS";
  const { authTokens } = useAuth();
  const { match, gameIO } = useContext(AppContext);

  const handleNewGame = () => {
    gameIO.state.io.emit("start new game", match.state.match.id);
  }

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
                  {match.state.match.hasStarted ? (
                    <Button variant="contained" color="primary" size="large" onClick={handleNewGame}>
                      New Game
                    </Button>
                  ) : null}
                </Grid>
                <Grid item>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item>
                      <Avatar />
                    </Grid>
                    <Grid item>
                      <Grid container justify="center" alignItems="center">
                        <Grid item>
                          <Typography variant="body1">My Profile</Typography>
                        </Grid>
                        <Grid item>
                          <NavMenu />
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
