import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import CreateGame from "./pages/create_game/CreateGame";
import GameLobby from "./pages/game_lobby/GameLobby";
import Game from "./pages/game/Game";
import BaseLayout from "./layouts/base/Base";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BaseLayout>
        <BrowserRouter>
          <Route exact path="/" component={LandingPage} />
          <Route path="/create_game" component={CreateGame} />
          <Route path="/game_lobby" component={GameLobby} />
          <Route path="/game" component={Game} />
        </BrowserRouter>
      </BaseLayout>
    </MuiThemeProvider>
  );
}

export default App;
