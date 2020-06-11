import React, { useState, useEffect, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Typography from "@material-ui/core/Typography";

import { AppContext } from "../../../App";
import { useGameTeams } from "../../../socket_io/GameIO";
import { TEAM_CODE, ACTION_TYPE } from "./TeamPresets";
import { JoinRoleAction, LeaveRoleAction } from "./TeamSelectActions";
import "./TeamSelect.css";
import "../../common/common.css";

const UNOCCUPIED_SPOT_NAME = "--";

function TeamSelect({
  matchId,
  redTeamData,
  blueTeamData,
  onChange,
  currentUser,
}) {
  const { gameIO } = useContext(AppContext);
  const [
    { redTeam, redTeamDispatch },
    { blueTeam, blueTeamDispatch },
  ] = useGameTeams(gameIO.state.io, redTeamData, blueTeamData);
  const [isRoleAssigned, setIsRoleAssigned] = useState(false);

  useEffect(() => {
    onChange(redTeam, blueTeam);
    gameIO.state.io.emit("lobby role change", matchId, redTeam, blueTeam);
    // eslint-disable-next-line
  }, [isRoleAssigned]);

  const joinRole = (teamCode, index) => {
    const action = {
      type: ACTION_TYPE.SET_PLAYER,
      payload: index,
      user: currentUser,
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
      return !spot.user ? (
        !isRoleAssigned ? (
          <JoinRoleAction
            joinRole={joinRole}
            teamCode={teamCode}
            index={index}
          />
        ) : null
      ) : currentUser.id === spot.user.id && isRoleAssigned ? (
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
            {spot.user ? spot.user.name : UNOCCUPIED_SPOT_NAME}
          </ListItemText>
          <ListItemSecondaryAction>
            {generateActions(spot, index)}
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
  };

  return (
    <Grid container justify="center" alignItems="center" spacing={10}>
      <Grid item xs={6}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <Typography className="red" variant="h6" gutterBottom>
              Red Team
            </Typography>
          </Grid>
          <Grid item>
            <List>{generateListItem(TEAM_CODE.RED)}</List>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <Typography className="blue" variant="h6" gutterBottom>
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
