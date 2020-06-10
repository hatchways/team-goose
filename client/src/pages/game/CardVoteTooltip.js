import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Tooltip, Typography, Zoom } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles(() => ({
  size: {
    minWidth: 100,
    padding: 15,
    borderRadius: 8,
    top: 15,
    left: 6,
  },
}));

function CardVoteTooltip({ voters, children }) {
  const classes = useStyles();

  return (
    <Tooltip
      arrow
      title={voters.length > 0 ? <CustomTitle voters={voters} /> : ""}
      placement="top"
      interactive
      leaveDelay={300}
      classes={{ tooltipPlacementTop: classes.size }}
    >
      {children}
    </Tooltip>
  );
}

function CustomTitle({ voters }) {
  const generateTitle = () => {
    return voters.map((voter, index) => {
      return (
        <Grid key={index} item>
          <Grid container alignItems="center" alignContent="center" spacing={1}>
            <Grid item>
              <CheckIcon className="vote-checker" fontSize="small" />
            </Grid>
            <Grid item>
              <Typography gutterBottom>{voter.user.name}</Typography>
            </Grid>
          </Grid>
        </Grid>
      );
    });
  };

  return (
    <Grid container direction="column">
      {voters ? generateTitle() : null}
    </Grid>
  );
}

export default CardVoteTooltip;
