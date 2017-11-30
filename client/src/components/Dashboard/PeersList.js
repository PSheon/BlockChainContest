import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class PeersList extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.initPeer();
  }

  handleUpdatePeer = () => {
    this.props.initPeer();
  }

  render() {
    return (
      <div>
        <h2>目前節點列表：</h2>
        <button className="btn" onClick={this.handleUpdatePeer}>更新列表</button>
        {this.props.peers.map((peer, i) => {
          return (
            <ul key={i}>
              <li>網路位址: {peer}</li>
            </ul>
          )
        })}
      </div>
    )
  }
}

function mapStateToProps({ peer }) {
  return {
    peers: peer.peers
  }
}

export default connect(mapStateToProps, actions)(PeersList);