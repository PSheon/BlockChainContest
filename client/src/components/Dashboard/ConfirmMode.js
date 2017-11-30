import React, { Component } from 'react';

import AddBlockForm from './AddBlockForm';
import AddBlockWithIDForm from './AddBlockWithIDForm';

class ConfirmMode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isConfirmed: false,
      haveFreight: null
    }
  }

  renderConfirmPanel = () => {
    if (!this.state.isConfirmed) {
      return (
        <div className="row">
          <div className="col s12 m10 offset-m1 white-text center">
            <h2>請問您有物品編號嗎？</h2>
            <div className="row">
              <div className="col s6">
                <a className="btn col s6 offset-s3" onClick={(e) => { this.setState({ isConfirmed: true, haveFreight: true }) }}>沒有</a>
              </div>
              <div className="col s6">
                <a className="btn col s6 offset-s3" onClick={(e) => { this.setState({ isConfirmed: true, haveFreight: false }) }}>有</a>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  renderAddForm = () => {
    if (this.state.haveFreight !== null) {
      if (this.state.haveFreight) {
        return <AddBlockForm />
      } else {
        return <AddBlockWithIDForm />
      }
    }
  }

  render() {
    return (
      <div className="container">
        {this.renderConfirmPanel()}
        {this.renderAddForm()}
      </div>
    )
  }
}

export default ConfirmMode;