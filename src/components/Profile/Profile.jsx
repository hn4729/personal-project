import React, { Component } from "react";
// import Modal from "react-awesome-modal";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import {
  fetchUserPosts,
  deletePost,
  addOrRemoveLike,
  fetchLikes
} from "../../redux/reducers/postReducer";
import {
  requestUserData,
  fetchFollowing,
  followOrUnfollow,
  fetchAllUsers,
  editProfileImage
} from "../../redux/reducers/userReducer";
import { fetchCommentCount } from "../../redux/reducers/commentReducer";
import CreatePost from "../CreatePost/CreatePost";
import UpdatePost from "../UpdatePost/UpdatePost";
import moment from "moment";
import firebase from "firebase";
import * as serviceAccount from "../../serviceAccount.json";
import "../../App.scss";
import ReactTwitchEmbedVideo from "react-twitch-embed-video";

const storage = firebase.storage();
const profileRef = storage.ref("profile_images");

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      profile_img: ""
    };
  }

  componentDidMount() {
    this.props.fetchUserPosts(this.props.match.params.gamertag);
    this.props.fetchLikes();
    this.props.fetchFollowing();
    this.props.fetchAllUsers();
    this.props.fetchCommentCount();
  }

  handleProfileChange = event => {
    const file = event.target.files[0];
    const uploadTask = profileRef.child(file.name).put(file);
    uploadTask.then(() => {
      profileRef
        .child(file.name)
        .getDownloadURL()
        .then(url => this.setState({ profile_img: url }));
    });
  };

  checkUploadResult = resultEvent => {
    if (resultEvent.event === "success") {
      this.setState({ profile_img: resultEvent.info.secure_url });
      this.props.editProfileImage(resultEvent.info.secure_url);
      this.props.fetchAllUsers();
      this.props.requestUserData();
    }
  };

  render() {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: serviceAccount.cloud_name,
        uploadPreset: serviceAccount.upload_preset,
        sources: ["local", "url", "dropbox", "facebook", "instagram"]
      },
      (error, result) => {
        this.checkUploadResult(result);
      }
    );

    const { loading, userPosts, likes, users, commentCounts } = this.props;
    // console.log(this.props.following);
    let isFollowing;
    if (this.props.following !== undefined) {
      isFollowing = this.props.following.filter(
        following => following.gamertag === this.props.match.params.gamertag
      );
      // console.log(isFollowing);
    }

    let user;
    if (users !== undefined && users.length > 0) {
      user = users.filter(
        user => user.gamertag === this.props.match.params.gamertag
      );
    }

    return (
      <div className="feed flex flex-col w-7/12 text-grey bg-gray-400 overflow-auto sm:w-10/12 md:w-10/12">
        <div className="title flex justify-left items-center mb-5">
          <h1 className="m-2 text-2xl font-bold">
            {this.props.match.params.gamertag}
          </h1>
        </div>

        {user && !user[0].profile_img && (
          <div className="flex justify-center items-center">
            <img
              src="https://i.imgur.com/aSVjtu7.png"
              alt="poggers"
              className="h-auto w-32 mb-3 rounded-full bg-white"
            />
          </div>
        )}

        {user && user[0].profile_img && (
          <div className="flex justify-center items-center">
            <img
              src={user[0].profile_img}
              alt="profile_image"
              className="mb-3 shadow-xl bg-white rounded-full w-40 h-40 sm:w-32 sm:h-32"
            />
          </div>
        )}

        {this.props.gamertag === this.props.match.params.gamertag ? (
          <div className="flex flex-col justify-center items-center">
            <label>
              <i
                className="material-icons m-2 cursor-pointer hover:text-green-400"
                onClick={() => {
                  widget.open();
                }}
              >
                insert_photo
              </i>
            </label>
          </div>
        ) : null}

        <div className="flex flex-col justify-center items-center text-grey mb-5">
          {this.props.gamertag !== this.props.match.params.gamertag &&
          isFollowing !== undefined &&
          isFollowing.length === 0 ? (
            <button
              className="text-grey px-4 py-2 text-lg m-3 bg-green-400 hover:bg-green-200 rounded-full shadow-md"
              onClick={() => {
                this.props.followOrUnfollow(this.props.match.params.gamertag);
                this.props.fetchFollowing();
              }}
            >
              Follow
            </button>
          ) : this.props.gamertag !== this.props.match.params.gamertag &&
            isFollowing !== undefined &&
            isFollowing.length > 0 ? (
            <button
              className="text-grey font-semibold px-4 py-2 text-lg m-3 bg-green-400 hover:bg-green-200 rounded-full shadow-md"
              onClick={() => {
                this.props.followOrUnfollow(this.props.match.params.gamertag);
                this.props.fetchFollowing();
              }}
            >
              Unfollow
            </button>
          ) : null}
        </div>
        {this.props.gamertag === this.props.match.params.gamertag ? (
          <CreatePost profileGamertag={this.props.match.params.gamertag} />
        ) : null}

        <div className="flex flex-col justify-center items-center">
          {loading ? (
            // <h1 className="font-bold text-5xl">Loading...</h1>
            <img
              src="https://66.media.tumblr.com/272c919c22e3122bced152a8487c1ad8/tumblr_o51rkmjmjp1ujw6zko1_400.gif"
              alt="pepe"
              className="h-40 w-auto"
            />
          ) : (
            userPosts.map(post => {
              const {
                post_id,
                gamertag,
                profile_img,
                date,
                game,
                content_text,
                image_url,
                user_id,
                video_url
              } = post;

              const postLike = likes.filter(post => post.post_id === post_id);

              let likeCount;

              if (postLike[0] === undefined) {
                likeCount = 0;
              } else {
                likeCount = +postLike[0].count;
              }

              const postCommentCount = commentCounts.filter(
                post => post.post_id === post_id
              );
              let commentCount;
              if (postCommentCount[0] === undefined) {
                commentCount = 0;
              } else {
                commentCount = +postCommentCount[0].count;
              }

              let findTwitch = "";
              let arr;
              if (content_text && content_text.includes("twitch.tv")) {
                arr = content_text.split("/");
                findTwitch = arr[arr.length - 1];
              }

              return (
                <div
                  className="flex flex-col justify-center items-center mb-5"
                  key={post_id}
                >
                  <div className="max-w-lg rounded overflow-hidden shadow-lg bg-darkgrey">
                    <div className="px-6 py-4 bg-white text-grey flex flex-row justify-between items-center">
                      <div className="flex justify-center items-center">
                        <Link to={`/poggers/user/${gamertag}`} className="mr-2">
                          {profile_img ? (
                            <img
                              src={profile_img}
                              alt="profile_image"
                              className="w-16 h-16 rounded-full bg-white"
                            />
                          ) : (
                            <img
                              src="https://i.imgur.com/aSVjtu7.png"
                              alt="feelsbadman"
                              className="w-16 h-auto rounded-full bg-white"
                            />
                          )}
                        </Link>
                        <Link
                          to={`/poggers/user/${gamertag}`}
                          className="font-semibold mr-2"
                        >
                          {gamertag}
                        </Link>
                      </div>
                      <span className="bg-grey rounded-full px-3 py-1 text-sm font-semibold text-white sm:text-xs">
                        {moment(date).fromNow()}
                      </span>
                    </div>
                    {image_url !== "" ? (
                      <img
                        className="w-full"
                        src={image_url}
                        alt={`${gamertag} ${post_id}`}
                      />
                    ) : null}
                    {video_url !== "" ? (
                      <ReactPlayer
                        controls
                        playing={false}
                        url={video_url}
                        width="100%"
                        height="auto"
                      />
                    ) : null}
                    {findTwitch.length > 0 ? (
                      <ReactTwitchEmbedVideo
                        channel={findTwitch}
                        layout="video"
                        height="375px"
                        width="100%"
                      />
                    ) : null}

                    <div className="px-6 py-4 bg-white">
                      <p className="text-grey text-base bg-white">
                        {content_text}
                      </p>
                    </div>
                    <div className="px-6 py-4 bg-white flex sm:flex-col justify-between items-center">
                      <span className="bg-grey rounded-full px-3 py-1 text-sm font-semibold text-white md:mr-2 lg:mr-2 sm:mb-2">
                        {game}
                      </span>
                      <div className="flex justify-around items-center w-5/12 sm:mb-2">
                        <div className="flex mr-2">
                          <Link
                            to={`/poggers/post/${post_id}`}
                            className="material-icons text-grey cursor-pointer mr-2 hover:text-green-400"
                          >
                            mode_comment
                          </Link>
                          <span className="text-grey mr-2">{commentCount}</span>
                        </div>
                        <div className="flex justify-bottom md:mr-2 lg:mr-2">
                          <i
                            className="material-icons text-grey cursor-pointer mr-2 hover:text-green-400"
                            onClick={() => {
                              this.props.addOrRemoveLike(post_id);
                              this.props.fetchLikes();
                            }}
                          >
                            thumb_up
                          </i>
                          <span className="text-grey md:mr-2 lg:mr-2">
                            {likeCount}
                          </span>
                        </div>
                      </div>

                      {gamertag === this.props.gamertag ? (
                        <div className="flex justify-center items-center">
                          <UpdatePost
                            gamertag={gamertag}
                            date={date}
                            image_url={image_url}
                            post_id={post_id}
                            content_text={content_text}
                            game={game}
                            video_url={video_url}
                            fetchGamertag={gamertag}
                          />

                          <i
                            className="material-icons text-grey cursor-pointer hover:text-green-400"
                            onClick={() => {
                              this.props.deletePost(post_id);
                              this.props.fetchUserPosts(
                                this.props.match.params.gamertag
                              );
                            }}
                          >
                            delete
                          </i>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    userPosts: reduxState.postReducer.userPosts,
    loading: reduxState.postReducer.loading,
    likes: reduxState.postReducer.likes,
    gamertag: reduxState.user.gamertag,
    id: reduxState.user.id,
    games: reduxState.games.games,
    following: reduxState.user.following,
    users: reduxState.user.users,
    commentCounts: reduxState.commentReducer.commentCounts
  };
}

export default connect(
  mapStateToProps,
  {
    fetchUserPosts,
    requestUserData,
    deletePost,
    addOrRemoveLike,
    fetchLikes,
    fetchFollowing,
    followOrUnfollow,
    fetchAllUsers,
    editProfileImage,
    fetchCommentCount
  }
)(Profile);
