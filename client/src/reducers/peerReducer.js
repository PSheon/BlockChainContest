import { SET_PEER } from '../actions/types';

const initState = {
  peers: []
}

export default function(state = initState, action) {
  switch(action.type) {
  case SET_PEER:
    return { ...state, peers: action.payload };
  }

  return state;
}