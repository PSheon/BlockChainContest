import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Icon } from 'react-materialize';

import * as actions from '../actions';
import Ein from '../modules/Ein';

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      peerName: '',
      ein: ''
    }
  }
  componentWillMount() {
    this.props.checkUserEin();
  }
  componentDidMount() {
    this.props.initPeerDetail();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    // Ein.setEin(this.state.ein);
    this.props.verifyUserEin(this.state.ein);
    this.props.checkUserEin();
  }

  renderPeerPanel = () => {
    if (this.state.peerName !== '') {
      return (
        <div className="row margin">
          <div className="col s12">
            <div className="card-panel teal accent-4 center" style={{ borderRadius: '40px' }}>
              <h3>{this.state.peerName}</h3>
            </div>
          </div>
        </div>
      )
    }
  }

  renderButton = () => {
    let isMatchPeer = false;
    this.props.peerDetailList.map((peerDetail) => {
      console.log(peerDetail.GUInumber)
      if (peerDetail.GUInumber === this.state.ein) {
        this.setState({ peerName: peerDetail.name });
        isMatchPeer = true;
      } else {
        this.setState({ peerName: '' });
        isMatchPeer = false;
      }
    })
    if (isMatchPeer) {
      return (
        <div className="row">
          <div className="input-field col s12">
            <button type="submit" className="btn waves-effect waves-light col s12 yellow darken-4" style={{ borderRadius: '40px' }}>連接節點</button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="row">
          <div className="input-field col s12">
            <button type="submit" className="btn waves-effect waves-light col s12 yellow darken-4 disabled" style={{ borderRadius: '40px' }}>連接節點</button>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="container valign-wrapper" style={{ minHeight: '100vh' }}>
        <div className="row">
          <div className="col s12 white grey-text text-darken-1" style={{ borderRadius: '40px', padding: '5vh' }}>
            <form action="/" onSubmit={this.handleSubmit}>
              <h3>請輸入您的統一編號與私鑰</h3>
              {this.renderPeerPanel()}
              <div className="row margin">
                <Input s={12} label="統一編號" type="number" name="ein" onChange={(e) => this.setState({ ein: e.target.value })} required>
                  <Icon>account_circle</Icon>
                </Input>
              </div>
              <div className="row margin">
                <Input s={12} label="您的個人私鑰" type="text" required>
                  <Icon>account_circle</Icon>
                </Input>
              </div>
              {this.renderButton()}
            </form>
          </div>
        </div>
      </div>
    )
  };
};

function mapStateToProps({ ein, peer }) {
  return {
    isEin: ein.isEin,
    peerDetailList: peer.peerDetailList
  }
}

export default connect(mapStateToProps, actions)(LandingPage);