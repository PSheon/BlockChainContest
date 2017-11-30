import axios from 'axios';
import { browserHistory } from 'react-router';

import * as types from './types';
import Ein from '../modules/Ein';

let BASE_URL;
switch (window.location.port) {
  // case '8001': BASE_URL = 'http://localhost:3001'; break;
  // case '3001': BASE_URL = 'http://localhost:3001'; break;
  // case '8002': BASE_URL = 'http://localhost:3002'; break;
  // case '3002': BASE_URL = 'http://localhost:3002'; break;
  // case '8003': BASE_URL = 'http://localhost:3003'; break;
  // case '3003': BASE_URL = 'http://localhost:3003'; break;
  case '8001': BASE_URL = 'http://210.240.162.7:3001'; break;
  case '3001': BASE_URL = 'http://210.240.162.7:3001'; break;
  case '8002': BASE_URL = 'http://210.240.162.7:3002'; break;
  case '3002': BASE_URL = 'http://210.240.162.7:3002'; break;
  case '8003': BASE_URL = 'http://210.240.162.7:3003'; break;
  case '3003': BASE_URL = 'http://210.240.162.7:3003'; break;
  default: BASE_URL = 'wrong start script';
};

export const setPageIndex = (index) => dispatch => {
  dispatch({ type: types.SET_PAGE_INDEX, payload: index });
}

export const initBlockChain = () => dispatch => {
  axios({
    method: 'get',
    url: BASE_URL+'/blocks'
  }).then(response => {
    if (response.status === 200) {
      dispatch({ type: types.SET_BLOCKCHAIN, payload: response.data });
    }
  }).catch(e => { console.log(e) })
}

export const initPeer = () => dispatch => {
  axios.get(BASE_URL + '/peers')
  .then(response => {
    if (response.status === 200) {
      dispatch({ type: types.SET_PEER, payload: response.data });
    }
  }).catch(e => { console.log(e) });
}

export const addBlockChain = (blockData) => dispatch => {
  axios({
    method: 'post',
    url: BASE_URL+'/mineBlock',
    headers: { 'content-type': 'application/json' },
    data: JSON.stringify({ block: blockData })
  }).then(response => {
    if (response.status === 200) {
      dispatch({ type: types.SET_PAGE_INDEX, payload: 0 });
    }
  }).catch(e => { console.log(e) })
};

export const checkUserEin = () => dispatch => {
  if (Ein.isEinExist()) {
    dispatch({ type: types.EIN_USER });
    browserHistory.push('/dashboard');
  } else {
    dispatch({ type: types.DEEIN_USER });
    browserHistory.push('/');
  }
}

