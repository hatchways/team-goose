import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import "../common/common.css";

function Header(props) {
  return (
    <>
      <Grid
        container
        className="header"
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <Typography className="title" align="center" variant="h4">
            {props.title}
          </Typography>
        </Grid>
        <Grid item>
          <div className="underscore" />
        </Grid>
      </Grid>
    </>
  );
}

export default Header;
