import axios from "axios";

const initialState = {
  loading: false,
  posts: [],
  likes: [],
  individualPost: [],
  userPosts: []
};

const FETCH_ALL_POSTS = "GET_ALL_POSTS";
const DELETE_POST = "DELETE_POST";
const CREATE_POST = "CREATE_POST";
const UPDATE_POST = "UPDATE_POST";
const ADD_REMOVE_LIKE = "ADD_REMOVE_LIKE";
const FETCH_LIKES = "FETCH_LIKES";
const FETCH_INDIVIDUAL_POST = "FETCH_INDIVIDUAL_POST";
const FETCH_USER_POSTS = "FETCH_USER_POSTS";

export const fetchAllPosts = () => {
  return {
    type: FETCH_ALL_POSTS,
    payload: axios
      .get("/posts")
      .then(res => res.data)
      .catch(error => console.log(error))
  };
};

export const createPost = (image_url, video_url, game, content_text) => {
  axios.post("/posts", { image_url, video_url, game, content_text });

  return {
    type: CREATE_POST
  };
};

export const deletePost = id => {
  axios.delete(`/posts/${id}`);
  return {
    type: DELETE_POST
  };
};

export const updatePost = (game, image_url, video_url, content_text, id) => {
  axios.put(`/posts/${id}`, { game, image_url, video_url, content_text });
  return {
    type: UPDATE_POST
  };
};

export const addOrRemoveLike = post_id => {
  axios.post(`/like/post/${post_id}`);
  return {
    type: ADD_REMOVE_LIKE
  };
};

export const fetchLikes = () => {
  return {
    type: FETCH_LIKES,
    payload: axios.get("/likes/posts").then(res => res.data)
  };
};

export const fetchIndividualPost = id => {
  return {
    type: FETCH_INDIVIDUAL_POST,
    payload: axios.get(`/post/${id}`).then(res => res.data)
  };
};

export const fetchUserPosts = gamertag => {
  return {
    type: FETCH_USER_POSTS,
    payload: axios.get(`/posts/user/${gamertag}`).then(res => res.data)
  };
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ALL_POSTS + "_PENDING":
      return { ...state, loading: false };
    case FETCH_ALL_POSTS + "_FULFILLED":
      return { ...state, loading: false, posts: payload };
    case CREATE_POST + "_PENDING":
      return { ...state, loading: true };
    case CREATE_POST + "_FULFILLED":
      return { ...state, loading: false };
    case DELETE_POST + "_PENDING":
      return { ...state, loading: true };
    case DELETE_POST + "_FULFILLED":
      return { ...state, loading: false };
    case UPDATE_POST + "_PENDING":
      return { ...state, loading: true };
    case UPDATE_POST + "_FULFILLED":
      return { ...state, loading: false };
    case ADD_REMOVE_LIKE + "_FULFILLED":
      return { ...state, loading: false };
    case FETCH_LIKES + "_FULFILLED":
      return { ...state, loading: false, likes: payload };
    case FETCH_INDIVIDUAL_POST + "_PENDING":
      return { ...state, loading: true };
    case FETCH_INDIVIDUAL_POST + "_FULFILLED":
      return { ...state, loading: false, individualPost: payload };
    case FETCH_USER_POSTS + "_PENDING":
      return { ...state, loading: true };
    case FETCH_USER_POSTS + "_FULFILLED":
      return { ...state, loading: false, userPosts: payload };
    default:
      return state;
  }
}
