import { SET_PEER, SET_PEER_DETAIL, INIT_AUTO_RECEIVER } from '../actions/types';

const initState = {
  peers: [],
  peerDetailList: [],
  autoReceiver: {}
}

export default function(state = initState, action) {
  switch(action.type) {
  case SET_PEER:
    return { ...state, peers: action.payload };
  case SET_PEER_DETAIL:
    return { ...state, peerDetailList: action.payload };
  case INIT_AUTO_RECEIVER:
    return { ...state, autoReceiver: action.payload }
  }

  return state;
}