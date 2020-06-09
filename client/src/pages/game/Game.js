import React, { useState, useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import { AppContext } from "../../App";
import GamePrompt from "./GamePrompt";
import GameBoard from "./GameBoard";
import Chat from "../chat/Chat";
import "./Game.css";

function Game(props) {
  const { gameIO } = useContext(AppContext);
  const [matchId, setMatchId] = useState(
    props.location.state ? props.location.state.matchId : ""
  );
  // TODO: get player data from resolve game start event after roles are assigned
  const [player, setPlayer] = useState({
    user: props.location.state ? props.location.state.user : null,
    team: "Red",
    role: "Spymaster",
  });

  useEffect(() => {
    // set game data from game lobby data
    if (matchId && player) {
      setMatchId(matchId);
      setPlayer(player);
    } else {
      props.history.push({ pathname: "/" });
    }
    // eslint-disable-next-line
  }, []);

  const endTurn = () => {
    gameIO.state.io.emit("end turn");
    console.log("end turn");
  };

  return (
    <Container>
      <Grid container justify="space-evenly">
        <Grid item xs>
          <Chat />
        </Grid>
        <Grid item xs={9} className="game-panel">
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={4}
          >
            <Grid item className="game-prompt">
              <GamePrompt gameState={props.location.state.gameState} />
            </Grid>
            <Grid item>
              <GameBoard
                gameState={props.location.state.gameState}
                player={player}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" onClick={endTurn}>
                End Turn
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Game;
