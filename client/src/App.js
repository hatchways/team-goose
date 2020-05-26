import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

import "./App.css";

function App() {
  const token = localStorage.getItem('token');

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/" component={LandingPage} />
        <Route path="/signup" component={SignUp}/>
        <Route path="/login" component={Login}/>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
