import React, { Component } from 'react';
import { connect } from 'react-redux';
import QrReader from 'react-qr-reader';

import Block from '../Dashboard/Block/Block';

const FREIGHTID_ = 'FreightID_';

class TraceBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      delay: 1000,
      freightID: ''
    }
  }
  componentDidMount() {
    const elem = document.querySelector('.modal.scanModal');
    new window.M.Modal(elem);
  }

  handleScan = (data) => {
    const elem = document.querySelector('.modal.scanModal');
    const instance = window.M.Modal.getInstance(elem);
    if(data){
      if (data.includes(FREIGHTID_)) {
        instance.close();
        console.log(data.replace(FREIGHTID_, ''))
        this.setState({ freightID: data.replace(FREIGHTID_, '') });
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
          <div className="input-field col s12">
            <a className="btn waves-effect waves-light col s12 teal accent-4 modal-trigger" href="#scanModal" style={{ borderRadius: '40px' }}>ＱＲ掃描</a>
          </div>
        </div>
        <div className="row">
          {this.props.blocks.map((block, i) => {
            if (i !== 0 && block.freightID === this.state.freightID) {
              return <Block key={i} block={block} />
            }
          })}
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
      </div>
    )
  }
}

function mapStateToProps({ block }) {
  return {
    blocks: block.blocks
  }
}

export default connect(mapStateToProps)(TraceBlock);