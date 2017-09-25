import {createStore, applyMiddleware, compose} from 'redux';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { browserHistory } from "react-router";

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, reduxImmutableStateInvariant(), routerMiddleware(browserHistory), createLogger()),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}
