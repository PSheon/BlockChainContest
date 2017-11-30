import React, { Component } from 'react';
import QrReader from 'react-qr-reader';

class QR extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 300,
      result: 'No result',
    }
    this.handleScan = this.handleScan.bind(this)
  }
  componentDidMount() {
    const elem = document.querySelector('.modal');
    const instance = new window.M.Modal(elem);
  }
  handleScan(data){
    if(data){
      this.setState({
        result: data
      })
    }
  }
  handleError(err){
    console.error(err)
  }
  render(){
    return(
      <div>
        <a className="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>
        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>Modal Header</h4>
            <QrReader
              delay={this.state.delay}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: '100%' }}
            />
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
          </div>
        </div>
        <p>{this.state.result}</p>
      </div>
    )
  }
}

export default QR;