import React, { useState, useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { copyToClipboard } from "../../utils/utils";
import { useUser } from "../../contexts/user";
import Header from "../common/Header";
import TeamSelect from "./team_select/TeamSelect";

import { AppContext } from "../../App";

import "../common/common.css";
import "./GameLobby.css";

const SPYMASTER_INDEX = 0;
const FIELD_AGENT_INDEX = 1;

function GameLobby(props) {
  const { user } = useUser(); // will be used as player's data (i.e. id and name)
  const [matchId, setMatchId] = useState(null);
  const [canStartGame, setCanStartGame] = useState(false);

  const { gameIO } = useContext(AppContext);
  useEffect(() => {
    const matchId = props.location.state ? props.location.state.matchId : null;
    if (matchId) {
      setMatchId(matchId);
    } else {
      props.history.push({ pathname: "/" });
    }
  }, []);

  const isTeamReady = (team) => {
    const spyMaster = team[SPYMASTER_INDEX];
    const fieldAgents = team.slice(FIELD_AGENT_INDEX);

    return spyMaster.player && fieldAgents.some((agent) => agent.player);
  };

  const onTeamSelect = (redTeam, blueTeam) => {
    const isRedTeamReady = isTeamReady(redTeam);
    const isBlueTeamReady = isTeamReady(blueTeam);

    setCanStartGame(isRedTeamReady && isBlueTeamReady);
  };

  const startGame = () => {
    if (canStartGame) {
      // send list of players of each team to server and transition to game board
      gameIO.state.io.emit("game start", matchId);
      gameIO.state.io.on("start turn", (gameState) => {
        props.history.push({
          pathname: "/game",
          state: { gameState: gameState, matchId: matchId, user: user },
        });
      });
      console.log("Game is starting...");
    }
  };

  return (
    <Container>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item className="header">
          <Header title="New Game" />
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <TeamSelect currentUser={user} onChange={onTeamSelect} />
            </Grid>
            <Grid item>
              <Button
                onClick={() => startGame()}
                disabled={!canStartGame}
                variant="contained"
                color="primary"
                size="large"
              >
                Start Game
              </Button>
            </Grid>
            <Grid item>
              <Grid container justify="center" alignItems="center">
                <Grid className="label" item>
                  <Typography>Share Match ID:</Typography>
                </Grid>
                <Grid item>
                  <Button
                    onClick={() => {
                      copyToClipboard(matchId);
                    }}
                    variant="outlined"
                    color="default"
                    size="small"
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
