import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";

import { AppContext } from "../../App";
import Header from "../common/Header";
import "./CreateGame.css";

function CreateGame(props) {
  const [matchId, setMatchId] = useState("");
  const { gameIO } = useContext(AppContext);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleNewGame = () => {
    // fetch("/api/match", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ hostId: "host_01" }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     props.history.push({
    //       pathname: "/game_lobby",
    //       state: { matchId: data.matchId },
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    gameIO.state.io.emit("create game", "hostId");
    gameIO.state.io.on("resolve create game", (matchId) => {
      props.history.push({
        pathname: "/game_lobby",
        state: { matchId: matchId },
      });
    })
    
  };

  const onChange = (evt) => {
    setMatchId(evt.target.value);
    setErrorMessage(null);
  };

  const handleJoinGame = () => {
    fetch(`/api/match/${matchId}/join-match`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          props.history.push({
            pathname: "/game_lobby",
            state: { matchId: matchId },
          });
        } else {
          setErrorMessage(data.message);
          setMatchId("");
        }
      })
      .catch((err) => {
        console.log(err);
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
                      <Grid container direction="column">
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
                        <Grid item>
                          {errorMessage ? (
                            <Typography variant="subtitle2" color="error">
                              {errorMessage}
                            </Typography>
                          ) : null}
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
