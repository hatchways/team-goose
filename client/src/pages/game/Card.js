import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";

import "./Game.css";

const useStyles = makeStyles({
  button: {
    textTransform: "none",
  },
});

function Card({ word }) {
  const classes = useStyles();
  const [style, setStyle] = useState("");

  const onClick = () => {
    const selectedStyle = "selected red-color";
    setStyle(selectedStyle);
  };

  return (
    <Button
      className={`card ${style}`}
      variant="outlined"
      disableRipple
      fullWidth
      classes={{ label: classes.button }}
      onClick={onClick}
    >
      <Typography variant="h6">{word}</Typography>
    </Button>
  );
}

export default Card;
