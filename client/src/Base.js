import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import * as actions from './actions';

let BASE_URL;
switch (window.location.port) {
  case '8001': BASE_URL = 'http://localhost:3001'; break;
  case '8002': BASE_URL = 'http://localhost:3002'; break;
  case '8003': BASE_URL = 'http://localhost:3003'; break;
  default: BASE_URL = 'wrong start script';
};
const socket = io(BASE_URL);

class Base extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    socket.on('connect', () => {
      console.log('Socket.io-client 已連線');
    });

    socket.on('broadcast', ({ broadcast }) => {
      if (broadcast.type === 2) {
        console.log('new block')
        this.props.initBlockChain();
      }
    });
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default connect(null, actions)(Base);
