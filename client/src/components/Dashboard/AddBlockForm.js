import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Icon } from 'react-materialize';

import * as actions from '../../actions';
import EIN from '../../modules/Ein';
import QR from '../../components/QR';

class AddBlockForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      block: {
        logisticID: '',
        freightID: '',
        freightName: '',
        freightWeight: '',
        receiverAddress: ''
      }
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addBlockChain(this.state.block);
  }

  handleChange = (event) => {
    const field = event.target.name;
    const block = this.state.block;
    block[field] = event.target.value;

    this.setState({ block });
  }

  scanLogisticID = (scanValue) => {

  }

  render() {
    return (
      <form action="/" onSubmit={this.handleSubmit}>
        <div className="row margin">
          <Input s={12} label="物流編號" value={"this.state.block.logisticID"} type="text" name="logisticID" onChange={this.handleChange} required>
            <Icon>account_circle</Icon>
          </Input>
        </div>
        <div className="row margin">
          <Input s={12} label="物品編號" value={this.state.block.freightID} type="text" name="freightID" onChange={this.handleChange} required>
            <Icon>account_circle</Icon>
          </Input>
        </div>
        <div className="row margin">
          <Input s={12} label="物品名稱" value={this.state.block.freightName} type="text" name="freightName" onChange={this.handleChange} required>
            <Icon>account_circle</Icon>
          </Input>
        </div>
        <div className="row margin">
          <Input s={12} label="出貨重量" value={this.state.block.freightWeight} type="number" name="freightWeight" onChange={this.handleChange} required>
            <Icon>account_circle</Icon>
          </Input>
        </div>
        <div className="row margin">
          <Input s={12} label="收貨人位址" value={this.state.block.receiverAddress} type="text" name="receiverAddress" onChange={this.handleChange} required>
            <Icon>account_circle</Icon>
          </Input>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <button type="submit" className="btn waves-effect waves-light col s12 yellow darken-4" style={{ borderRadius: '40px' }}>新增交易</button>
          </div>
        </div>
        <QR scanLogisticID={this.scanLogisticID} />
      </form>
    );
  }
}

export default connect(null, actions)(AddBlockForm);