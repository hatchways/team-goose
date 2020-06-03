import React, { useState, useReducer } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import CreateGame from "./pages/create_game/CreateGame";
import GameIO from "./socket_io/GameIO";
import GameLobby from "./pages/game_lobby/GameLobby";
import Game from "./pages/game/Game";
import BaseLayout from "./layouts/base/Base";
import PrivateRoute from "./PrivateRoute";

import { AuthContext } from "./contexts/auth";
import { UserContext } from "./contexts/user";
import "./App.css";

export const AppContext = React.createContext({});

function App() {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const existingUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUserData] = useState(existingUser);

  const [gameIOState, gameIODispatch] = useReducer(
    GameIO.reducer,
    GameIO.initialState
  );
  const value = { gameIO: { state: gameIOState, dispatch: gameIODispatch } };

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  const setUser = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUserData(data);
  };

  return (
    <AppContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
          <UserContext.Provider value={{ user, setUserData: setUser }}>
            <BaseLayout>
              <BrowserRouter>
                <Route path="/signup" component={SignUp} />
                <Route path="/login" component={Login} />
                <PrivateRoute exact path="/" component={CreateGame} />
                <PrivateRoute path="/game_lobby" component={GameLobby} />
                <PrivateRoute path="/game" component={Game} />
              </BrowserRouter>
            </BaseLayout>
          </UserContext.Provider>
        </AuthContext.Provider>
      </MuiThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
