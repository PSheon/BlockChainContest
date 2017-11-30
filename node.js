'use strict';
const CryptoJS = require("crypto-js");
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const WebSocket = require("ws");

const http_port = process.env.HTTP_PORT || 3001;
const p2p_port = process.env.P2P_PORT || 6001;
const initialPeers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class Block {
  constructor(index, previousHash, timestamp, data, hash) {
    this.index = index;
    this.previousHash = previousHash.toString();
    this.timestamp = timestamp;
    this.data = data;
    this.hash = hash.toString();
  }
}

let sockets = [];
const MessageType = {
  QUERY_LATEST: 0,
  QUERY_ALL: 1,
  RESPONSE_BLOCKCHAIN: 2
};

const getGenesisBlock = () => {
  return new Block(0, "0", 1465154705, "第一顆區塊", "816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7");
};

let blockchain = [getGenesisBlock()];

const initConnection = (ws) => {
  sockets.push(ws);
  initMessageHandler(ws);
  initErrorHandler(ws);
  write(ws, queryChainLengthMsg());
  writeToPeer(queryChainLengthMsg());
};

const initMessageHandler = (ws) => {
  ws.on('message', (data) => {
    const message = JSON.parse(data);
    console.log('新訊息：' + JSON.stringify(message));
    switch (message.type) {
      case MessageType.QUERY_LATEST:
        write(ws, responseLatestMsg());
        writeToPeer(responseLatestMsg());
        break;
      case MessageType.QUERY_ALL:
        write(ws, responseChainMsg());
        writeToPeer(responseChainMsg());
        break;
      case MessageType.RESPONSE_BLOCKCHAIN:
        handleBlockchainResponse(message);
        break;
    }
  });
};

const initErrorHandler = (ws) => {
  const closeConnection = (ws) => {
    console.log('無法連接到區塊鏈網路 位址 : ' + ws.url);
    sockets.splice(sockets.indexOf(ws), 1);
  };
  ws.on('close', () => closeConnection(ws));
  ws.on('error', () => closeConnection(ws));
};

const isValidBlockFormat = (blockData) => {
  console.log(blockData);
  // TODO
  return true;
};

const generateNextBlock = (blockData) => {
  const previousBlock = getLatestBlock();
  const nextIndex = previousBlock.index + 1;
  const nextTimestamp = new Date().getTime() / 1000;
  const nextHash = calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData);
  return new Block(nextIndex, previousBlock.hash, nextTimestamp, blockData, nextHash);
};

const calculateHashForBlock = (block) => {
  return calculateHash(block.index, block.previousHash, block.timestamp, block.data);
};

const calculateHash = (index, previousHash, timestamp, data) => {
  return CryptoJS
    .SHA256(index + previousHash + timestamp + data)
    .toString();
};

const addBlock = (newBlock) => {
  if (isValidNewBlock(newBlock, getLatestBlock())) {
    blockchain.push(newBlock);
  }
};

const isValidNewBlock = (newBlock, previousBlock) => {
  if (previousBlock.index + 1 !== newBlock.index) {
    console.log('區塊編號錯誤');
    return false;
  } else if (previousBlock.hash !== newBlock.previousHash) {
    console.log('PREVIOUS_HASH 值錯誤');
    return false;
  } else if (calculateHashForBlock(newBlock) !== newBlock.hash) {
    console.log(typeof(newBlock.hash) + ' ' + typeof calculateHashForBlock(newBlock));
    console.log('HASH 值錯誤： ' + calculateHashForBlock(newBlock) + ' ' + newBlock.hash);
    return false;
  }
  return true;
};

const connectToPeers = (newPeers) => {
  newPeers.forEach((peer) => {
    const ws = new WebSocket(peer);
    ws.on('open', () => initConnection(ws));
    ws.on('error', () => {
      console.log('網路連接錯誤')
    });
  });
};

