import React, { useState, useEffect, useReducer } from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Typography from "@material-ui/core/Typography";

import { TEAM_CODE, ACTION_TYPE, reducer as teamReducer } from "./TeamPresets";
import { JoinRoleAction, LeaveRoleAction } from "./TeamSelectActions";
import "./TeamSelect.css";

const DEFAULT_RED_TEAM_STATE = [
  { role: "Spymaster", player: { sessionID: 2, firstName: "Bonnie" } },
  { role: "Field Agent", player: { sessionID: 3, firstName: "Renyi" } },
  { role: "Field Agent", player: null },
  { role: "Field Agent", player: null },
];
const DEFAULT_BLUE_TEAM_STATE = [
  { role: "Spymaster", player: { sessionID: 4, firstName: "Manpreet" } },
  { role: "Field Agent", player: null },
  { role: "Field Agent", player: null },
  { role: "Field Agent", player: null },
];

const UNOCCUPIED_SPOT_NAME = "--";

function TeamSelect(props) {
  const [redTeam, redTeamDispatch] = useReducer(
    teamReducer,
    DEFAULT_RED_TEAM_STATE
  );
  const [blueTeam, blueTeamDispatch] = useReducer(
    teamReducer,
    DEFAULT_BLUE_TEAM_STATE
  );
  const [isRoleAssigned, setIsRoleAssigned] = useState(false);

  useEffect(() => {
    props.onChange(redTeam, blueTeam);
  });

  const joinRole = (teamCode, index) => {
    const action = {
      type: ACTION_TYPE.SET_PLAYER,
      payload: index,
      player: props.currentUser,
    };

    teamCode === TEAM_CODE.RED
      ? redTeamDispatch(action)
      : blueTeamDispatch(action);

    setIsRoleAssigned(!isRoleAssigned);
  };

  const leaveRole = (teamCode, index) => {
    const action = {
      type: ACTION_TYPE.SET_PLAYER,
      payload: index,
    };

    teamCode === TEAM_CODE.RED
      ? redTeamDispatch(action)
      : blueTeamDispatch(action);

    setIsRoleAssigned(!isRoleAssigned);
  };

  const generateListItem = (teamCode) => {
    const team = teamCode === TEAM_CODE.RED ? redTeam : blueTeam;
    const generateActions = (spot, index) => {
      return !spot.player ? (
        !isRoleAssigned ? (
          <JoinRoleAction
            joinRole={joinRole}
            teamCode={teamCode}
            index={index}
          />
        ) : null
      ) : // show "Leave Role" action only if current user's session ID matches their own
      props.currentUser.sessionID === spot.player.sessionID &&
        isRoleAssigned ? (
        <LeaveRoleAction
          leaveRole={leaveRole}
          teamCode={teamCode}
          index={index}
        />
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
