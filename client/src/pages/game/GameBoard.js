import React, { useState, useEffect } from "react";
import { GridList, GridListTile, Container } from "@material-ui/core";

import Card from "./Card";

const MAX_BOARD_CARDS = 25;

function GameBoard() {
  const generateCards = () => {
    let result = [];

    for (let index = 0; index < MAX_BOARD_CARDS; index++) {
      const element = (
        <GridListTile key={index}>
          <Card />
        </GridListTile>
      );
      result.push(element);
    }

    return result;
  };

  return (
    <Container className="gameboard">
      <GridList cols={5} cellHeight={100} spacing={20}>
        {generateCards()}
      </GridList>
    </Container>
  );
}

function useBoardStatus({ gameState, player }) {
  const [canPerformActions, setCanPerformActions] = useState(false);

  useEffect(() => {
    if (gameState) {
      if (player.team === gameState.gameTurn.team) {
        setCanPerformActions(true);
      }
    }
  }, [gameState, player.team]);

  return canPerformActions;
}

export default GameBoard;
