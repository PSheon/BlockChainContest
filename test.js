const _ = require('lodash');

let obj = [
    {
      index: 0,
      previousHash: '0',
      timestamp: 1465154705,
      data: '第一顆區塊',
      hash: '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7'
    }, {
      index: 1,
      previousHash: '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7',
      timestamp: 1512150649.484,
      data: {
        logisticID: '123',
        freightName: '123',
        freightWeight: '123',
        receiverName: '台灣微軟股份有限公司',
        receiverAddress: 'dad94aca32faca15f68c5054c61e57fccd38ce46e5dcae9df1b68e46b653ce00',
        shipperName: '橙迅科技有限公司',
        shipperAddress: '285c1c9c1d90d0a325d9c3912dc5a4b5e46818a758e7ffc411dbda4a77e5b466',
        freightID: 'cb79d8e4-c6c1-4983-9c06-f09044ba7b55'
      },
      hash: '051c75d62cf49e0fdf6d7a5521b33ef0d058f6eb38425356ae97f50a079e8636'
    }, {
      index: 2,
      previousHash: '051c75d62cf49e0fdf6d7a5521b33ef0d058f6eb38425356ae97f50a079e8636',
      timestamp: 1512150674.484,
      data: {
        logisticID: '123',
        freightID: 'cb79d8e4-c6c1-4983-9c06-f09044ba7b55',
        freightName: '123',
        freightWeight: '400',
        receiverName: '東泰農企業社',
        receiverAddress: 'a31041400e2db2e59d5dd7dcf4fccf533580358371faf184028f24f15b1abd3d',
        shipperName: '橙迅科技有限公司',
        shipperAddress: '285c1c9c1d90d0a325d9c3912dc5a4b5e46818a758e7ffc411dbda4a77e5b466'
      },
      hash: 'a5f5563cc8867f57b2241727264bb6d82aea6ac36ece798f100844a8abc024f8'
    }
  ];

  