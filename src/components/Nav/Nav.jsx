import React, { Component } from "react";
import "./Nav.scss";
import { connect } from "react-redux";
import { requestUserData } from "../../redux/reducers/userReducer";

class Nav extends Component {
  componentDidMount() {
    this.props.requestUserData();
  }

  render() {
    const { id, username, gamertag, profile_img, loggedIn } = this.props;
    console.log(this.props);
    return (
      <div className="flex flex-col justify-center items-center">
        <img
          src="https://socialmediaacademia.files.wordpress.com/2018/11/poggers.png"
          alt="poggers"
          className="mt-10 mb-10 h-32 w-32"
        />
        <div className="flex flex-col justify-left items-center">
          <div className="m-5 flex justify-center items-center">
            <i className="material-icons mr-2">home</i>
            <h2 className="sm:hidden md:hidden lg:block">Home</h2>
          </div>
          <div className="m-5 flex justify-center items-center">
            <i className="material-icons mr-2">search</i>
            <h2 className="sm:hidden md:hidden lg:block">Discovery</h2>
          </div>
          <div className="m-5 flex justify-center items-center">
            <i className="material-icons mr-2">person</i>
            <h2 className="sm:hidden md:hidden lg:block">{gamertag}</h2>
          </div>
          <div className="m-5 flex justify-center items-center align-center">
            <i className="material-icons mr-2">exit_to_app</i>
            <h2 className="sm:hidden md:hidden lg:block">Logout</h2>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    id: reduxState.user.id,
    username: reduxState.user.username,
    gamertag: reduxState.user.gamertag,
    profile_img: reduxState.user.profile_img,
    loggedIn: reduxState.user.loggedIn
  };
}

export default connect(
  mapStateToProps,
  { requestUserData }
)(Nav);
