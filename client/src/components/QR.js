import React, { Component } from 'react';
import QrReader from 'react-qr-reader';

class QR extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 300,
      result: 'No result',
    }
  }
  componentDidMount() {
    const elem = document.querySelector('.modal.scanModal');
    new window.M.Modal(elem);
  }
  handleScan = (data) => {
    if(data){
      const elem = document.querySelector('.modal.scanModal');
      const instance = window.M.Modal.getInstance(elem);
      instance.close();
      this.setState({
        result: data
      })
    }
  }
  handleError = (err) => {
    console.error(err)
  }
  render(){
    return(
      <div>
        <a className="waves-effect waves-light btn modal-trigger" href="#scanModal">Modal</a>
        <div id="scanModal" className="modal scanModal">
          <div className="modal-content">
            <h4>Modal Header</h4>
            <QrReader
              delay={this.state.delay}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: '100%' }}
            />
          </div>
          <p>{this.state.result}</p>
          <div className="modal-footer">
            <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
          </div>
        </div>
      </div>
    )
  }
}

export default QR;