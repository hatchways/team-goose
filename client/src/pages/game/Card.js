import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";

import { TEAM_ROLE } from "../game_lobby/team_select/TeamPresets";
import "./Game.css";

const useStyles = makeStyles({
  button: {
    textTransform: "none",
  },
});

function Card({ index, value, onClick, type, isActive }) {
  const classes = useStyles();
  const style = useCardType(type, value.role, isActive);

  return (
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
      <Typography variant="h6">{value.word}</Typography>
    </Button>
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
      style.push("spy");
      if (role === "Innocent Bystander") {
        style.push("bystander");
      } else if (role === "Red Agent") {
        style.push("red");
      } else if (role === "Blue Agent") {
        style.push("blue");
      } else if (role === "Assassin") {
        style.push("assassin");
      }
    }

    setStyle(style.join(" "));
  }, [isActive, type, role]);

  return style;
}

export default Card;
