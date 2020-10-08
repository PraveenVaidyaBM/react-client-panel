import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import AppNavbar from "./Components/layout/AppNavbar";
import Dashboard from "./Components/layout/Dashboard";
import AddClient from "./Components/clients/AddClient";
import ClientDetails from "./Components/clients/ClientDetails";
import EditClient from "./Components/clients/EditClient";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Settings from "./Components/settings/Settings";

import {
  UserIsAuthenticated,
  UserIsNotAuthenticated,
} from "../src/helpers/auth";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <AppNavbar />
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                component={UserIsAuthenticated(Dashboard)}
              />
              <Route
                exact
                path="/client/add"
                component={UserIsAuthenticated(AddClient)}
              />
              <Route
                exact
                path="/client/:id"
                component={UserIsAuthenticated(ClientDetails)}
              />
              <Route
                exact
                path="/client/edit/:id"
                component={UserIsAuthenticated(EditClient)}
              />
              <Route
                exact
                path="/login"
                component={UserIsNotAuthenticated(Login)}
              />
              <Route
                exact
                path="/register"
                component={UserIsNotAuthenticated(Register)}
              />
              <Route
                exact
                path="/settings"
                component={UserIsAuthenticated(Settings)}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}
export default App;
