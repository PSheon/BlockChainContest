import { EIN_USER, DEEIN_USER } from '../actions/types';

const initState = {
  isEin: false
}

export default function(state = initState, action) {
  switch(action.type) {
  case EIN_USER:
    return { ...state, isEin: true };
  case DEEIN_USER:
    return { ...state, isEin: false };
  }

  return state;
}