const Web3 = require('web3');

// run node testSignSummoning.js

// const Rpc = config.eth.rpc || null;
// const web3 = new Web3(Rpc);
const web3 = new Web3();

exports.getmessageHash = function (param1, param2, param3, param4, param5, param6, param7, param8, param9) {
  const data = web3.utils.soliditySha3(param1, param2, param3, param4, param5, param6, param7, param8, param9);
  return data;
};

exports.signMessage = function (msgHash, adminAddress, adminKey) {
  web3.eth.defaultAccount = adminAddress;
  const signObj = web3.eth.accounts.sign(msgHash, adminKey);
  return signObj;
};


let pk = "0x61430aa22b93ae464088be2c563fdc32515f06b5cb9d427b206529bbac09826b"
let adminaddress = "0x0a66D27b91bEC19dAAF6722680e6AdC9b7c064FF"

let nft1 = 1;
let nft2 = 2;
let nft1gen = 0;
let nft2gen = 0;
let nft1summonCount = 0;
let nft2summonCount = 0;
let userAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
let mblkVal = 0;
let nonce = 1;

let hash = this.getmessageHash(nft1, nft2, nft1gen, nft2gen, 
    nft1summonCount, nft2summonCount, userAddress, mblkVal, nonce);

// console.log("prefixed", hash)

// console.log("prefixed2", web3.utils.soliditySha3('EVWithdraw(address,uint256,bytes32)'))
// console.log("prefixed.address.3=", web3.utils.soliditySha3(userAddress))

let signn = this.signMessage(hash, adminaddress, pk)

console.log(signn.signature)

// prefixed 0xe5d9e01974ac52a095696f1d83973c66267faf698574a0113ed3c84781c02898
// 0xf388ccb7c556f3dc06d644efcb277654abc91e2356f6be39633f6a233b48c5e537471ca65c2d9fb48303b248631311dd5f938c0f8cec1ede69d80aa8b4cb7ae61b
