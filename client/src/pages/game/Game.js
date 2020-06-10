import React, { useState, useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import { AppContext } from "../../App";
import { useGameState } from "../../socket_io/GameIO";
import { TEAM_ROLE } from "../game_lobby/team_select/TeamPresets";
import GamePrompt from "./GamePrompt";
import GameBoard from "./GameBoard";
import Chat from "../chat/Chat";
import "./Game.css";

function Game(props) {
  const { gameIO } = useContext(AppContext);
  const [matchId] = useState(
    props.location.state ? props.location.state.matchId : ""
  );
  const gameState = useGameState(
    gameIO.state.io,
    props.location.state.gameState
  );
  // TODO: get player data from resolve game start event after roles are assigned
  const [player] = useState({
    user: props.location.state ? props.location.state.user : null,
    team: "Blue",
    role: "Field Agent",
  });

  useEffect(() => {
    // set game data from game lobby data
    if (!matchId || !player) {
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
          <Chat matchId={matchId} player={player} />
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
              <GamePrompt gameState={gameState} />
            </Grid>
            <Grid item>
              <GameBoard
                gameState={gameState}
                player={player}
                matchId={matchId}
              />
            </Grid>
            <Grid item>
              {player.role === TEAM_ROLE.FIELD_AGENT ? (
                <Button variant="contained" color="secondary" onClick={endTurn}>
                  End Turn
                </Button>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Game;
