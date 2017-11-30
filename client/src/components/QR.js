import React, { Component } from 'react';
import QrReader from 'react-qr-reader';

const LOGISTIC_ = 'Logistic_';
class QR extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 1000,
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
      if (data.includes(LOGISTIC_)) {
        instance.close();
        data = data.replace(LOGISTIC_, '');
        window.$('#logisticID').val(data.toString());
      }
    }
  }
  handleError = (err) => {
    console.error(err)
  }
  render(){
    return(
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
    )
  }
}

export default QR;