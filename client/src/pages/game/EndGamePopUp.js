import React from "react";
import { ReactComponent as Skull } from "../../img/skull.svg";
import Button from "@material-ui/core/Button";
import "./EndGamePopUp.css";

export default function EndGamePopUp(winner, bluePoints, redPoints) {
  winner = "Blue";
  bluePoints = 6;
  redPoints = 6;

  return (
    <div className="end-game-pop-up">
      <Skull id="skull" />
      <h2>Game over!</h2>
      <p className="blue">{winner} wins</p>
      <p>
        <span className="blue">{bluePoints}</span> :{" "}
        <span className="red">{redPoints}</span>
      </p>
      <Button variant="contained" color="primary" size="large">
        New Game
      </Button>
    </div>
  );
}
