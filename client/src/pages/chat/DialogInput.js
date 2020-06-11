import React, { useState, useContext, useEffect } from "react";
import { Button, Grid, Input, TextField } from "@material-ui/core";

import { AppContext } from "../../App";
import { useUser } from "../../contexts/user";
import { useGameState } from "../../socket_io/GameIO";

export function FieldAgentDialogInput({ onChange, onSubmit, value }) {
  const { user } = useUser();

  const onSubmitWrapper = (event) => {
    const message = { from: user, text: value };
    onSubmit(event, message);
  };

  return (
    <form onSubmit={onSubmitWrapper}>
      <Grid
        container
        alignItems="center"
        spacing={1}
        className="chat-input-container"
      >
        <Grid item xs>
          <TextField
            type="text"
            value={value}
            placeholder="Type a message"
            onChange={(event) => {
              onChange(event);
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            type="submit"
            variant="text"
            disabled={value.length <= 0}
            disableRipple
            disableFocusRipple
            disableElevation
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

const MIN_ALLOWED_GUESSES = 1;
const MAX_ALLOWED_GUESSES = 25;

export function SpymasterDialogInput({
  onChange,
  onSubmit,
  value,
  matchId,
  player,
}) {
  const { gameIO } = useContext(AppContext);
  const [numOfGuesses, setNumOfGuesses] = useState(MIN_ALLOWED_GUESSES);
  const gameState = useGameState(gameIO.state.io, matchId);
  const [isSpymasterTurn, setIsSpymasterTurn] = useState(false);

  useEffect(() => {
    console.log(gameState);
    if (gameState) {
      const gameTurn = gameState.gameTurn;
      setIsSpymasterTurn(
        gameTurn.team === player.team && gameTurn.role === player.role
      );
    }
  }, [gameState, player.role, player.team]);

  const onChangeNumOfClues = (event) => {
    const value = event.target.value;
    if (value >= MIN_ALLOWED_GUESSES && value <= MAX_ALLOWED_GUESSES) {
      setNumOfGuesses(value);
    }
  };

  const onSubmitWrapper = (event) => {
    const text = `${value} x${numOfGuesses}`;
    const message = { from: player.user, text };
    onSubmit(event, message);
    gameIO.state.io.emit("send max allowed guesses", matchId, numOfGuesses);
  };

  return (
    <form onSubmit={onSubmitWrapper}>
      <Grid
        container
        alignItems="center"
        spacing={1}
        className="chat-input-container"
      >
        <Grid item xs>
          <Grid container justify="center" spacing={1}>
            <Grid item xs={8}>
              <TextField
                type="text"
                value={value}
                placeholder="Type a clue"
                onChange={(event) => {
                  onChange(event);
                }}
                fullWidth
                autoFocus
                required
                disabled={!isSpymasterTurn}
              />
            </Grid>
            <Grid item xs>
              <Input
                type="number"
                defaultValue={numOfGuesses}
                onChange={onChangeNumOfClues}
                inputProps={{
                  min: MIN_ALLOWED_GUESSES,
                  max: MAX_ALLOWED_GUESSES,
                }}
                required
                disabled={!isSpymasterTurn}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Button
            type="submit"
            variant="text"
            disabled={value.length <= 0 || !isSpymasterTurn}
            disableRipple
            disableFocusRipple
            disableElevation
          >
            Done
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
