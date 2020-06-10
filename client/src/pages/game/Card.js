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
  BLUE_AGEHT: { name: "Blue Agent", css: "blue" },
  ASSASSIN: { name: "Assassin", css: "assassin" },
};

function Card({ index, value, onClick, player, isActive }) {
  const classes = useStyles();
  const style = useCardType(player.role, value.role, isActive);

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
            {value.voted.length > 0 ? (
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

function useCardType(type = TEAM_ROLE.FIELD_AGENT, role, isActive = false) {
  const [style, setStyle] = useState("");

  useEffect(() => {
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
      } else if (role === CARD_ROLE.BLUE_AGEHT.name) {
        style.push(CARD_ROLE.BLUE_AGEHT.css);
      } else if (role === CARD_ROLE.ASSASSIN.name) {
        style.push(CARD_ROLE.ASSASSIN.css);
      }
    }

    setStyle(style.join(" "));
  }, [isActive, type, role]);

  return style;
}

export default Card;
