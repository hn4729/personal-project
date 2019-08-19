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
  followOrUnfollow
} from "../../redux/reducers/userReducer";
import CreatePost from "../CreatePost/CreatePost";
import UpdatePost from "../UpdatePost/UpdatePost";
import moment from "moment";

class Profile extends Component {
  componentDidMount() {
    this.props.fetchUserPosts(this.props.match.params.gamertag);
    this.props.fetchLikes();
    this.props.fetchFollowing();
  }

  render() {
    const { loading, userPosts, likes } = this.props;
    // console.log(this.props.following);
    let isFollowing;
    if (this.props.following !== undefined) {
      isFollowing = this.props.following.filter(
        following => following.gamertag === this.props.match.params.gamertag
      );
      // console.log(isFollowing);
    }
    return (
      <div className="flex flex-col w-7/12 text-white bg-grey overflow-auto sm:w-10/12 md:w-10/12">
        <div className="border-solid border-2 border-darkgrey flex justify-left items-center mb-5">
          <h1 className="m-2 text-2xl font-bold">Profile</h1>
        </div>

        {this.props.gamertag === this.props.match.params.gamertag ? (
          <CreatePost profileGamertag={this.props.match.params.gamertag} />
        ) : null}

        <div className="flex flex-col justify-center items-center bg-grey text-white mb-5">
          <h1>{this.props.match.params.gamertag}</h1>
          {this.props.gamertag !== this.props.match.params.gamertag &&
          isFollowing !== undefined &&
          isFollowing.length === 0 ? (
            <button
              className="text-grey bg-white w-20"
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
              className="text-grey bg-white w-20"
              onClick={() => {
                this.props.followOrUnfollow(this.props.match.params.gamertag);
                this.props.fetchFollowing();
              }}
            >
              Unfollow
            </button>
          ) : null}
        </div>

        <div className="flex flex-col justify-center items-center">
          {loading ? (
            <h1 className="font-bold text-5xl">Loading...</h1>
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

              return (
                <div
                  className="flex flex-col justify-center items-center mb-5"
                  key={post_id}
                >
                  <div className="max-w-lg rounded overflow-hidden shadow-lg bg-darkgrey">
                    <div className="px-6 py-4 bg-white text-grey flex flex-row justify-center items-center">
                      <h1 className="font-semibold mr-2">{gamertag}</h1>
                      <span className="bg-grey rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">
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

                    <div className="px-6 py-4 bg-white">
                      <p className="text-grey text-base bg-white">
                        {content_text}
                      </p>
                    </div>
                    <div className="px-6 py-4 bg-white flex justify-between items-center">
                      <span className="bg-grey rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">
                        {game}
                      </span>
                      <div className="flex justify-around items-center w-5/12">
                        <Link
                          to={`/poggers/post/${post_id}`}
                          className="material-icons text-grey cursor-pointer"
                        >
                          mode_comment
                        </Link>
                        <div className="flex justify-bottom mr-2">
                          <i
                            className="material-icons text-grey cursor-pointer mr-2"
                            onClick={() => {
                              this.props.addOrRemoveLike(post_id);
                              this.props.fetchLikes();
                            }}
                          >
                            thumb_up
                          </i>
                          <span className="text-grey mr-2">{likeCount}</span>
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
                            fetchGamertag={gamertag}
                          />

                          <i
                            className="material-icons text-grey cursor-pointer"
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
    following: reduxState.user.following
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
    followOrUnfollow
  }
)(Profile);
