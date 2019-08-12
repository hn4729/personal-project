import React, { Component } from "react";
import "./Nav.scss";
import { connect } from "react-redux";
import { requestUserData } from "../../redux/reducers/userReducer";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import { fetchUserPosts, fetchLikes } from "../../redux/reducers/postReducer";

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false
    };
  }

  componentDidMount() {
    this.props.requestUserData();
  }

  logout = () => {
    axios.get("/auth/logout");
    this.setState({ redirect: true });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };

  render() {
    const { id, username, gamertag, profile_img, loggedIn } = this.props;
    // console.log(this.props);
    return (
      <div className="flex flex-col justify-center items-center">
        <img
          src="https://socialmediaacademia.files.wordpress.com/2018/11/poggers.png"
          alt="poggers"
          className="mt-10 mb-10 h-32 w-32"
        />
        <div className="flex flex-col justify-left items-center">
          <Link to="/poggers" className="m-5 flex justify-center items-center">
            <i className="material-icons mr-2">home</i>
            <h2 className="sm:hidden md:hidden lg:block">Home</h2>
          </Link>
          <Link
            to="/poggers/discovery"
            className="m-5 flex justify-center items-center"
          >
            <i className="material-icons mr-2">search</i>
            <h2 className="sm:hidden md:hidden lg:block">Discovery</h2>
          </Link>
          <Link
            to={`/poggers/user/${gamertag}`}
            className="m-5 flex justify-center items-center"
            onClick={() => {
              this.props.fetchUserPosts(gamertag);
              this.props.fetchLikes();
            }}
          >
            <i className="material-icons mr-2">person</i>
            <h2 className="sm:hidden md:hidden lg:block">{gamertag}</h2>
          </Link>
          <div
            className="m-5 flex justify-center items-center align-center cursor-pointer"
            onClick={this.logout}
          >
            {this.renderRedirect()}
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
  { requestUserData, fetchLikes, fetchUserPosts }
)(Nav);
