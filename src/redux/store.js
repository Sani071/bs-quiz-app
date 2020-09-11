import { createStore, applyMiddleware, compose } from "redux";
import Reducer from "./reducers/rootReducer";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(Reducer, composeEnhancer(applyMiddleware(thunk)));
