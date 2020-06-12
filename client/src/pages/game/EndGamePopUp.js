import React, { useEffect} from "react";
import { ReactComponent as Skull } from "../../img/skull.svg";
import Button from "@material-ui/core/Button";
import "./EndGamePopUp.css";

export default function EndGamePopUp(props) {

  useEffect(() => {
    
  })

  const { winner, redPoints, bluePoints } = props.gameState;
  
  return (
    <div className="end-game-model">
      <div className="end-game-pop-up" animate={{ scale: 2 }} transition={{ ease: "easeOut", duration: 2 }}>
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
