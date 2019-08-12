import axios from "axios";

const initialState = {
  id: null,
  username: "",
  gamertag: "",
  profile_img: null,
  loggedIn: false,
  following: []
};

const GET_USER_DATA = "GET_USER_DATA";
const IS_LOGGED_IN = "IS_LOGGED_IN";
const FETCH_FOLLOWING = "FETCH_FOLLOWING";
const FOLLOW_UNFOLLOW = "FOLLOW_UNFOLLOW";

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

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_DATA + "_FULFILLED":
      const { id, username, gamertag, profile_img } = payload.user;
      return {
        id,
        username,
        gamertag,
        profile_img,
        loggedIn: true
      };
    case FETCH_FOLLOWING + "_FULFILLED":
      return { ...state, following: payload };
    case FOLLOW_UNFOLLOW + "_FULFILLED":
      return { ...state };
    default:
      return state;
  }
}
