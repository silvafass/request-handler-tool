import { combineReducers } from 'redux';

import {
  DEFAULT_ACTION
} from './actions';

function defaultAction(state = {}, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return action.test;
    default:
      return state;
  }
}

const requestHandlerApp = combineReducers({
  defaultAction
});

export default requestHandlerApp;
