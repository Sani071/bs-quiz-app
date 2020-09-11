import { combineReducers } from "redux";
import auth from "./authReducer";
import quiz from "./quizeducer";

export default combineReducers({
  auth,
  quiz
});