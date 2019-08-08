import React from "react";
import { Switch, Route } from "react-router-dom";
import WelcomeLogin from "./components/WelcomeLogin/WelcomeLogin";
import Register from "./components/Register/Register";
import WebsiteContainer from "./components/WebsiteContainer/WebsiteContainer";
import Nav from "./components/Nav/Nav";
import EsportsBar from "./components/EsportsBar/EsportsBar";
import Social from "./components/Social/Social";
import IndividualPost from "./components/IndividualPost/IndividualPost";
import Profile from "./components/Profile/Profile";

export default (
  <>
    <Route exact path="/" component={WelcomeLogin} />
    <Route path="/register" component={Register} />
    <Switch>
      <Route
        path="/poggers"
        render={() => (
          <div className="Website flex text-center">
            <div className="Nav w-2/12 bg-darkgrey text-white mx-h-screen">
              <Nav />
            </div>

            <Route
              exact
              path="/poggers"
              render={() => (
                <div className="flex flex-col w-7/12 text-white bg-grey overflow-auto sm:w-10/12 md:w-10/12">
                  <Social />
                </div>
              )}
            />

            <Route exact path="/poggers/post/:id" component={IndividualPost} />
            <Route exact path="/poggers/user/:gamertag" component={Profile} />

            <div className="w-3/12 bg-darkgrey text-white sm:hidden md:hidden">
              <EsportsBar />
            </div>
          </div>
        )}
      />
    </Switch>
  </>
);
