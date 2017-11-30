import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import Block from './Block/Block';
import GenesisBlock from './Block/GenesisBlock';

class BlocksList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blocks: []
    }
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.props.blocks.map((block, i) => {
            if (i === 0) {
              return (
                <GenesisBlock key={i} block={block} />
              )
            } else {
              return (
                <Block key={i} block={block} />
              )
            }
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ block }) {
  return {
    blocks: block.blocks
  }
}

export default connect(mapStateToProps, actions)(BlocksList);