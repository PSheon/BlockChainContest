import React from 'react';

const GenesisBlock = ({ block }) => {
  return (
    <div className="col s12 m10 offset-m1 l10 offset-l1">
      <div className="card" style={{ wordWrap: 'break-word', borderRadius: '40px' }}>
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4">第 {block.index} 個區塊<i className="material-icons right">more_vert</i></span>
          <h5>時間戳記： {block.timestamp} </h5>
          <h5>區塊資料： {block.data}</h5>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">區塊詳細資料<i className="material-icons right">close</i></span>
          <h5>前一個 HASH： {block.previousHash} </h5>
          <h5>區塊 HASH： {block.hash}</h5>
        </div>
      </div>
    </div>
  )
}

export default GenesisBlock;