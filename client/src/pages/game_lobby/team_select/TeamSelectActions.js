import React from "react";
import AddCircle from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import RemoveCircle from "@material-ui/icons/RemoveCircle";

export const JoinRoleAction = ({ joinRole, teamCode, index }) => {
  return (
    <IconButton
      onClick={() => {
        joinRole(teamCode, index);
      }}
      edge="end"
    >
      <AddCircle />
    </IconButton>
  );
};

export const LeaveRoleAction = ({ leaveRole, teamCode, index }) => {
  return (
    <IconButton
      onClick={() => {
        leaveRole(teamCode, index);
      }}
      edge="end"
    >
      <RemoveCircle />
    </IconButton>
  );
};
