import axios from 'axios';
import { browserHistory } from 'react-router';
import uuidv4 from 'uuid/v4';
import crypto from 'crypto';

import * as types from './types';
import Ein from '../modules/Ein';

const SECRET_KEY = 'secretkey';

let BASE_URL;
switch (window.location.port) {
  // case '8001': BASE_URL = 'http://localhost:3001'; break;
  // case '3001': BASE_URL = 'http://localhost:3001'; break;
  // case '8002': BASE_URL = 'http://localhost:3002'; break;
  // case '3002': BASE_URL = 'http://localhost:3002'; break;
  // case '8003': BASE_URL = 'http://localhost:3003'; break;
  // case '3003': BASE_URL = 'http://localhost:3003'; break;
  case '8001': BASE_URL = 'https://chengxun.com.tw:3001'; break;
  case '3001': BASE_URL = 'https://chengxun.com.tw:3001'; break;
  case '8002': BASE_URL = 'https://chengxun.com.tw:3002'; break;
  case '3002': BASE_URL = 'https://chengxun.com.tw:3002'; break;
  case '8003': BASE_URL = 'https://chengxun.com.tw:3003'; break;
  case '3003': BASE_URL = 'https://chengxun.com.tw:3003'; break;
  default: BASE_URL = 'wrong start script';
};

export const setPageIndex = (index) => dispatch => {
  dispatch({ type: types.SET_PAGE_INDEX, payload: index });
}

export const initAutoReceiver = () => dispatch => {
  axios({
    method: 'get',
    url: 'https://chengxun.com.tw/comparelist'
  }).then(response => {
    if (response.status === 200) {
      dispatch({ type: types.INIT_AUTO_RECEIVER, payload: response.data });
    }
  }).catch(e => {
    console.log(e);
  })
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

export const initPeerIP = () => dispatch => {
  axios.get(BASE_URL + '/peers')
  .then(response => {
    if (response.status === 200) {
      dispatch({ type: types.SET_PEER, payload: response.data });
    }
  }).catch(e => { console.log(e) });
}

export const initPeerDetail = () => dispatch => {
  axios.get('https://chengxun.com.tw/alllist')
  .then(response => {
    if (response.status === 200) {
      dispatch({ type: types.SET_PEER_DETAIL, payload: response.data.list });
    }
  }).catch(e => {
    console.log(e);
  })
}

export const addBlockWithOutFreightID = (shipperName, shipperAddress, blockData) => dispatch => {
  if (Ein.isEinExist() === true) {
    blockData.shipperName = shipperName.toString();
    blockData.shipperAddress = shipperAddress.toString();
    blockData.freightID = uuidv4();
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
  } else {
    window.M.toast({ html: 'Something wrong!' });
  }
};

export const addBlockWithFreightID = (shipperName, shipperAddress, blockData) => dispatch => {
  if (Ein.isEinExist() === true) {
    blockData.shipperName = shipperName.toString();
    blockData.shipperAddress = shipperAddress.toString();
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
  } else {
    window.M.toast({ html: 'Something wrong!' });
  }
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

export const verifyUserEin = (ein) => dispatch => {
  const hashedKey = crypto.createHmac('sha256', SECRET_KEY).update(ein.toString()).digest('hex');
  axios({
    method: 'get',
    url: 'https://chengxun.com.tw/checkhashlist',
    params: {
      hashkey: hashedKey
    }
  }).then(response => {
    if (response.status === 200) {
      if (response.data === false) {
        window.M.toast({ html: '您的統一編號還沒綁定節點位置' });
      } else {
        dispatch({ type: types.SET_ADDRESS, payload: response.data.hashkey });
        dispatch({ type: types.SET_SHIPPER_NAME, payload: response.data.name });
        Ein.setEin(ein);
        browserHistory.push('/dashboard');
      }
    } else {
      window.M.toast({ html: '有東西出錯了' });
      console.log(response.data)
    }
  }).catch(e => { console.log(e) })
}

export const removeEin = () => dispatch => {
  Ein.removeEin();
  browserHistory.push('/');
}