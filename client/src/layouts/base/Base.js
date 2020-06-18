import React from "react";

import NavBar from "../../navbar/NavBar";
import "./Base.css";
import { Box } from "@material-ui/core";

function Base({ children }) {
  return (
    <>
      <NavBar />
      <Box component="div" className="base-content">
        {children}
      </Box>
    </>
  );
}

export default Base;
