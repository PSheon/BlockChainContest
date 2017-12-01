import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class PeersList extends Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    const elem = document.querySelector('.collapsible.peerDetail');
    const instance = new window.M.Collapsible(elem);
  }

  render() {
    return (
      <div className="container white-text center">
        <h4>目前節點列表：</h4>
        {this.props.peers.map((peer, i) => {
          return (
            <ul key={i}>
              <li>網路位址: {peer}</li>
            </ul>
          )
        })}
        <h4>所有節點資料：</h4>
        <ul className="collapsible grey-text peerDetail">
          {this.props.peerDetailList.map((peerDetail, i) => {
            return (
              <li key={i}>
                <div className="collapsible-header"><i className="material-icons">filter_drama</i>{peerDetail.name}</div>
                <div className="collapsible-body white grey-text" style={{ wordWrap: 'break-word' }}>
                  <h5>公司統編</h5>
                  <h5>{peerDetail.GUInumber}</h5>
                  <hr/>
                  <h5>節點位址</h5>
                  <h5>{peerDetail.hashkey}</h5>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ peer }) {
  return {
    peers: peer.peers,
    peerDetailList: peer.peerDetailList
  }
}

export default connect(mapStateToProps, actions)(PeersList);