import axios from "axios";

const initialState = {
  games: []
};

const FETCH_GAMES = "FETCH_GAMES";

export const fetchGames = () => {
  return {
    type: FETCH_GAMES,
    payload: axios
      .get("/api/games")
      .then(res => res.data)
      .catch(error => console.log(error))
  };
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_GAMES + "_FULFILLED":
      return { games: payload };
    default:
      return state;
  }
}
