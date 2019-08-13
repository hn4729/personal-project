import React, { Component } from "react";
// import Modal from "react-awesome-modal";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchAllPosts,
  deletePost,
  addOrRemoveLike,
  fetchLikes
} from "../../redux/reducers/postReducer";
import {
  requestUserData,
  fetchFollowing
} from "../../redux/reducers/userReducer";
import { fetchCommentCount } from "../../redux/reducers/commentReducer";
import CreatePost from "../CreatePost/CreatePost";
import UpdatePost from "../UpdatePost/UpdatePost";

class PersonalFeed extends Component {
  componentDidMount() {
    this.props.fetchAllPosts();
    this.props.fetchLikes();
    this.props.fetchCommentCount();
    this.props.fetchFollowing();
  }

  render() {
    const { loading, posts, likes, commentCounts, following } = this.props;
    // console.log(following);
    let isFollowing;
    if (following) {
      isFollowing = following.map(follow => follow.gamertag);
      const uniqueSet = new Set(isFollowing);
      isFollowing = [...uniqueSet];
      // console.log(isFollowing);
    }
    return (
      <div className="flex flex-col w-7/12 text-white bg-grey overflow-auto sm:w-10/12 md:w-10/12">
        <div className="border-solid border-2 border-darkgrey flex justify-left items-center mb-5">
          <h1 className="m-2 text-2xl font-bold">Personal Feed</h1>
        </div>

        <CreatePost />

        <div className="flex flex-col justify-center items-center">
          {loading ? (
            <h1 className="font-bold text-5xl">Loading...</h1>
          ) : (
            posts
              .filter(post => {
                if (isFollowing) {
                  return isFollowing.includes(post.gamertag);
                } else {
                  return post;
                }
              })
              .map(post => {
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
                        <Link
                          to={`/poggers/user/${gamertag}`}
                          className="font-semibold mr-2"
                        >
                          {gamertag}
                        </Link>
                        <span className="bg-grey rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">
                          {date}
                        </span>
                      </div>
                      {image_url !== "" ? (
                        <Link
                          to={`/poggers/post/${post_id}`}
                          className="w-full"
                        >
                          <img
                            className="w-full"
                            src={image_url}
                            alt={`${gamertag} ${post_id}`}
                          />
                        </Link>
                      ) : null}

                      <Link to={`/poggers/post/${post_id}`}>
                        <div className="px-6 py-4 bg-white">
                          <p className="text-grey text-base bg-white">
                            {content_text}
                          </p>
                        </div>
                      </Link>
                      <div className="px-6 py-4 bg-white flex justify-between items-center">
                        <span className="bg-grey rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">
                          {game}
                        </span>
                        <div className="flex justify-around items-center w-5/12">
                          <div className="flex mr-2">
                            <Link
                              to={`/poggers/post/${post_id}`}
                              className="material-icons text-grey cursor-pointer mr-2"
                            >
                              mode_comment
                            </Link>
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
                            />

                            <i
                              className="material-icons text-grey cursor-pointer"
                              onClick={() => {
                                this.props.deletePost(post_id);
                                this.props.fetchAllPosts();
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
    posts: reduxState.postReducer.posts,
    loading: reduxState.postReducer.loading,
    likes: reduxState.postReducer.likes,
    gamertag: reduxState.user.gamertag,
    id: reduxState.user.id,
    games: reduxState.games.games,
    commentCounts: reduxState.commentReducer.commentCounts,
    following: reduxState.user.following
  };
}

export default connect(
  mapStateToProps,
  {
    fetchAllPosts,
    requestUserData,
    deletePost,
    addOrRemoveLike,
    fetchLikes,
    fetchCommentCount,
    fetchFollowing
  }
)(PersonalFeed);