import { createStore, applyMiddleware, combineReducers } from "redux";
import promise from "redux-promise-middleware";
import userReducer from "./reducers/userReducer";
import postReducer from "./reducers/postReducer";
import gamesReducer from "./reducers/gameReducer";
import commentReducer from "./reducers/commentReducer";
import lolReducer from "./reducers/lolReducer";

const rootReducer = combineReducers({
  user: userReducer,
  postReducer,
  games: gamesReducer,
  commentReducer,
  lol: lolReducer
});

export default createStore(rootReducer, applyMiddleware(promise));
