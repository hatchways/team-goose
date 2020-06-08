import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import GameBoard from "./GameBoard";
import Chat from "../chat/Chat";

import GameIO from "../../socket_io/GameIO";
import "./Game.css";

function Game() {

  useEffect(() => {
    const action = {
      type: GameIO.ACTION_TYPE.CONNECT,
    };
    GameIO.dispatch(action);

    return () => {
      action.type = GameIO.ACTION_TYPE.DISCONNECT;
      GameIO.dispatch(action);
    };
  }, [chatIO]);
  return (
    <Container>
      <Grid container justify="space-evenly" alignItems="center">
        <Grid item xs>
          <Chat />
        </Grid>
        <Grid item xs={8}>
          <GameBoard />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Game;
