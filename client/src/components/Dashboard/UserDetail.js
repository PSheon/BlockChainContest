import React, { Component } from 'react';
import { connect } from 'react-redux';

import Ein from '../../modules/Ein';
import * as actions from '../../actions';

class UserDetail extends Component {
  constructor(props) {
    super(props);


  }
  componentDidMount() {
    
  }

  changeEin = () => {
    this.props.removeEin();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m8 offset-m2 white-text" style={{ wordWrap: 'break-word' }}>
            <h2>您的統一編號 {Ein.getEin()} <a className="btn waves-effect waves-light" onClick={(e) => { this.changeEin() }}>更改</a></h2>
            <h2>您的公司名稱 {this.props.shipperName}</h2>
            <h2>您的節點位置 {this.props.address}</h2>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ block }) {
  return {
    address: block.address,
    shipperName: block.shipperName
  }
}

export default connect(mapStateToProps, actions)(UserDetail);