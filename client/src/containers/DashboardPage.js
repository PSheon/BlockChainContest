import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import io from 'socket.io-client';

import * as actions from '../actions';
import BlocksList from '../components/Dashboard/BlocksList';
import AddBlockForm from '../components/Dashboard/AddBlockForm';
import PeersList from '../components/Dashboard/PeersList';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;

let BASE_URL;
switch (window.location.port) {
  // case '8001': BASE_URL = 'http://localhost:3001'; break;
  // case '3001': BASE_URL = 'http://localhost:3001'; break;
  // case '8002': BASE_URL = 'http://localhost:3002'; break;
  // case '3002': BASE_URL = 'http://localhost:3002'; break;
  // case '8003': BASE_URL = 'http://localhost:3003'; break;
  // case '3003': BASE_URL = 'http://localhost:3003'; break;
  case '8001': BASE_URL = 'https://210.240.162.7:3001'; break;
  case '3001': BASE_URL = 'https://210.240.162.7:3001'; break;
  case '8002': BASE_URL = 'https://210.240.162.7:3002'; break;
  case '3002': BASE_URL = 'https://210.240.162.7:3002'; break;
  case '8003': BASE_URL = 'https://210.240.162.7:3003'; break;
  case '3003': BASE_URL = 'https://210.240.162.7:3003'; break;
  default: BASE_URL = 'wrong start script';
};
const socket = io(BASE_URL);

class DashboardPage extends Component {
  constructor(props) {
    super(props);

  }
  componentWillMount() {
    this.props.checkUserEin();
    this.props.initBlockChain();
    this.props.initPeer();
  }
  componentDidMount() {
    socket.on('connect', () => {
      console.log('Socket.io-client 已連線');
    });

    socket.on('broadcast', ({ broadcast }) => {
      if (broadcast.type === 2) {
        window.M.toast({html: '新的區塊產生囉!'});
        this.props.initBlockChain();
      }
    });
  }

  renderContent = () => {
    let index = this.props.index;
    if (index === 0) {
      // Block List
      return <BlocksList />;
    } else if (index === 1) {
      // Add Form
      return <AddBlockForm />;
    } else if (index === 2) {
      // Peer List
      return <PeersList />;
    }
  }

  render() {
    return (
      <div>
        <div style={{ maxHeight: '90vh', overflow: 'scroll' }}>
          {this.renderContent()}
        </div>
        <Paper zDepth={1}>
          <BottomNavigation selectedIndex={this.props.index} style={{ position: 'fixed', bottom: 0, width: '100%' }}>
            <BottomNavigationItem
              label="所有區塊"
              icon={recentsIcon}
              onClick={() => this.props.setPageIndex(0)}
            />
            <BottomNavigationItem
              label="新增區塊"
              icon={favoritesIcon}
              onClick={() => this.props.setPageIndex(1)}
            />
            <BottomNavigationItem
              label="所有節點"
              icon={nearbyIcon}
              onClick={() => this.props.setPageIndex(2)}
            />
          </BottomNavigation>
        </Paper>
      </div>
    )
  }
}

function mapStateToProps({ ein, page }) {
  return {
    isEin: ein.isEin,
    index: page.index
  }
}

export default connect(mapStateToProps, actions)(DashboardPage);