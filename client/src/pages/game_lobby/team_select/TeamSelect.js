import React, { useState, useEffect, useReducer, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Typography from "@material-ui/core/Typography";

import {
  TEAM_CODE,
  ACTION_TYPE,
  DEFAULT_RED_TEAM_STATE,
  DEFAULT_BLUE_TEAM_STATE,
  reducer as teamReducer,
} from "./TeamPresets";
import { AppContext } from '../../../App';
import { useUser } from "../../../contexts/user";
import { JoinRoleAction, LeaveRoleAction } from "./TeamSelectActions";
import "./TeamSelect.css";
import "../../common/common.css";

const UNOCCUPIED_SPOT_NAME = "--";

function TeamSelect(props) {
  const { user } = useUser();
  const { gameIO } = useContext(AppContext);
  const { matchId } = props;
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
    // get updated players from server
    if (gameIO.state.io) {
      gameIO.state.io.on('update red team', (players) => {
        console.log('update red team', players)
        const action = {
          type: ACTION_TYPE.UPDATE_PLAYERS,
          players: players
        };
        redTeamDispatch(action);
      });
      gameIO.state.io.on('update blue team', (players) => {
        console.log('update blue team', players)
        const action = {
          type: ACTION_TYPE.UPDATE_PLAYERS,
          players: players
        }
        blueTeamDispatch(action);
      });
    }
  }, [gameIO.state.io]);

  useEffect(() => {
    props.onChange(redTeam, blueTeam);
  });

  useEffect(() => {
    if (matchId) {
      gameIO.state.io.emit("get teams", matchId);
      gameIO.state.io.on("update teams", ({ redTeam, blueTeam }) => {
        redTeamDispatch({
          type: ACTION_TYPE.UPDATE_PLAYERS,
          players: redTeam,
        });
        blueTeamDispatch({
          type: ACTION_TYPE.UPDATE_PLAYERS,
          players: blueTeam,
        });
        checkIsRoleAssigned([...redTeam, ...blueTeam]);
      });
    }
    // fetch(`/api/match/${matchId}/teams`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //       redTeamDispatch({
    //         type: ACTION_TYPE.UPDATE_PLAYERS,
    //         players: data.redTeam
    //       });
    //       blueTeamDispatch({
    //         type: ACTION_TYPE.UPDATE_PLAYERS,
    //         players: data.blueTeam
    //       });
    //       checkIsRoleAssigned([...data.redTeam, ...data.blueTeam]);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [matchId]);

  const checkIsRoleAssigned = (teams) => {
    for (let idx = 0; idx < teams.length; idx++) {
      if (teams[idx].player && teams[idx].player.id === user.id) {
        setIsRoleAssigned(true);
        return;
      }
    } 
  }

  const joinRole = (teamCode, index) => {
    const { id, name, email } = props.currentUser;
    const action = {
      type: ACTION_TYPE.SET_PLAYER,
      payload: index,
      player: props.currentUser,
    };

    if (teamCode === TEAM_CODE.RED) {
      redTeamDispatch(action);
      gameIO.state.io.emit("join red team", { index , player: { id, name, email }, matchId })
    } else {
      blueTeamDispatch(action);
      gameIO.state.io.emit("join blue team", { index, player: { id, name, email }, matchId })
    }

    setIsRoleAssigned(!isRoleAssigned);
  };

  const leaveRole = (teamCode, index) => {
    const action = {
      type: ACTION_TYPE.SET_PLAYER,
      payload: index,
    };

    if (teamCode === TEAM_CODE.RED) {
      redTeamDispatch(action);
      gameIO.state.io.emit("leave red team", { index, matchId })
    } else {
      blueTeamDispatch(action);
      gameIO.state.io.emit("leave blue team", { index, matchId })
    }
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
      ) : props.currentUser.id === spot.player.id && isRoleAssigned ? (
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
            {spot.player ? spot.player.name : UNOCCUPIED_SPOT_NAME}
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
