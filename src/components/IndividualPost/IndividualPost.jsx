import React, { Component } from "react";
import "../../App.scss";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import moment from "moment";
import {
  deletePost,
  addOrRemoveLike,
  fetchLikes,
  fetchIndividualPost
} from "../../redux/reducers/postReducer";
import { requestUserData } from "../../redux/reducers/userReducer";
import {
  fetchComments,
  updateComment,
  deleteComment,
  fetchCommentCount
} from "../../redux/reducers/commentReducer";

import UpdatePost from "../UpdatePost/UpdatePost";
import CreateComment from "../CreateComment/CreateComment";
import UpdateComment from "../UpdateComment/UpdateComment";

class IndividualPost extends Component {
  componentDidMount() {
    this.props.fetchIndividualPost(this.props.match.params.id);
    this.props.fetchLikes();
    this.props.fetchComments(this.props.match.params.id);
    this.props.fetchCommentCount();
  }

  render() {
    const {
      commentsLoading,
      comments,
      loading,
      individualPost,
      likes,
      commentCounts
    } = this.props;

    return (
      <div className="feed flex flex-col w-7/12 text-grey bg-gray-400 overflow-auto sm:w-10/12 md:w-10/12">
        <div>
          <div
            className="title flex justify-left items-center mb-5 cursor-pointer"
            onClick={() => {
              this.props.history.goBack();
            }}
          >
            <i className="material-icons m-2 text-2xl font-bold">
              arrow_back_ios
            </i>
            <h1 className="text-2xl font-bold">Go Back</h1>
          </div>
          <div className="flex flex-col justify-center items-center">
            {loading ? (
              // <h1 className="font-bold text-5xl">Loading...</h1>
              <img
                src="https://66.media.tumblr.com/272c919c22e3122bced152a8487c1ad8/tumblr_o51rkmjmjp1ujw6zko1_400.gif"
                alt="pepe"
                className="h-64 w-auto m-5"
              />
            ) : (
              individualPost.map(post => {
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

                return (
                  <div
                    className="flex flex-col justify-center items-center mb-5"
                    key={post_id}
                  >
                    <div className="max-w-lg sm:w-11/12 rounded overflow-hidden shadow-lg bg-darkgrey">
                      <div className="px-6 py-4 bg-white text-grey flex flex-row justify-between items-center">
                        <div className="flex justify-center items-center">
                          <Link
                            to={`/poggers/user/${gamertag}`}
                            className="mr-2"
                          >
                            {profile_img ? (
                              <img
                                src={profile_img}
                                alt="profile_image"
                                className="w-16 h-auto rounded-full bg-white"
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
                            <i className="material-icons text-grey cursor-pointer mr-2">
                              mode_comment
                            </i>
                            <span className="text-grey mr-2">
                              {commentCount}
                            </span>
                          </div>
                          <div className="flex justify-bottom md:mr-2 lg:mr-2">
                            <i
                              className="material-icons text-grey cursor-pointer mr-2"
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
                              profile_img={profile_img}
                              video_url={video_url}
                              fetchPostID={this.props.match.params.id}
                            />

                            <i
                              className="material-icons text-grey cursor-pointer"
                              onClick={() => {
                                this.props.deletePost(post_id);
                                this.props.history.goBack();
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
            <CreateComment post_id={this.props.match.params.id} />
            {commentsLoading ? (
              <h1 className="font-bold text-5xl">Loading...</h1>
            ) : (
              comments.map(comment => {
                const {
                  comment_text,
                  comment_id,
                  date,
                  gamertag,
                  giphy,
                  post_id,
                  profile_img,
                  user_id
                } = comment;
                return (
                  <div
                    className="bg-white text-grey rounded justify-center items-center py-4 px-4 mb-5 w-1/2 sm:w-11/12"
                    key={comment_id}
                  >
                    <div className="flex flex-row justify-start items-center w-full">
                      <div className="flex flex-col justify-start items-center">
                        <Link to={`/poggers/user/${gamertag}`} className="mb-2">
                          {profile_img ? (
                            <img
                              src={profile_img}
                              alt="profile_image"
                              className="w-16 h-auto rounded-full bg-white"
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
                          className="font-semibold"
                        >
                          {gamertag}
                        </Link>
                      </div>
                      <div className="px-2 bg-white flex flex-col flex-grow">
                        {giphy === "" ? (
                          <div className="flex flex-row justify-start items-center mb-5">
                            <p className="text-grey text-base bg-white">
                              {comment_text}
                            </p>
                          </div>
                        ) : (
                          <div className="flex flex-row justify-center items-center mb-5">
                            <img src={giphy} alt={giphy} />
                          </div>
                        )}
                        <div className="flex justify-end items-center">
                          <span className="bg-grey rounded-full px-3 py-1 text-sm font-semibold text-white sm:text-xs">
                            {moment(date).fromNow()}
                          </span>{" "}
                          {gamertag === this.props.gamertag ? (
                            <div className="flex justify-end items-center ml-2">
                              {giphy === "" ? (
                                <UpdateComment
                                  comment_id={comment_id}
                                  gamertag={gamertag}
                                  comment_text={comment_text}
                                  giphy={giphy}
                                  date={date}
                                  profile_img={profile_img}
                                  post_id={post_id}
                                />
                              ) : null}
                              <i
                                className="material-icons cursor-pointer"
                                onClick={() => {
                                  this.props.deleteComment(comment_id);
                                  this.props.fetchComments(post_id);
                                  this.props.fetchCommentCount();
                                }}
                              >
                                delete
                              </i>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    individualPost: reduxState.postReducer.individualPost,
    individualPostID: reduxState.postReducer.individualPostID,
    loading: reduxState.postReducer.loading,
    likes: reduxState.postReducer.likes,
    gamertag: reduxState.user.gamertag,
    id: reduxState.user.id,
    games: reduxState.games.games,
    commentsLoading: reduxState.commentReducer.loading,
    comments: reduxState.commentReducer.comments,
    commentCounts: reduxState.commentReducer.commentCounts
  };
}

export default connect(
  mapStateToProps,
  {
    deletePost,
    addOrRemoveLike,
    fetchLikes,
    fetchIndividualPost,
    requestUserData,
    fetchComments,
    deleteComment,
    updateComment,
    fetchCommentCount
  }
)(IndividualPost);
