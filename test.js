const _ = require('lodash');

const obj = [
{
  "hashkey": "285c1c9c1d90d0a325d9c3912dc5a4b5e46818a758e7ffc411dbda4a77e5b466",
  "name": "成訊科技有限公司",
  "GUInumber": "59147064"
}, {
  "hashkey": "31c26bd5eba36c180087e24640eff0fcc0e83b81522e1db17c1b4642f5b06f0c",
  "name": "橙迅物流股份有限公司",
  "GUInumber": "59117086"
}, {
  "hashkey": "a31041400e2db2e59d5dd7dcf4fccf533580358371faf184028f24f15b1abd3d",
  "name": "東泰農企業社",
  "GUInumber": "76548764"
}
]

const a = _.find(obj, (o) => {
  return o.GUInumber === '76548764'
})

console.log(a)