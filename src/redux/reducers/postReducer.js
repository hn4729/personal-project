import axios from "axios";

const initialState = {
  loading: false,
  posts: []
};

const FETCH_ALL_POSTS = "GET_ALL_POSTS";

export const fetchAllPosts = () => {
  return {
    type: FETCH_ALL_POSTS,
    payload: axios
      .get("/posts")
      .then(res => res.data)
      .catch(error => console.log(error))
  };
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ALL_POSTS + "_PENDING":
      return { ...state, loading: true };
    case FETCH_ALL_POSTS + "_FULFILLED":
      return { ...state, loading: false, posts: payload };
    default:
      return state;
  }
}
