import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Icon, Button } from 'react-materialize';
import QrReader from 'react-qr-reader';
import _ from 'lodash';

import * as actions from '../../actions';
import EIN from '../../modules/Ein';

const LOGISTIC_ = 'Logistic_';
const FREIGHTID_ = 'FreightID_';
class AddBlockForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      delay: 1000,
      block: {
        logisticID: '',
        freightID: '',
        freightName: '',
        freightWeight: '',
        receiverName: '',
        receiverAddress: ''
      }
    }
  }
  componentDidMount() {
    const elem = document.querySelector('.modal.scanModal');
    new window.M.Modal(elem);
    const autocompleteReceiverName = document.querySelector('.autocomplete.receiverName');
    const autocompleteFreightName = document.querySelector('.autocomplete.receiverName');
    new window.M.Autocomplete(autocompleteFreightName, {
      data: { '蘋果': null, '香蕉': null, '小黃瓜': null}
    });
    const istance = new window.M.Autocomplete(autocompleteReceiverName, {
      data: this.props.autoReceiver,
      onAutocomplete: (data) => {
        let block = this.state.block;
        block.receiverName = data;
        this.setState({ block })
      }
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const freightChain = _.filter(this.props.blocks, (o) => {
      return o.data.freightID == this.state.freightID;
    });
    console.log(freightChain)
    if (freightChain !== undefined) {
      let weight = 0;
      freightChain.map((block, i) => {
        if (i === 0) weight = block.data.freightWeight;
        if (block.data.freightWeight > weight) {
          window.M.toast({ html: "重量輸入有誤！" });
          return;
        }
      })
    }

    let isMatch = false;
    this.props.peerDetailList.map((peerDetail) => {
      if (peerDetail.name === this.state.block.receiverName) {
        isMatch = true;
        let block = this.state.block;
        block.receiverAddress = peerDetail.hashkey;
        this.setState({ block });
        return;
      }
    });
    if (!isMatch) {
      window.M.toast({ html: "收貨人位址打錯囉～" });
    } else if (this.props.shipperName === this.state.block.receiverName) {
      window.M.toast({ html: "出貨人與收貨人一樣" });
    } else {
      this.props.addBlockWithFreightID(this.props.shipperName, this.props.address, this.state.block);
    }

  }

  handleChange = (event) => {
    const field = event.target.name;
    const block = this.state.block;
    block[field] = event.target.value;

    this.setState({ block });
  }

  handleScan = (data) => {
    const elem = document.querySelector('.modal.scanModal');
    const instance = window.M.Modal.getInstance(elem);
    if(data){
      if (data.includes(LOGISTIC_)) {
        instance.close();
        let block = this.state.block;
        block.logisticID = data.replace(LOGISTIC_, '');
        this.setState({ block });
      } else if (data.includes(FREIGHTID_)) {
        instance.close();
        let block = this.state.block;
        block.freightID = data.replace(FREIGHTID_, '');
        this.setState({ block });
      }
    }
  }
  handleError = (err) => {
    console.error(err)
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m8 offset-m2">
            <div className="card white gery-text" style={{ borderRadius: '40px' }}>
              <form action="/" onSubmit={this.handleSubmit} style={{ padding: '4vh' }}>
                <div className="row">
                  <div className="input-field col s12">
                    <a className="btn waves-effect waves-light col s12 teal accent-4 modal-trigger" href="#scanModal" style={{ borderRadius: '40px' }}>ＱＲ掃描</a>
                  </div>
                </div>
                <div className="row margin">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">account_circle</i>
                    <input value={this.state.block.logisticID} onChange={this.handleChange} name="logisticID" id="logisticID" type="text" onChange={this.handleChange} required />
                    <label className="active" htmlFor="logisticID">物流編號</label>
                  </div>
                </div>
                <div className="row margin">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">account_circle</i>
                    <input value={this.state.block.freightID} onChange={this.handleChange} name="freightID" id="freightID" type="text" onChange={this.handleChange} required />
                    <label className="active" htmlFor="freightID">物品編號</label>
                  </div>
                </div>
                <div className="row margin">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">account_circle</i>
                    <input className="autocomplete freightName" value={this.state.block.freightName} onChange={this.handleChange} name="freightName" id="freightName" type="text" onChange={this.handleChange} required />
                    <label className="active" htmlFor="freightName">物品名稱</label>
                  </div>
                </div>
                <div className="row margin">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">account_circle</i>
                    <input value={this.state.block.freightWeight} onChange={this.handleChange} name="freightWeight" id="freightWeight" type="number" min="1" onChange={this.handleChange} required />
                    <label className="active" htmlFor="freightWeight">出貨重量(公斤)</label>
                  </div>
                </div>
                <div className="row margin">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">account_circle</i>
                    <input className="autocomplete receiverName" value={this.state.block.receiverName} onChange={this.handleChange} name="receiverName" id="receiverName" type="text" onChange={this.handleChange} required />
                    <label className="active" htmlFor="receiverName">收貨人名稱</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <button type="submit" className="btn waves-effect waves-light col s12 yellow darken-4" style={{ borderRadius: '40px' }}>新增交易</button>
                  </div>
                </div>
                <div id="scanModal" className="modal scanModal">
                  <div className="modal-content">
                    <QrReader
                      delay={this.state.delay}
                      onError={this.handleError}
                      onScan={this.handleScan}
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ block, peer }) {
  return {
    blocks: block.blocks,
    address: block.address,
    shipperName: block.shipperName,
    peerDetailList: peer.peerDetailList,
    autoReceiver: peer.autoReceiver,
  }
}

export default connect(mapStateToProps, actions)(AddBlockForm);