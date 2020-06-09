import React, { useState, useEffect } from "react";
import { GridList, GridListTile, Container } from "@material-ui/core";

import Card from "./Card";
import { TEAM_ROLE } from "../game_lobby/team_select/TeamPresets";

const MAX_BOARD_CARDS = 25;

function GameBoard({ gameState, player }) {
  const canPerformActions = useBoardStatus(gameState, player);

  const selectCard = () => {
    if (canPerformActions) {
      console.log("card selected on board");
    }
  };

  const generateCards = () => {
    let result = [];

    for (let index = 0; index < MAX_BOARD_CARDS; index++) {
      const element = (
        <GridListTile key={index}>
          <Card onClick={selectCard} isActive={canPerformActions} />
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

function useBoardStatus(gameState, player) {
  const [canPerformActions, setCanPerformActions] = useState(false);

  useEffect(() => {
    if (gameState) {
      if (
        player.team === gameState.gameTurn.team &&
        player.role === TEAM_ROLE.FIELD_AGENT
      ) {
        setCanPerformActions(true);
      }
    }
  });

  return canPerformActions;
}

export default GameBoard;