const handleBlockchainResponse = (message) => {
  const receivedBlocks = JSON
    .parse(message.data)
    .sort((b1, b2) => (b1.index - b2.index));
  const latestBlockReceived = receivedBlocks[receivedBlocks.length - 1];
  const latestBlockHeld = getLatestBlock();
  if (latestBlockReceived.index > latestBlockHeld.index) {
    console.log('可能有新的區塊，有 : ' + latestBlockHeld.index + ' 其他節點有  ' + latestBlockReceived.index);
    if (latestBlockHeld.hash === latestBlockReceived.previousHash) {
      console.log("這個區塊可以新增");
      blockchain.push(latestBlockReceived);
      broadcast(responseLatestMsg());
      broadcastToPeer(responseLatestMsg());
    } else if (receivedBlocks.length === 1) {
      console.log("需要向區塊鏈網路同步區塊鏈");
      broadcast(queryAllMsg());
      broadcastToPeer(queryAllMsg());
    } else {
      console.log("有新的區塊可以新增");
      replaceChain(receivedBlocks);
    }
  } else {
    console.log('更新完成，我們的區塊鏈已經是最新的了');
    console.log('==============================');
  }
};

const replaceChain = (newBlocks) => {
  if (isValidChain(newBlocks) && newBlocks.length > blockchain.length) {
    console.log('這個區塊鏈正確. 更新區塊鏈！');
    blockchain = newBlocks;
    broadcast(responseLatestMsg());
    broadcastToPeer(responseLatestMsg());
  } else {
    console.log('這個區塊鏈不正確');
  }
};

const isValidChain = (blockchainToValidate) => {
  if (JSON.stringify(blockchainToValidate[0]) !== JSON.stringify(getGenesisBlock())) {
    return false;
  }
  const tempBlocks = [blockchainToValidate[0]];
  for (const i = 1; i < blockchainToValidate.length; i++) {
    if (isValidNewBlock(blockchainToValidate[i], tempBlocks[i - 1])) {
      tempBlocks.push(blockchainToValidate[i]);
    } else {
      return false;
    }
  }
  return true;
};

const getLatestBlock = () => blockchain[blockchain.length - 1];
const queryChainLengthMsg = () => ({'type': MessageType.QUERY_LATEST});
const queryAllMsg = () => ({'type': MessageType.QUERY_ALL});
const responseChainMsg = () => ({
  'type': MessageType.RESPONSE_BLOCKCHAIN,
  'data': JSON.stringify(blockchain)
});
const responseLatestMsg = () => ({
  'type': MessageType.RESPONSE_BLOCKCHAIN,
  'data': JSON.stringify([getLatestBlock()])
});

const initP2PServer = () => {
  const server = new WebSocket.Server({port: p2p_port});
  server.on('connection', ws => initConnection(ws));
  console.log('P2P 網路運行在 port : ' + p2p_port + '上');
};

connectToPeers(initialPeers);

const app = express();
const http = require('http').Server(app);
const https = require('https');
const fs = require('fs');

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('./client/build'));

app.get('/blocks', (req, res) => res.send(JSON.stringify(blockchain)));
app.post('/mineBlock', (req, res) => {
  if (isValidBlockFormat(req.body.block)) {
    let newBlock = generateNextBlock(req.body.block);
    addBlock(newBlock);
    broadcast(responseLatestMsg());
    broadcastToPeer(responseLatestMsg());
    console.log('區塊已新增 ： ' + JSON.stringify(newBlock));
    res.send();
  }
});
app.get('/peers', (req, res) => {
  res.send(sockets.map(s => s._socket.remoteAddress + ':' + s._socket.remotePort));
});
app.post('/addPeer', (req, res) => {
  connectToPeers([req.body.peer]);
  res.send();
});
// app.get('*', (req, res) => {
//   res.sendFile(__dirname + '/client/build/index.html');
// })
const options = {
  cert: fs.readFileSync('./sslcert/fullchain.pem'),
  key: fs.readFileSync('./sslcert/privkey.pem')
};
https.createServer(options, app).listen(http_port);
const io = require('socket.io')(https);
// http.listen(http_port, () => console.log('節點運行在 port : ' + http_port + '上'));

initP2PServer();

const write = (ws, message) => ws.send(JSON.stringify(message));
const broadcast = (message) => sockets.forEach(socket => write(socket, message));
let writeToPeer = message => { return };
let broadcastToPeer = message => { return };
io.on('connection', socket => {
  // console.log('Socket.io 已連線')
  writeToPeer = message => {
    // console.log('writeToPeer');
    socket.emit('message', {message: message});
  };
  broadcastToPeer = message => {
    // console.log('broadcastToPeer')
    socket.emit('broadcast', { broadcast: message });
  };
});