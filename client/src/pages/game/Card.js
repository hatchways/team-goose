import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import { TEAM_ROLE, TEAM_CODE } from "../game_lobby/team_select/TeamPresets";
import CardVoteTooltip from "./CardVoteTooltip";
import "./Game.css";

const useStyles = makeStyles({
  button: {
    textTransform: "none",
  },
});

const CARD_ROLE = {
  BYSTANDER: { name: "Innocent Bystander", css: "bystander" },
  RED_AGENT: { name: "Red Agent", css: "red" },
  BLUE_AGENT: { name: "Blue Agent", css: "blue" },
  ASSASSIN: { name: "Assassin", css: "assassin" },
};

const CARD_GUESSED = {
  RED_TEAM: "selected bg-red",
  BLUE_TEAM: "selected bg-blue",
};

function Card({ index, value, onClick, player, isActive }) {
  const classes = useStyles();
  const style = useCardType(player.role, value, isActive);

  return (
    <CardVoteTooltip voters={value.voted}>
      <Button
        className={`card ${style}`}
        variant="outlined"
        disableRipple
        disableFocusRipple
        fullWidth
        classes={{ label: classes.button }}
        onClick={() => {
          onClick(index);
        }}
        disabled={value.selected}
      >
        <Grid
          container
          justify="center"
          alignItems="center"
          alignContent="center"
          spacing={1}
        >
          <Grid item>
            <Typography variant="h6" gutterBottom>
              {value.word}
            </Typography>
          </Grid>
          <Grid item>
            {value.voted.length > 0 && !value.selected ? (
              <CheckCircleOutlineIcon
                className={player.team === TEAM_CODE.RED ? "red" : "blue"}
              />
            ) : null}
          </Grid>
        </Grid>
      </Button>
    </CardVoteTooltip>
  );
}

function useCardType(type = TEAM_ROLE.FIELD_AGENT, value, isActive = false) {
  const [style, setStyle] = useState("");

  useEffect(() => {
    const role = value.role;
    let style = [];

    if (!isActive) {
      style.push("non-active");
    } else {
      style = [];
    }

    if (type === TEAM_ROLE.SPYMASTER) {
      if (role === CARD_ROLE.BYSTANDER.name) {
        style.push(CARD_ROLE.BYSTANDER.css);
      } else if (role === CARD_ROLE.RED_AGENT.name) {
        style.push(CARD_ROLE.RED_AGENT.css);
      } else if (role === CARD_ROLE.BLUE_AGENT.name) {
        style.push(CARD_ROLE.BLUE_AGENT.css);
      } else if (role === CARD_ROLE.ASSASSIN.name) {
        style.push(CARD_ROLE.ASSASSIN.css);
      }
    }

    if (value.selected) {
      if (role === CARD_ROLE.RED_AGENT.name) {
        style.push(CARD_GUESSED.RED_TEAM);
      } else if (role === CARD_ROLE.BLUE_AGENT.name) {
        style.push(CARD_GUESSED.BLUE_TEAM);
      }
    }

    setStyle(style.join(" "));
  }, [isActive, type, value]);

  return style;
}

export default Card;
