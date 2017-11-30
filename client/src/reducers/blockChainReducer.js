import { SET_BLOCKCHAIN } from '../actions/types';

const initState = {
  blocks: []
}

export default function(state = initState, action) {
  switch(action.type) {
  case SET_BLOCKCHAIN:
    return { ...state, blocks: action.payload };
  }

  return state;
}