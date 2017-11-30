import { SET_PAGE_INDEX } from '../actions/types';

const initState = {
  index: 0
}

export default function(state = initState, action) {
  switch(action.type) {
  case SET_PAGE_INDEX:
    return { ...state, index: action.payload };
  }

  return state;
}