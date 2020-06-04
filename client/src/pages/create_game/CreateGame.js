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

function CreateGame() {
  const [matchId, setMatchId] = useState("");
  const { gameIO } = useContext(AppContext);

  const handleNewGame = () => {
    fetch("/api/match", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hostId: "host_01" }),
    }).then((res) => {
      console.log(res.json());
    });
  };

  const onChange = (evt) => {
    setMatchId(evt.target.value);
  };

  const handleJoinGame = () => {
    fetch(`/api/match/${matchId}/join-match`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res.json());
    });
  };

  return (
    <Container>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item className="header">
          <Header title="Welcome" />
        </Grid>
        <Grid item>
          <Grid container justify="center" alignItems="center" spacing={10}>
            <Grid item xs={7}>
              <Grid container direction="column">
                <Grid item>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography variant="h6" gutterBottom>
                        Join a Game:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Grid container alignItems="center" spacing={1}>
                        <Grid item xs={8}>
                          <Input
                            onChange={(event) => {
                              onChange(event);
                            }}
                            value={matchId}
                            placeholder="Enter Match ID"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Button
                            onClick={handleJoinGame}
                            disabled={matchId.length <= 0}
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
            <Grid item xs={5}>
              <Grid container direction="column">
                <Grid item>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography variant="h6" gutterBottom>
                        New Game:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" onClick={handleNewGame}>
                        Create
                      </Button>
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
