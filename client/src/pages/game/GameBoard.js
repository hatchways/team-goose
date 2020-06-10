import React, { useState, useEffect } from "react";
import { GridList, GridListTile, Container } from "@material-ui/core";

import Card from "./Card";
import { TEAM_ROLE } from "../game_lobby/team_select/TeamPresets";

function GameBoard({ gameState, player }) {
  const canPerformActions = useBoardStatus(gameState, player);

  const selectCard = () => {
    if (canPerformActions) {
      console.log("card selected on board");
    }
  };

  const generateCards = () => {
    const cards = gameState.gameBoard.cards;

    return cards.map((card, index) => {
      return (
        <GridListTile key={index}>
          <Card
            value={card}
            onClick={selectCard}
            type={player.role}
            isActive={canPerformActions}
          />
        </GridListTile>
      );
    });
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
  }, [gameState, player.team, player.role]);

  return canPerformActions;
}

export default GameBoard;
