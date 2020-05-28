import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";

import "./Game.css";

const useStyles = makeStyles({
  button: {
    textTransform: "none",
  },
});

function Card() {
  const classes = useStyles();

  return (
    <Button
      className="card"
      variant="outlined"
      disableRipple
      fullWidth
      classes={{ label: classes.button }}
    >
      <Typography variant="h6">Card</Typography>
    </Button>
  );
}

export default Card;
