// // We import Chai to use its asserting functions here.
// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// let owner;
// let addr1;
// let addr2;
// let BridgeOwner;
// let BridgeContract;
// let TokenOwner;
// let TokenContract;
// let feePercentage;
// const Web3 = require('web3');

// const web3 = new Web3();

// getmessageHash = function (originChainId, ChainIdblock, ContractAddress, refId, msgSender, amount) {
//   const data = web3.utils.soliditySha3(originChainId, ChainIdblock, 
//   ContractAddress, refId, msgSender, amount);
//   return data;
// };

// signMessage = function (msgHash, adminAddress, adminKey) {
//   web3.eth.defaultAccount = adminAddress;
//   const signObj = web3.eth.accounts.sign(msgHash, adminKey);
//   return signObj;
// };

// // `beforeEach` will run before each test, re-deploying the contract every
//   // time. It receives a callback, which can be async.
//   beforeEach(async function () {
//     // Get the ContractFactory and Signers here.
//     [owner, addr1, addr2] = await ethers.getSigners();
//     // To deploy our contract, we just have to call Token.deploy() and await
//     // for it to be deployed(), which happens once its transaction has been
//     // mined.
//     BridgeOwner = await ethers.getContractFactory("ZogiBridge");
//     BridgeContract = await BridgeOwner.deploy();

//     TokenOwner = await ethers.getContractFactory("ZOGI");
//     TokenContract = await TokenOwner.deploy();

//     // 2nd argument is percentage
//     feePercentage = 2;
//     var decimals = 1000000;
//     var chainIds = [1,2,31337];
//     var chainStatus= [true, true, true]
    
//     await BridgeContract.init(TokenContract.address, feePercentage, decimals, chainIds, chainStatus);

//   });

// // You can nest describe calls to create subsections.
// describe("Initialization of Bridge", function () {
//   // `it` is another Mocha function. This is the one you use to define your
//   // tests. It receives the test name, and a callback function.
 
//   // Check init initialization
//   it("Check empty Initialization Should set the right parameters", async function () {

//     // Expect receives a value, and wraps it in an Assertion object. These
//     // objects have a lot of utility methods to assert values.
  
//     // Zogi address initialization
//     expect(await BridgeContract.zogiToken()).to.equal(TokenContract.address);

//     // This test expects the owner variable stored in the contract to be equal
//     // to our Signer's owner.
//     expect(await TokenContract.owner()).to.equal(owner.address);

//   });
// });

// // You can nest describe calls to create subsections.
// describe("Check renounce Ownership", function () {
//   // `it` is another Mocha function. This is the one you use to define your
//   // tests. It receives the test name, and a callback function.
 
//   // Check renounce Ownership
//   it("Check renounce Ownership", async function () {

//     await expect(
//       BridgeContract.renounceOwnership()
//    ).to.be.revertedWith("can't renounceOwnership here");

//   });
// });

// describe("Burn Zogis using Bridge and fee distribution to Bridge contract", function () {

//   it("Burn using Bridge", async function () {
//     const networkId = 31337;
//     await TokenContract.mint(addr1.address, 1000000);
//     await TokenContract.setAdmin(BridgeContract.address, true);

//     let balance = await TokenContract.balanceOf(addr1.address);
    
//     await TokenContract.connect(addr1).approve(BridgeContract.address, balance);
//     await BridgeContract.connect(addr1).bridgeBurn(balance, networkId, 0);

//     expect(await TokenContract.balanceOf(addr1.address)).to.equal(0);

//     expect(await TokenContract.balanceOf(BridgeContract.address)).to.equal(((feePercentage/1000)*balance));

//   });

// });

// describe("Mint Zogis using Bridge and with signatures", function () {

//   it("Mint using Bridge", async function () {
//     const networkId = 31337;
//     var signers = [];
//     var contractAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
//     var privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"

//     await TokenContract.mint(addr1.address, 1000000);
//     await TokenContract.setAdmin(BridgeContract.address, true);

//     let balance = await TokenContract.balanceOf(addr1.address);
//     await TokenContract.connect(addr1).approve(BridgeContract.address, balance);

//     var burnId = await BridgeContract.connect(addr1).bridgeBurn(balance, networkId, 0);
//     const txReceipt = await burnId.wait();
//     signers.push(contractAddress);
//     BridgeContract.updateSigners(signers);
//     var newbalance = balance-(feePercentage/100)*balance
//     var msgHash = getmessageHash(networkId, networkId, BridgeContract.address,  txReceipt.events[4].args.burnId, addr1.address, parseInt(newbalance));
//     var response = signMessage(msgHash, contractAddress, privateKey);

//     await BridgeContract.connect(addr1).bridgeMint(txReceipt.events[4].args.burnId, parseInt(newbalance), networkId, [response.signature], 
//                                                   [contractAddress]);
//     expect(await TokenContract.balanceOf(addr1.address)).to.equal(balance-((feePercentage/100)*balance));

//   });

// });

// describe("MultiSignature Bridge", function () {

//   it("Mint and Burn with MultiSignatures Bridge", async function () {
//     const networkId = 31337

//     var signers = [];
//     var contractAddressSig1 = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
//     var privateKeySig1 = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"

//     var contractAddressSig2 = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
//     var privateKeySig2 = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"

//     await TokenContract.mint(addr1.address, 1000000);
//     await TokenContract.mint(addr2.address, 1000000);

//     await TokenContract.setAdmin(BridgeContract.address, true);

//     let balance = await TokenContract.balanceOf(addr1.address)
    
//     await TokenContract.connect(addr1).approve(BridgeContract.address, balance);

//     var burnId = await BridgeContract.connect(addr1).bridgeBurn(balance, networkId, 0);
//     const txReceipt = await burnId.wait();
        
//     signers.push(contractAddressSig2);
//     signers.push(contractAddressSig1);

//     await BridgeContract.updateSigners(signers);  

//     var newbalance = balance-(feePercentage/100)*balance

//     var msgHash = getmessageHash(networkId, networkId, BridgeContract.address, txReceipt.events[4].args.burnId, addr1.address, parseInt(newbalance));

//     var responseSig1 = signMessage(msgHash, contractAddressSig1, privateKeySig1);
//     var responseSig2 = signMessage(msgHash, contractAddressSig2, privateKeySig2);

//     await BridgeContract.connect(addr1).bridgeMint(txReceipt.events[4].args.burnId, parseInt(newbalance), networkId, [responseSig2.signature, responseSig1.signature], 
//                                                   [contractAddressSig2, contractAddressSig1]);

//     expect(await TokenContract.balanceOf(addr1.address)).to.equal(balance-((feePercentage/100)*balance));
//   });

// });

// describe("Check Pause Functionality Bridge", function () {

//   it("Mint and Burn with Pause Contract", async function () {
//     const networkId = 31337

//     await TokenContract.mint(addr1.address, 1000000);
//     await TokenContract.mint(addr2.address, 1000000);

//     await TokenContract.setAdmin(BridgeContract.address, true);

//     let balance = await TokenContract.balanceOf(addr1.address)
    
//     await TokenContract.connect(addr1).approve(BridgeContract.address, balance);

//     await BridgeContract.pause();

    
//     await expect(
//       BridgeContract.connect(addr1).bridgeBurn(balance, networkId, 0)
//    ).to.be.revertedWith('Pausable: paused');

//   });

// });