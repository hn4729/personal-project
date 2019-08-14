import React, { Component } from "react";
import "./EsportsBar.scss";
import * as serviceAccount from "../../serviceAccount.json";
import { Query } from "react-apollo";
import LoLSidebar from "../LoLSidebar/LoLSidebar";
import OWSidebar from "../OWSidebar/OWSidebar";

const LOLLeagueIDs = [289, 290, 293, 294];

class EsportsBar extends Component {
  render() {
    return (
      <div className="pt-5">
        <LoLSidebar />
        <OWSidebar />
      </div>
    );
  }
}

export default EsportsBar;
