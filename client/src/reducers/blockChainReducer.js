import { SET_BLOCKCHAIN, SET_ADDRESS, SET_SHIPPER_NAME } from '../actions/types';

const initState = {
  blocks: [],
  address: '',
  shipperName: '',

}

export default function(state = initState, action) {
  switch(action.type) {
  case SET_BLOCKCHAIN:
    return { ...state, blocks: action.payload };
  case SET_ADDRESS:
    return { ...state, address: action.payload };
  case SET_SHIPPER_NAME:
    return { ...state, shipperName: action.payload };
  }

  return state;
}