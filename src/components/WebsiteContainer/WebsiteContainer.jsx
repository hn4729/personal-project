import React, { Component } from "react";
import "./WebsiteContainer.scss";
import Nav from "../Nav/Nav";
import Social from "../Social/Social";
import EsportsBar from "../EsportsBar/EsportsBar";

class WebsiteContainer extends Component {
  render() {
    return (
      <div className="Website flex text-center">
        <Nav />
        <Social />
        <EsportsBar />
      </div>
    );
  }
}

export default WebsiteContainer;
