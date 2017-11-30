import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import blockChainReducer from './blockChainReducer';
import peerReducer from './peerReducer';
import einReducer from './einReducer';
import pageReducer from './pageReducer';

export default combineReducers({
  ein: einReducer,
  peer: peerReducer,
  block: blockChainReducer,
  page: pageReducer,
  form
});