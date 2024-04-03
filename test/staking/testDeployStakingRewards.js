// // We import Chai to use its asserting functions here.
// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// let Token;
// let hardhatStakingWallet;
// let owner;
// let addr1;
// let addr2;
// let addrs;
// let BezogeToken;
// let BezogeTokenWallet;
// let StakingWallet;
// let StakingWalletWallet;
// let StakedBezogeToken;
// let StakedBezogeTokenWallet;
// let RewardsToken;
// let RewardsTokenWallet;
// let StakingRewards;
// let StakingRewardsWallet;
// // `beforeEach` will run before each test, re-deploying the contract every
//   // time. It receives a callback, which can be async.
//   beforeEach(async function () {
//     // Get the ContractFactory and Signers here.
//     [owner, addr1, addr2] = await ethers.getSigners();

//     // To deploy our contract, we just have to call Token.deploy() and await
//     // for it to be deployed(), which happens once its transaction has been
//     // mined.
//     BezogeToken = await ethers.getContractFactory("BezosEarth");
//     BezogeTokenWallet = await BezogeToken.deploy();

//     StakingWallet = await ethers.getContractFactory("StakingWallet");
//     StakingWalletWallet = await StakingWallet.deploy();

//     StakedBezogeToken = await ethers.getContractFactory("StakedBezogeToken");
//     StakedBezogeTokenWallet = await StakedBezogeToken.deploy(BezogeTokenWallet.address, StakingWalletWallet.address);

//     RewardsToken = await ethers.getContractFactory("MBLKToken");
//     RewardsTokenWallet = await RewardsToken.deploy();

//     StakingRewards = await ethers.getContractFactory("StakingRewards");
//     //console.log(StakingRewardsWallet);

//   });

// // You can nest describe calls to create subsections.
// describe("Deployment of Staking Rewards", function () {
//   // `it` is another Mocha function. This is the one you use to define your
//   // tests. It receives the test name, and a callback function.
 
//   // If the callback function is async, Mocha will `await` it.
//   it("StakingRewardsTokenDeployment", async function () {
//     StakingRewardsWallet = await StakingRewards.deploy(BezogeTokenWallet.address, StakingWalletWallet.address, StakedBezogeTokenWallet.address, RewardsTokenWallet.address);

//     // Expect receives a value, and wraps it in an Assertion object. These
//     // objects have a lot of utility methods to assert values.
  
//     // This test expects the owner variable stored in the contract to be equal
//     // to our Signer's owner.
//     //expect(await TokenOwnerWallet.owner()).to.equal(owner.address);
//    // StakingRewardsWallet.deposit(12,12);
//   });  
// });

