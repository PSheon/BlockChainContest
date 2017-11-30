import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Icon } from 'react-materialize';

import * as actions from '../actions';
import Ein from '../modules/Ein';

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ein: ''
    }
  }

  componentWillMount() {
    this.props.checkUserEin();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    // Ein.setEin(this.state.ein);
    this.props.verifyUserEin(this.state.ein);
    this.props.checkUserEin();
  }

  render() {
    return (
      <div className="container valign-wrapper" style={{ minHeight: '100vh' }}>
        <div className="row">
          <div className="col s12 white grey-text text-darken-1" style={{ borderRadius: '40px', padding: '5vh' }}>
            <form action="/" onSubmit={this.handleSubmit}>
              <h1>請輸入您的統一編號</h1>
              <div className="row margin">
                <Input s={12} label="統一編號" type="number" name="ein" onChange={(e) => this.setState({ ein: e.target.value })} required>
                  <Icon>account_circle</Icon>
                </Input>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <button type="submit" className="btn waves-effect waves-light col s12 yellow darken-4" style={{ borderRadius: '40px' }}>新增交易</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  };
};

function mapStateToProps({ ein }) {
  return {
    isEin: ein.isEin,
  }
}

export default connect(mapStateToProps, actions)(LandingPage);