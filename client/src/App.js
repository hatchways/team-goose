import React, { useState, useReducer } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import CreateGame from "./pages/create_game/CreateGame";
import GameIO from "./socket_io/GameIO";
import GameLobby from "./pages/game_lobby/GameLobby";
import Game from "./pages/game/Game";
import BaseLayout from "./layouts/base/Base";
import PrivateRoute from "./PrivateRoute";

import { AuthContext } from "./contexts/auth";
import "./App.css";

export const AppContext = React.createContext({});

function App() {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const [gameIOState, gameIODispatch] = useReducer(
    GameIO.reducer,
    GameIO.initialState
  );
  const value = { gameIO: { state: gameIOState, dispatch: gameIODispatch } };

  const setTokens = (data) => {
    const token = data.data.token;
    localStorage.setItem("tokens", JSON.stringify(token));
    setAuthTokens(token);
  };

  return (
    <AppContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <BaseLayout>
          <AuthContext.Provider
            value={{ authTokens, setAuthTokens: setTokens }}
          >
            <BrowserRouter>
              <Route exact path="/" component={LandingPage} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/create_game" component={CreateGame} />
              <PrivateRoute path="/game_lobby" component={GameLobby} />
              <PrivateRoute path="/game" component={Game} />
            </BrowserRouter>
          </AuthContext.Provider>
        </BaseLayout>
      </MuiThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
