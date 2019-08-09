import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { connect } from "react-redux";
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
      <div className="flex flex-col w-7/12 text-white bg-grey overflow-auto sm:w-10/12 md:w-10/12">
        <div>
          <div
            className="border-solid border-2 border-darkgrey flex justify-left items-center mb-5 cursor-pointer"
            onClick={() => {
              this.props.history.goBack();
            }}
          >
            <i className="material-icons m-2 text-2xl font-bold">
              arrow_back_ios
            </i>
            <h1 className="m-2 text-2xl font-bold">Feed</h1>
          </div>
          <div className="flex flex-col justify-center items-center">
            {loading ? (
              <h1 className="font-bold text-5xl">Loading...</h1>
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
                    <div className="max-w-lg rounded overflow-hidden shadow-lg bg-darkgrey">
                      <div className="px-6 py-4 bg-white text-grey flex flex-row justify-center items-center">
                        <h1 className="font-semibold mr-2">{gamertag}</h1>
                        <span className="bg-grey rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">
                          {date}
                        </span>
                      </div>
                      {image_url !== "" ? (
                        <img
                          className="w-full"
                          src={image_url}
                          alt={`${gamertag} ${post_id}`}
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
                          <div className="flex mr-2">
                            <i className="material-icons text-grey cursor-pointer mr-2">
                              mode_comment
                            </i>
                            <span className="text-grey mr-2">
                              {commentCount}
                            </span>
                          </div>
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
                    className="bg-white text-grey rounded justify-center items-center pb-2 pt-2 mb-5 w-1/2"
                    key={comment_id}
                  >
                    <div className="flex flex-row justify-start items-center w-full">
                      <div className="flex flex-col justify-center items-center">
                        <h1 className="mb-3">Profile Image</h1>
                        <h1>{gamertag}</h1>
                      </div>
                      <div className="px-6 py-4 bg-white flex flex-col flex-grow">
                        <div className="flex flex-row justify-start items-center mb-5">
                          <p className="text-grey text-base bg-white">
                            {comment_text}
                          </p>
                        </div>
                        {gamertag === this.props.gamertag ? (
                          <div className="flex justify-end items-center">
                            <UpdateComment
                              comment_id={comment_id}
                              gamertag={gamertag}
                              comment_text={comment_text}
                              giphy={giphy}
                              date={date}
                              profile_img={profile_img}
                              post_id={post_id}
                            />
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
