import React, { Component } from "react";
import "./Nav.scss";
import { connect } from "react-redux";
import { requestUserData } from "../../redux/reducers/userReducer";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import { fetchUserPosts, fetchLikes } from "../../redux/reducers/postReducer";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel
} from "react-accessible-accordion";

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      expand: false
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

  handleExpand = () => {
    if (this.state.expand) {
      this.setState({ expand: false });
    } else {
      this.setState({ expand: true });
    }
  };

  render() {
    const { id, username, gamertag, profile_img, loggedIn } = this.props;
    // console.log(this.props);
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <img
          src="https://socialmediaacademia.files.wordpress.com/2018/11/poggers.png"
          alt="poggers"
          className="mt-10 mb-10 h-32 w-32"
        />
        <div className="flex flex-col justify-left items-center">
          <Link to="/poggers" className="m-5 flex justify-center items-center">
            <i className="material-icons lg:mr-2">home</i>
            <h2 className="sm:hidden md:hidden lg:block ml-2">Home</h2>
          </Link>
          <Link
            to="/poggers/discovery"
            className="m-5 flex justify-center items-center"
          >
            <i className="material-icons lg:mr-2">search</i>
            <h2 className="sm:hidden md:hidden lg:block ml-2">Discovery</h2>
          </Link>

          <Accordion className="w-full" allowZeroExpanded={true}>
            <AccordionItem className="block">
              <AccordionItemHeading className="flex justify-center items-center">
                <AccordionItemButton className="flex justify-center items-center">
                  <div className="flex flex-row justify-center items-center">
                    <img
                      src="http://pluspng.com/img-png/league-of-legends-png-should-riot-update-the-icon-256.png"
                      alt="LoLSmall"
                      className=" h-8 w-auto block md:mr-2 lg:hidden xl:hidden"
                    />
                    <img
                      src="https://www.riotgames.com/darkroom/800/6e3cb0c1ef68c36917c0ebc60e134f69:27e118b555199ad4738eaa74561e3e79/blank-uml-page-2.png"
                      alt="LoL"
                      className="sm:hidden md:hidden lg:block h-20 w-auto mr-2"
                    />

                    <div
                      className="flex justify-center items-center"
                      onClick={() => {
                        this.handleExpand();
                      }}
                    >
                      {!this.state.expand ? (
                        <i className="material-icons">expand_more</i>
                      ) : (
                        <i className="material-icons">expand_less</i>
                      )}
                    </div>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className="mt-5 sm:text-xs">
                <Link to="/poggers/lol/champions">Champions</Link>
              </AccordionItemPanel>
              <AccordionItemPanel className="mt-5 sm:text-xs">
                <Link to="/poggers/lol/leagues">Esports Leagues</Link>
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>

          <Link
            to={`/poggers/user/${gamertag}`}
            className="m-5 flex justify-center items-center"
            onClick={() => {
              this.props.fetchUserPosts(gamertag);
              this.props.fetchLikes();
            }}
          >
            <i className="material-icons lg:mr-2">person</i>
            <h2 className="sm:hidden md:hidden lg:block ml-2">{gamertag}</h2>
          </Link>
          <div
            className="m-5 flex justify-center items-center align-center cursor-pointer"
            onClick={this.logout}
          >
            {this.renderRedirect()}
            <i className="material-icons lg:mr-2">exit_to_app</i>
            <h2 className="sm:hidden md:hidden lg:block ml-2">Logout</h2>
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
