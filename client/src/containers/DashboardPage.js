import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import io from 'socket.io-client';

import * as actions from '../actions';
import Ein from '../modules/Ein';
import BlocksList from '../components/Dashboard/BlocksList';
import AddBlockForm from '../components/Dashboard/AddBlockForm';
import ConfirmMode from '../components/Dashboard/ConfirmMode';
import PeersList from '../components/Dashboard/PeersList';
import TraceBlock from '../components/Dashboard/TraceBlock';
import UserDetail from '../components/Dashboard/UserDetail';

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
  case '8001': BASE_URL = 'https://chengxun.com.tw:3001'; break;
  case '3001': BASE_URL = 'https://chengxun.com.tw:3001'; break;
  case '8002': BASE_URL = 'https://chengxun.com.tw:3002'; break;
  case '3002': BASE_URL = 'https://chengxun.com.tw:3002'; break;
  case '8003': BASE_URL = 'https://chengxun.com.tw:3003'; break;
  case '3003': BASE_URL = 'https://chengxun.com.tw:3003'; break;
  default: BASE_URL = 'wrong start script';
};
const socket = io.connect(BASE_URL);

class DashboardPage extends Component {
  constructor(props) {
    super(props);

  }
  componentWillMount() {
    this.props.checkUserEin();
    this.props.initBlockChain();
    this.props.initPeerIP();
    this.props.initPeerDetail();
    this.props.initAutoReceiver();
    this.props.verifyUserEin(Ein.getEin());
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
    switch (index) {
      case 0: return <BlocksList />; break;
      case 1: return <ConfirmMode />; break;
      case 2: return <PeersList />; break;
      case 3: return <TraceBlock />; break;
      case 4: return <UserDetail />; break;
    }
  }

  render() {
    return (
      <div>
        <div style={{ minHeight: '90vh', maxHeight: '95vh', overflow: 'scroll' }}>
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
            <BottomNavigationItem
              label="追朔商品"
              icon={nearbyIcon}
              onClick={() => this.props.setPageIndex(3)}
            />
            <BottomNavigationItem
              label="用戶資料"
              icon={nearbyIcon}
              onClick={() => this.props.setPageIndex(4)}
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