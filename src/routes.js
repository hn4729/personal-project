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
import PersonalFeed from "./components/PersonalFeed/PersonalFeed";
import LoLChamps from "./components/LoLChamps/LoLChamps";
import LoLLeagues from "./components/LoLLeagues/LoLLeagues";
import IndividualLoLLeague from "./components/IndividualLoLLeague/IndividualLoLLeague";

export default (
  <>
    <Route exact path="/" component={WelcomeLogin} />
    <Route path="/register" component={Register} />
    <Switch>
      <Route
        path="/poggers"
        render={() => (
          <div className="Website flex text-center">
            <div className="Nav w-2/12 bg-darkgrey text-white mx-h-screen overflow-y-auto overflow-x-hidden">
              <Nav />
            </div>

            <Route exact path="/poggers" component={PersonalFeed} />

            <Route exact path="/poggers/discovery" component={Social} />

            <Route exact path="/poggers/post/:id" component={IndividualPost} />
            <Route exact path="/poggers/user/:gamertag" component={Profile} />
            <Route exact path="/poggers/lol/champions" component={LoLChamps} />
            <Route exact path="/poggers/lol/leagues" component={LoLLeagues} />
            <Route
              exact
              path="/poggers/lol/leagues/:league_id"
              component={IndividualLoLLeague}
            />

            <div className="w-3/12 bg-darkgrey text-white sm:hidden md:hidden overflow-y-auto overflow-x-hidden mx-h-screen">
              <EsportsBar />
            </div>
          </div>
        )}
      />
    </Switch>
  </>
);
