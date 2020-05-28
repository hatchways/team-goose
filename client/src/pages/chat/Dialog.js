import React from "react";
import { Box, Typography } from "@material-ui/core";

import "../common/common.css";

function Dialog({ message }) {
  return (
    <Box component="div" className="dialog sender bg-red">
      <Typography variant="body1">{message}</Typography>
    </Box>
  );
}

export default Dialog;
