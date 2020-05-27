import React from "react";

import NavBar from "../../navbar/NavBar";
import "./Base.css";

function Base({ children }) {
  return (
    <>
      <NavBar />
      <div className="content">{children}</div>
    </>
  );
}

export default Base;
