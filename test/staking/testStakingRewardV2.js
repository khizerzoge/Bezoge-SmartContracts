// // We import Chai to use its asserting functions here.
// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// let StakingContract;
// let ZogiToken;
// let oneMonthReward =    ["1000000000000000000", "1000000000000000000"];
// let threeMonthReward =  ["1000000000000000000", "1000000000000000000"];
// let twelveMonthReward = ["1000000000000000000", "1000000000000000000"];
// const oneCycle = 60 * 60 * 24 * 30;

// before(async function () {
//     // Get the ContractFactory and Signers here.
//     [owner, addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners();

//     const zogiToken = await ethers.getContractFactory("ZOGI");
//     ZogiToken = await zogiToken.deploy();

//     const stakingWallet = await ethers.getContractFactory("StakingWallet");
//     const StakingWallet = await stakingWallet.deploy();

//     const Contract = await ethers.getContractFactory("StakingRewardsV2");
//     StakingContract = await Contract.deploy(100, StakingWallet.address,ZogiToken.address ,[ZogiToken.address], 
//       ["1000000000000000000","200"],  ["1000000000000000000","200"],  ["1000000000000000000","200"]);

//     await ZogiToken.mint(owner.address, "100000");  
//     await ZogiToken.approve(StakingContract.address, "100000000000");
      
//   });

//   describe("StakeZogi", function () {
//   // If the callback function is async, Mocha will `await` it.
//     it("Verify Zogi token Staking", async function () {
    
//         await StakingContract.stake("1000", "0");
//         let stakingInfo = await StakingContract.getStakingInfo("1");

//         expect(stakingInfo.amount).to.equal("1000");
//         expect(stakingInfo.month).to.equal("0");
//     });

//     it("Verify monthly cycle updation", async function () {
    
//         await ethers.provider.send('evm_increaseTime', [oneCycle]);
//         await StakingContract.addReward(1,oneMonthReward, threeMonthReward, twelveMonthReward);
//         let monthCount = await StakingContract.monthlyCycleCounter();
        
//         expect(monthCount).to.equal("1");
//     });

//     it("Verify total Stake Amount", async function () {

//         let Info = await StakingContract.getMonthlyInfo("1");
//         expect(Info.totalStaking[0]).to.equal("1000");
        
//     });

//     it("Verify Staking Reward of 15 days", async function () {

//         const halfCycle = 60 * 60 * 24 * 15;
//         await ethers.provider.send('evm_increaseTime', [halfCycle]);

//         let tx =await StakingContract.claimReward("1",true,ZogiToken.address);
//         const Tx = await tx.wait();

//         const event = Tx.events.find(event => event.event === 'UserReward');

//         const [reward] = event.args;

//         expect(reward).to.equal("500000000000000000");
 
//     });

//     it("Verify Staking Reward of next 10 days", async function () {

//         const oneThirdCycle = 60 * 60 * 24 * 10;
//         await ethers.provider.send('evm_increaseTime', [oneThirdCycle]);

//         let tx = await StakingContract.claimReward("1",true,ZogiToken.address); 
//         const Tx = await tx.wait();

//         const event = Tx.events.find(event => event.event === 'UserReward');
//         const [reward] = event.args;

//         expect(reward).to.equal("333333333333333333");
        
//     });

//     it("Verify Staking Reward of next one month", async function(){

//         await ethers.provider.send('evm_increaseTime', [oneCycle]);
//         await StakingContract.addReward(2,oneMonthReward, threeMonthReward, twelveMonthReward);

//         let tx = await StakingContract.claimReward("1",true,ZogiToken.address); 
//         const Tx = await tx.wait();

//         const event = Tx.events.find(event => event.event === 'UserReward');
//         const [reward] = event.args;
//         expect(reward).to.equal("999999999999999999");

//     });

//     it("Verify Staking Reward of next three months", async function(){

//         await ethers.provider.send('evm_increaseTime', [oneCycle]);
//         await StakingContract.addReward(3,oneMonthReward, threeMonthReward, twelveMonthReward);

//         await ethers.provider.send('evm_increaseTime', [oneCycle]);
//         await StakingContract.addReward(4,oneMonthReward, threeMonthReward, twelveMonthReward);

//         await ethers.provider.send('evm_increaseTime', [oneCycle]);
//         await StakingContract.addReward(5,oneMonthReward, threeMonthReward, twelveMonthReward);

//         let tx = await StakingContract.claimReward("1",true,ZogiToken.address); 
//         const Tx = await tx.wait();

//         const event = Tx.events.find(event => event.event === 'UserReward');
//         const [reward] = event.args;

//         expect(reward).to.equal("2999999999999999999");

//     });


//   });


                                                                                                                            


