import React, { Component } from 'react';
import { connect } from 'react-redux';
import QrReader from 'react-qr-reader';

import Block from '../Dashboard/Block/Block';

class TraceBlock extends Component {
  constructor(props) {
    super(props);


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
            <Block key={i} block={block} />
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