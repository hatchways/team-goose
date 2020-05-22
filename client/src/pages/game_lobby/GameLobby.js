import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Header from "../common/Header";
import TeamSelect from "./TeamSelect";
import "../common/common.css";
import "./GameLobby.css";

function GameLobby() {
  const currentUser = { sessionID: 1, firstName: "Tony" }; // dummy data of current user. sessionID will be generated from web socket in backend
  const [gameID] = useState("ABCD"); // dummy game ID
  const [canStartGame, setCanStartGame] = useState(false);

  const isTeamReady = (team) => {
    const SPYERMASTER_INDEX = 0;
    const FIELD_AGENT_INDEX = 1;
    const spymaser = team[SPYERMASTER_INDEX];
    const fieldAgents = team.slice(FIELD_AGENT_INDEX);

    return spymaser.player && fieldAgents.some((agent) => agent.player);
  };

  const copyGameIDToClipboard = () => {
    // source: https://stackoverflow.com/questions/33855641/copy-output-of-a-javascript-variable-to-the-clipboard
    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = gameID;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  };

  const onTeamSelect = (redTeam, blueTeam) => {
    const isRedTeamReady = isTeamReady(redTeam);
    const isBlueTeamReady = isTeamReady(blueTeam);

    setCanStartGame(isRedTeamReady && isBlueTeamReady);
  };

  const startGame = () => {
    if (canStartGame) {
      // send list of players of each team to server and transition to game board
      console.log("Game is starting...");
    }
  };

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
              <TeamSelect currentUser={currentUser} onChange={onTeamSelect} />
            </Grid>
            <Grid item>
              <Button
                onClick={() => startGame()}
                disabled={!canStartGame}
                variant="contained"
                color="primary"
              >
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
                  <Button
                    onClick={() => {
                      copyGameIDToClipboard();
                    }}
                    variant="outlined"
                    color="default"
                  >
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
