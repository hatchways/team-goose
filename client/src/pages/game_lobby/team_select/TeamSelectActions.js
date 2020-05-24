import React from "react";
import AddCircle from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import RemoveCircle from "@material-ui/icons/RemoveCircle";

export const JoinRoleAction = (props) => {
  return (
    <IconButton
      onClick={() => {
        props.joinRole(props.teamCode, props.index);
      }}
      edge="end"
    >
      <AddCircle />
    </IconButton>
  );
};

export const LeaveRoleAction = (props) => {
  return (
    <IconButton
      onClick={() => {
        props.leaveRole(props.teamCode, props.index);
      }}
      edge="end"
    >
      <RemoveCircle />
    </IconButton>
  );
};
