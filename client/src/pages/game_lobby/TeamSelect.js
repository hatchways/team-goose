import React, { useState, useEffect } from "react";
import AddCircle from "@material-ui/icons/AddCircle";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import RemoveCircle from "@material-ui/icons/RemoveCircle";
import Typography from "@material-ui/core/Typography";

import { TEAM_CODE, DEFAULT_TEAM_STATE } from "./TeamPresets";
import "./TeamSelect.css";

const DEFAULT_RED_TEAM_STATE = JSON.parse(JSON.stringify(DEFAULT_TEAM_STATE));
const DEFAULT_BLUE_TEAM_STATE = JSON.parse(JSON.stringify(DEFAULT_TEAM_STATE));

const UNOCCUPIED_SPOT_NAME = "--";

function TeamSelect(props) {
  const [redTeam, setRedTeam] = useState(DEFAULT_RED_TEAM_STATE);
  const [blueTeam, setBlueTeam] = useState(DEFAULT_BLUE_TEAM_STATE);
  const [isRoleAssigned, setIsRoleAssigned] = useState(false);

  useEffect(() => {
    props.onChange(redTeam, blueTeam);
  });

  const changeRole = (teamCode, index) => {
    const getNewTeam = (team) => {
      const spot = team[index];
      const player = props.currentUser;
      let result = [...team];

      // join a role only if spot is unoccupied by another player
      if (!spot.player) {
        result[index].player = player;
      } else {
        result[index].player = null;
      }
      setIsRoleAssigned(!isRoleAssigned);

      return result;
    };

    if (teamCode === TEAM_CODE.RED) {
      const newRedTeam = getNewTeam(redTeam, index);
      setRedTeam(newRedTeam);
    } else {
      const newBlueTeam = getNewTeam(blueTeam, index);
      setBlueTeam(newBlueTeam);
    }
  };

  const generateListItem = (teamCode) => {
    const team = teamCode === TEAM_CODE.RED ? redTeam : blueTeam;
    const generateActions = (spot, index) => {
      return !spot.player ? (
        !isRoleAssigned ? (
          <IconButton
            onClick={() => {
              changeRole(teamCode, index);
            }}
            edge="end"
          >
            <AddCircle />
          </IconButton>
        ) : null
      ) : // show "Leave Role" action only if current user's session ID matches their own
      props.currentUser.sessionID === spot.player.sessionID &&
        isRoleAssigned ? (
        <IconButton
          onClick={() => {
            changeRole(teamCode, index);
          }}
          edge="end"
        >
          <RemoveCircle />
        </IconButton>
      ) : null;
    };

    return team.map((spot, index) => {
      const uniquekey = teamCode + "-" + index;
      return (
        <ListItem key={uniquekey}>
          <ListItemText secondary={spot.role}>
            {spot.player ? spot.player.firstName : UNOCCUPIED_SPOT_NAME}
          </ListItemText>
          <ListItemSecondaryAction>
            {generateActions(spot, index)}
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
  };

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item className="team">
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <Typography id="red-team" variant="h6" gutterBottom>
              Red Team
            </Typography>
          </Grid>
          <Grid item>
            <List>{generateListItem(TEAM_CODE.RED)}</List>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className="team">
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <Typography id="blue-team" variant="h6" gutterBottom>
              Blue Team
            </Typography>
          </Grid>
          <Grid item>
            <List>{generateListItem(TEAM_CODE.BLUE)}</List>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default TeamSelect;
