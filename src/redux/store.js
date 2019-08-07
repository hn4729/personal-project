import { createStore, applyMiddleware, combineReducers } from "redux";
import promise from "redux-promise-middleware";
import userReducer from "./reducers/userReducer";
import postReducer from "./reducers/postReducer";
import gamesReducer from "./reducers/gameReducer";

const rootReducer = combineReducers({
  user: userReducer,
  postReducer,
  games: gamesReducer
});

export default createStore(rootReducer, applyMiddleware(promise));
