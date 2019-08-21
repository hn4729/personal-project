import axios from "axios";

const initialState = {
  id: null,
  username: "",
  gamertag: "",
  profile_img: null,
  loggedIn: false,
  following: [],
  users: []
};

const GET_USER_DATA = "GET_USER_DATA";
const IS_LOGGED_IN = "IS_LOGGED_IN";
const FETCH_FOLLOWING = "FETCH_FOLLOWING";
const FOLLOW_UNFOLLOW = "FOLLOW_UNFOLLOW";
const FETCH_ALL_USERS = "FETCH_ALL_USERS";
const EDIT_PROFILE_IMG = "EDIT_PROFILE_IMG";

export const requestUserData = () => {
  let data = axios.get("auth/user-data").then(res => res.data);
  return {
    type: GET_USER_DATA,
    payload: data
  };
};

export const isLoggedIn = () => {
  return {
    type: IS_LOGGED_IN
  };
};

export const fetchFollowing = () => {
  return {
    type: FETCH_FOLLOWING,
    payload: axios.get("/users/following").then(res => res.data)
  };
};

export const followOrUnfollow = gamertag => {
  axios.post(`/user/${gamertag}`);
  return {
    type: FOLLOW_UNFOLLOW
  };
};

export const fetchAllUsers = () => {
  return {
    type: FETCH_ALL_USERS,
    payload: axios.get("/poggers/users").then(res => res.data)
  };
};

export const editProfileImage = profile_img => {
  axios.put("/poggers/user/profile_image", { profile_img });
  return {
    type: EDIT_PROFILE_IMG
  };
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_DATA + "_FULFILLED":
      const { id, username, gamertag, profile_img } = payload.user;
      return {
        id,
        username,
        gamertag,
        profile_img
      };
    case FETCH_FOLLOWING + "_FULFILLED":
      return { ...state, following: payload };
    case FOLLOW_UNFOLLOW + "_FULFILLED":
      return { ...state };
    case FETCH_ALL_USERS + "_FULFILLED":
      return { ...state, users: payload };
    case EDIT_PROFILE_IMG + "_FULFILLED":
      return { ...state };
    case IS_LOGGED_IN:
      return { ...state, loggedIn: true };
    default:
      return state;
  }
}
