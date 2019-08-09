import axios from "axios";

const initialState = {
  loading: false,
  comments: [],
  commentCounts: []
};

const FETCH_COMMENTS = "FETCH_COMMENTS";
const ADD_COMMENT = "ADD_COMMENT";
const UPDATE_COMMENT = "UPDATE_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";
const FETCH_COMMENT_COUNT = "FETCH_COMMENT_COUNT";

export const fetchComments = post_id => {
  return {
    type: FETCH_COMMENTS,
    payload: axios.get(`/post/comments/${post_id}`).then(res => res.data)
  };
};

export const addComment = (post_id, comment_text, giphy) => {
  axios.post(`/post/comment/${post_id}`, { comment_text, giphy });
  return {
    type: ADD_COMMENT
  };
};

export const updateComment = (id, comment_text, giphy) => {
  axios.put(`/post/comment/${id}`, { comment_text, giphy });
  return {
    type: UPDATE_COMMENT
  };
};

export const deleteComment = id => {
  axios.delete(`/post/comment/${id}`);
  return {
    type: DELETE_COMMENT
  };
};

export const fetchCommentCount = () => {
  return {
    type: FETCH_COMMENT_COUNT,
    payload: axios.get("/comments/count").then(res => res.data)
  };
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_COMMENTS + "_PENDING":
      return { ...state, loading: true };
    case FETCH_COMMENTS + "_FULFILLED":
      return { ...state, loading: false, comments: payload };
    case ADD_COMMENT + "_PENDING":
      return { ...state, loading: true };
    case ADD_COMMENT + "_FULFILLED":
      return { ...state, loading: false };
    case UPDATE_COMMENT + "_PENDING":
      return { ...state, loading: true };
    case UPDATE_COMMENT + "_FULFILLED":
      return { ...state, loading: false };
    case DELETE_COMMENT + "_PENDING":
      return { ...state, loading: true };
    case DELETE_COMMENT + "_FULFILLED":
      return { ...state, loading: false };
    case FETCH_COMMENT_COUNT + "_FULFILLED":
      return { ...state, loading: false, commentCounts: payload };
    default:
      return state;
  }
}
