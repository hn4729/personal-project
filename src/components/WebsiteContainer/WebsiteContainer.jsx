import React, { Component } from "react";
import "./WebsiteContainer.scss";
import Nav from "../Nav/Nav";
import Social from "../Social/Social";
import EsportsBar from "../EsportsBar/EsportsBar";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

class WebsiteContainer extends Component {
  render() {
    return (
      <div className="Website flex text-center">
        <div className="Nav w-2/12 bg-darkgrey text-white mx-h-screen">
          <Nav />
        </div>

        <div className="flex flex-col w-7/12 text-white bg-grey overflow-auto sm:w-10/12 md:w-10/12">
          <Social />
        </div>

        <div className="w-3/12 bg-darkgrey text-white sm:hidden md:hidden">
          <EsportsBar />
        </div>
      </div>
    );
  }
}

export default connect()(WebsiteContainer);
