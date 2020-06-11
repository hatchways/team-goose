import React from "react";
import { ReactComponent as Skull } from "../../img/skull.svg";
import Button from "@material-ui/core/Button";
import "./EndGamePopUp.css";

export default function EndGamePopUp({ winner, bluePoints, redPoints }) {
  //dummy data
  winner = "Blue";
  bluePoints = 6;
  redPoints = 6;

  return (
    <div className="end-game-model active">
      <div className="end-game-pop-up active">
        <Skull id="skull" />
        <h2>Game over!</h2>
        <p className={winner === "Blue" ? "blue" : "red"}>{winner} wins</p>
        <p>
          <span className="blue">{bluePoints}</span> :{" "}
          <span className="red">{redPoints}</span>
        </p>
        <Button variant="contained" color="primary" size="large">
          New Game
        </Button>
      </div>
      <div id="overlay"></div>
    </div>
  );
}
