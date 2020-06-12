import React, { useState, useEffect, useContext } from "react";
import { GridList, GridListTile, Container } from "@material-ui/core";

import { AppContext } from "../../App";
import Card from "./Card";
import { TEAM_ROLE } from "../game_lobby/team_select/TeamPresets";

function GameBoard({ gameState, player, matchId }) {
  const { gameIO } = useContext(AppContext);
  const canPerformActions = useBoardStatus(gameState, player);

  const selectCard = (index) => {
    if (canPerformActions) {
      const data = {
        player: player,
        index: index,
      };
      if (
        player.role === TEAM_ROLE.FIELD_AGENT &&
        player.team === gameState.gameTurn.team &&
        gameState.gameTurn.role !== TEAM_ROLE.SPYMASTER
      ) {
        gameIO.state.io.emit("card select", matchId, data);
      }
      console.log("card selected on board");
    }
  };

  const generateCards = () => {
    const cards = gameState.gameBoard.cards;

    return cards.map((card, index) => {
      return (
        <GridListTile key={index}>
          <Card
            index={index}
            value={card}
            onClick={selectCard}
            player={player}
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
