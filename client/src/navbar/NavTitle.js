import React from "react";
import { Grid, Typography } from "@material-ui/core";

function NavTitle({ title }) {
  const generateLetters = (title) => {
    const titleLength = title.length;
    let result = [];

    for (let index = 0; index < titleLength; index++) {
      const letter = title.charAt(index);
      const element = (
        <Grid item>
          <Typography variant="h5" className="letter">
            {letter}
          </Typography>
        </Grid>
      );
      result.push(element);
    }

    return result;
  };

  return (
    <Grid
      container
      className="title"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      {title ? generateLetters(title) : null}
    </Grid>
  );
}

export default NavTitle;
