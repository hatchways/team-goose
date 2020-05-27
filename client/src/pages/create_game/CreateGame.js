import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";

import Header from "../common/Header";
import "./CreateGame.css";

function CreateGame() {

  const [matchId, setMatchId] = useState("");

  const handleNewGame = () => {
    fetch("/match", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hostId: "host_01" }),
    }).then(res => {
      console.log(res.json())
    })
  }

  const handleInput = (evt) => {
    setMatchId(evt.target.value);
  }
  const handleJoinGame = () => {
    fetch(`/match/${matchId}/join-match`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }}).then(res => {
      console.log(res.json());
    })
  }
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
                          <Input placeholder="Enter Match ID" value={matchId} onChange={handleInput}/>
                        </Grid>
                        <Grid item>
                          <Button variant="contained" color="primary" onClick={handleJoinGame}>
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
                      <Button variant="contained" onClick={handleNewGame}>Create</Button>
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
