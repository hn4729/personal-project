import React, { Component } from "react";
import "./EsportsBar.scss";
import LoLSidebar from "../LoLSidebar/LoLSidebar";
import OWSidebar from "../OWSidebar/OWSidebar";
import CSGOSidebar from "../CSGOSidebar/CSGOSidebar";

class EsportsBar extends Component {
  render() {
    return (
      <div className="pt-3">
        <LoLSidebar />
        <OWSidebar />
        <CSGOSidebar />
      </div>
    );
  }
}

export default EsportsBar;
