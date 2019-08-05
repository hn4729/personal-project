import React from "react";
import { Switch, Route } from "react-router-dom";
import WelcomeLogin from "./components/WelcomeLogin/WelcomeLogin";
import Register from "./components/Register/Register";
import WebsiteContainer from "./components/WebsiteContainer/WebsiteContainer";

export default (
  <Switch>
    <Route exact path="/" component={WelcomeLogin} />
    <Route path="/register" component={Register} />
    <Route path="/home" component={WebsiteContainer} />
  </Switch>
);
