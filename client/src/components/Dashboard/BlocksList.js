import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import Block from './Block/Block';
import GenesisBlock from './Block/GenesisBlock';

class BlocksList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRenderAllBlocks: false
    }
  }
  componentDidMount() {
    
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="input-field col s12">
            <a onClick={(e) => {this.setState({ isRenderAllBlocks: !this.state.isRenderAllBlocks })}} className="btn waves-effect waves-light col s12 teal accent-4r" style={{ borderRadius: '40px' }}>
              {(this.state.isRenderAllBlocks)? '顯示相關區塊' : '顯示所有區塊'}
            </a>
          </div>
        </div>
        <h3 className="white-text">{(this.state.isRenderAllBlocks)? '所有區塊' : '相關區塊'}</h3>
        <div className="row">
          {this.props.blocks.map((block, i) => {
            if (this.state.isRenderAllBlocks) {
              if (i === 0) { 
                return ( <GenesisBlock key={i} block={block} /> )
              } else {
                return ( <Block key={i} block={block} /> )
              }
            } else {
              if (block.data.shipperName === this.props.companyName || block.data.receiverName === this.props.companyName) {
                return ( <Block key={i} block={block} /> )
              }
            }
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ block }) {
  return {
    blocks: block.blocks,
    companyName: block.shipperName
  }
}

export default connect(mapStateToProps, actions)(BlocksList);