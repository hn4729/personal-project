import React, { Component } from "react";
import "./EsportsBar.scss";
import * as serviceAccount from "../../serviceAccount.json";
import { Query } from "react-apollo";
import { GET_LOL_LEAGUES, GET_PAST_LOL_LEAGUE_MATCHES } from "../../Queries";
import LoLSidebar from "../LoLSidebar/LoLSidebar";

const LOLLeagueIDs = [289, 290, 293, 294];

class EsportsBar extends Component {
  render() {
    return (
      <div>
        <LoLSidebar />
      </div>
    );
  }
}

export default EsportsBar;
