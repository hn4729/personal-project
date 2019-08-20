import React, { Component } from "react";
import "./Nav.scss";
import { connect } from "react-redux";
import {
  requestUserData,
  fetchAllUsers
} from "../../redux/reducers/userReducer";
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
      expand: false,
      expand_two: false,
      searchStatus: "search-close",
      searchInput: ""
    };
  }

  componentDidMount() {
    this.props.requestUserData();
    this.props.fetchAllUsers();
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
    } else if (!this.state.expand) {
      this.setState({ expand: true });
    }
    if (this.state.expand_two) {
      this.setState({ expand_two: false });
    } else if (!this.state.expand_two) {
      this.setState({ expand_two: true });
    }
  };

  toggleSearch = () => {
    if (this.state.searchStatus === "search-open") {
      this.setState({ searchStatus: "search-close", searchInput: "" });
    } else {
      this.setState({ searchStatus: "search-open" });
    }
  };

  handleSearchInput = event => {
    this.setState({ searchInput: event.target.value });
  };

  render() {
    const { id, username, gamertag, profile_img, loggedIn, users } = this.props;
    // console.log(this.props);
    let user;
    if (users !== undefined && users.length > 0) {
      user = users.filter(user => user.gamertag === gamertag);
    }
    return (
      <div className="w-full flex flex-col justify-center items-center">
        {user && (
          <div className={this.state.searchStatus}>
            <div className="flex justify-center items-center">
              <input
                type="text"
                value={this.state.searchInput}
                onChange={this.handleSearchInput}
                placeholder="Search..."
                className="rounded px-1 h-10 ml-2 my-2 w-5/6 text-grey"
              />
              <i className="mx-1 material-icons" onClick={this.toggleSearch}>
                cancel
              </i>
            </div>
            {this.state.searchInput !== ""
              ? users
                  .filter(user =>
                    user.gamertag.toLowerCase().includes(this.state.searchInput)
                  )
                  .map((user, index) => {
                    return (
                      <Link
                        to={`/poggers/user/${user.gamertag}`}
                        onClick={() => {
                          this.props.fetchUserPosts(user.gamertag);
                          this.toggleSearch();
                        }}
                        className="m-2 font-semibold"
                      >
                        {user.gamertag}
                      </Link>
                    );
                  })
              : null}
          </div>
        )}
        <img
          src="https://socialmediaacademia.files.wordpress.com/2018/11/poggers.png"
          alt="poggers"
          className="m-10 h-32 w-32 sm:w-12 sm:h-12"
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
            <i className="material-icons lg:mr-2">star</i>
            <h2 className="sm:hidden md:hidden lg:block ml-2">Discovery</h2>
          </Link>

          <div
            className="m-5 flex justify-center items-center"
            onClick={this.toggleSearch}
          >
            <i className="material-icons lg:mr-2">search</i>
            <h2 className="sm:hidden md:hidden lg:block ml-2">Search</h2>
          </div>

          <Accordion className="w-full mb-5" allowZeroExpanded={true}>
            <AccordionItem className="block">
              <AccordionItemHeading className="flex justify-center items-center">
                <AccordionItemButton className="flex justify-center items-center">
                  <div className="flex flex-row justify-center items-center">
                    <img
                      src="http://pluspng.com/img-png/league-of-legends-png-should-riot-update-the-icon-256.png"
                      alt="LoLSmall"
                      className=" h-8 w-auto block lg:hidden xl:hidden"
                    />
                    <img
                      src="https://www.riotgames.com/darkroom/800/6e3cb0c1ef68c36917c0ebc60e134f69:27e118b555199ad4738eaa74561e3e79/blank-uml-page-2.png"
                      alt="LoL"
                      className="sm:hidden md:hidden lg:block h-20 w-auto"
                    />

                    {/* <div
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
                    </div> */}
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className="mt-1 sm:text-xs">
                <Link to="/poggers/lol/champions">Champions</Link>
              </AccordionItemPanel>
              <AccordionItemPanel className="mt-2 sm:text-xs">
                <Link to="/poggers/lol/leagues">Esports Leagues</Link>
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>

          <Accordion className="w-full mb-5" allowZeroExpanded={true}>
            <AccordionItem className="block">
              <AccordionItemHeading className="flex justify-center items-center">
                <AccordionItemButton className="flex justify-center items-center">
                  <div className="flex flex-row justify-center items-center">
                    <img
                      src="https://icon-library.net/images/overwatch-icon-png/overwatch-icon-png-10.jpg"
                      alt="OWSmall"
                      className=" h-8 w-auto block lg:hidden xl:hidden"
                    />
                    <img
                      src="https://www.sccpre.cat/png/big/0/8839_overwatch-logo-png.png"
                      alt="OW"
                      className="sm:hidden md:hidden lg:block h-16 w-auto"
                    />

                    {/* <div
                      className="flex justify-center items-center"
                      onClick={() => {
                        this.handleExpand();
                      }}
                    >
                      {!this.state.expand_two ? (
                        <i className="material-icons">expand_more</i>
                      ) : (
                        <i className="material-icons">expand_less</i>
                      )}
                    </div> */}
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className="mt-1 sm:text-xs">
                <Link to="/poggers/ow/heroes">Heroes</Link>
              </AccordionItemPanel>
              <AccordionItemPanel className="mt-1 sm:text-xs">
                <Link to="/poggers/ow/maps">Maps</Link>
              </AccordionItemPanel>
              <AccordionItemPanel className="mt-2 sm:text-xs">
                <Link
                  to="/poggers/owl"
                  className="flex justify-center items-center"
                >
                  <img
                    src="https://az571148.vo.msecnd.net/propressroom/Content/Artwork/Eva/BlizzardLive/artwork/2016/11/01231618-6b42da5a-f988-4dac-822d-823140a3c47b/OW_League_Logo_Lockup_light_bkg.png?lightbox=y&ex=2019-08-14+03%3A00%3A00&sky=e4a8e05b9e094f41323539c6eb183c3569e99e41f47eb61f2a447f5a6f67f495"
                    alt="OWL"
                    className="h-auto w-10"
                  />
                  <h1 className="sm:hidden">Overwatch League</h1>
                </Link>
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>

          <Accordion className="w-full" allowZeroExpanded={true}>
            <AccordionItem className="block">
              <AccordionItemHeading className="flex justify-center items-center">
                <AccordionItemButton className="flex justify-center items-center">
                  <div className="flex flex-row justify-center items-center">
                    <img
                      src="https://tchol.org/images/counter-strike-global-offensive-logo-png-6.png"
                      alt="CSSmall"
                      className=" h-10 w-auto block lg:hidden xl:hidden"
                    />
                    <img
                      src="https://www.freepnglogos.com/uploads/counter-strike-png-logo/counter-strike-global-offensive-full-version-png-logo-3.png"
                      alt="CS"
                      className="sm:hidden md:hidden lg:block h-12 w-auto"
                    />

                    {/* <div
                      className="flex justify-center items-center"
                      onClick={() => {
                        this.handleExpand();
                      }}
                    >
                      {!this.state.expand_two ? (
                        <i className="material-icons">expand_more</i>
                      ) : (
                        <i className="material-icons">expand_less</i>
                      )}
                    </div> */}
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className="mt-1 sm:text-xs">
                <Link to="/poggers/csgo/maps">Maps</Link>
              </AccordionItemPanel>
              <AccordionItemPanel className="mt-1 sm:text-xs">
                <Link to="/poggers/csgo/weapons">Weapons</Link>
              </AccordionItemPanel>
              <AccordionItemPanel className="mt-1 sm:text-xs">
                <Link to="/poggers/csgo/matches">Matches</Link>
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
            {user === undefined ? (
              <img
                src="https://i.imgur.com/aSVjtu7.png"
                alt="feelsbadman"
                className="w-10 h-auto rounded-full bg-white lg:mr-2 md:mr-2"
              />
            ) : (
              <img
                src={user[0].profile_img}
                alt="profile_image"
                className="w-10 h-10 rounded-full bg-white lg:mr-2 md:mr-2"
              />
            )}
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
    loggedIn: reduxState.user.loggedIn,
    users: reduxState.user.users
  };
}

export default connect(
  mapStateToProps,
  { requestUserData, fetchLikes, fetchUserPosts, fetchAllUsers }
)(Nav);
