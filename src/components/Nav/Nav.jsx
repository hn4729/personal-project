import React, { Component } from "react";
import "./Nav.scss";

class Nav extends Component {
  render() {
    return (
      <div className="Nav w-2/12 bg-darkgrey text-white mx-h-screen flex flex-col justify-start">
        <h1 className="mt-10 mb-10">LOGO</h1>
        <h2 className="m-5">Home</h2>
        <h2 className="m-5">Discovery</h2>
        <h2 className="m-5">Profile</h2>
      </div>
    );
  }
}

export default Nav;
