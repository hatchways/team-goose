import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";

import "./Game.css";

const useStyles = makeStyles({
  button: {
    textTransform: "none",
  },
});

function Card({ onClick, isActive }) {
  const classes = useStyles();
  const [style, setStyle] = useState("");

  useEffect(() => {
    if (!isActive) {
      const style = "non-active";
      setStyle(style);
    } else {
      setStyle("");
    }
  }, [isActive]);

  return (
    <Button
      className={`card ${style}`}
      variant="outlined"
      disableRipple
      disableFocusRipple
      fullWidth
      classes={{ label: classes.button }}
      onClick={onClick}
    >
      <Typography variant="h6">Card</Typography>
    </Button>
  );
}

export default Card;
