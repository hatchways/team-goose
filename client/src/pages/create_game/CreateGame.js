import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";

import { AppContext } from "../../App";
import GameIO from "../../socket_io/GameIO";
import Header from "../common/Header";
import "./CreateGame.css";

function CreateGame(props) {
  const [matchID, setMatchID] = useState("");
  const { gameIO } = useContext(AppContext);

  const onChange = (event) => {
    const currentInput = event.target.value;
    setMatchID(currentInput);
  };

  const joinGame = () => {
    const action = {
      type: GameIO.ACTION_TYPE.START,
    };
    if (matchID.length > 0) {
      // check if matchID is valid
      gameIO.dispatch(action); // then turn on socket for the game
      // transition to Game Lobby with a session ID from opened socket
    }
    props.history.push("/game_lobby");
  };

  return (
    <Container>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item className="header">
          <Header title="Welcome" />
        </Grid>
        <Grid item>
          <Grid container justify="center" alignItems="center">
            <Grid item className="panel">
              <Grid container direction="column">
                <Grid item>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography variant="h6" gutterBottom>
                        Join a Game:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Grid container alignItems="center">
                        <Grid item className="grid-input">
                          <Input
                            onChange={(event) => {
                              onChange(event);
                            }}
                            value={matchID}
                            placeholder="Enter Match ID"
                          />
                        </Grid>
                        <Grid item>
                          <Button
                            onClick={() => {
                              joinGame();
                            }}
                            disabled={matchID.length <= 0}
                            variant="contained"
                            color="primary"
                          >
                            Join
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className="panel">
              <Grid container direction="column">
                <Grid item>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography variant="h6" gutterBottom>
                        New Game:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button variant="contained">Create</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CreateGame;
