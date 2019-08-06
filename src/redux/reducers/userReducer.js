import axios from "axios";

const initialState = {
  id: null,
  username: "",
  gamertag: "",
  profile_img: null,
  loggedIn: false
};

const GET_USER_DATA = "GET_USER_DATA";
const IS_LOGGED_IN = "IS_LOGGED_IN";

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

    default:
      return state;
  }
}
