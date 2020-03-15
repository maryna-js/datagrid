import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";

import rootReducer from "../reducers/index";

export const history = createHistory();

export default function setStore(initialState) {
  const state = {
    ...initialState
  };

  const middleware = [thunk, routerMiddleware(history)];

  const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
      : compose;

  const composedEnhancers = compose(applyMiddleware(...middleware));

  const store = createStore(rootReducer, state, composedEnhancers);

  return store;
}