// // // We import Chai to use its asserting functions here.
// // const { expect } = require("chai");
// // const { ethers } = require("hardhat");

// //     // 7,500 tokens minimum in the whitelist
// //     // Whitelisting price: $0.05/$MBLK
// //     // Maximum Allocation: $2,500 
// //     // Access to sale: 12 hours early

// //     //current stage should be 1
// //     //current stage should be 2 
// //     //current stage should be 3

// // let owner;
// // let addr1;
// // let addr2;
// // let usdtContract;
// // let zogiContract;
// // let IDOContract;

// //   // `beforeEach` will run before each test, re-deploying the contract every
// //   // time. It receives a callback, which can be async.
// //   beforeEach(async function () {
// //     // Get the ContractFactory and Signers here.
// //     [owner, addr1, addr2] = await ethers.getSigners();

// //     // let usdtRate = [2000,1818,1666,1538];
// //     let usdtRate = [20,18,16,15];
// //     let ethRate = [2000,1818,1666,1538];
// //     let zogiRate = [20,20];
// //     // let zogiRate = [2000,2000];


// //     let stages = [1,2,3,4];
// //     let zogistage = [1,2];

// //     IDOOwner = await ethers.getContractFactory("IDO");
// //     IDOContract = await IDOOwner.deploy();

// //     zogiTokenOwner = await ethers.getContractFactory("ZOGI");
// //     zogiContract = await zogiTokenOwner.deploy();

// //     usdtTokenOwner = await ethers.getContractFactory("USDT");
// //     usdtContract = await usdtTokenOwner.deploy();

// //     await zogiContract.mint(addr1.address, "65000000000000000000000000");   //Minting 10000 tokens
// //     await zogiContract.connect(addr1).approve(IDOContract.address, "65000000000000000000000000");

// //     await usdtContract.mint(addr1.address, "65000000000000000000000000");   //Minting 100 tokens
// //     await usdtContract.connect(addr1).approve(IDOContract.address, "65000000000000000000000000");
// //     await IDOContract.init(zogiContract.address,usdtContract.address,usdtRate,ethRate,zogiRate,stages,zogistage);
// //     // await IDOContract.owner();
// //     // setZogiRate

// //     // await IDOContract.allocateMBLKContribution(addr1.address,'13000000000000000000000000',1)

// //   });

//   // You can nest describe calls to create subsections.
//   // describe("Owner of zogi tokens", function () {
//   //   it("Should set the right owner of zogi tokens", async function () {
//   //     expect(await zogiContract.owner()).to.equal(owner.address);
//   //   });  
//   // });

//     // Update the rate in Zogi 
//     // describe("Update rate of the zogi", function () {
//     //     // If the callback function is async, Mocha will `await` it.
//     //      it("Should update the rate of zogi at particular stage", async function () {
//     //       const currentStages = [0,1];
//     //       const currentzogiRate = [1538,1538];
//     //       await IDOContract.setZogiRate(currentzogiRate,currentStages);
//     //       expect(await IDOContract.zogiRate(0)).to.equal('1538');
//     //     });  
//     // });

//     // Update the rate in USDC
//       // describe("Update rate of the USDC", function () {
//       //   // setUSDTRate(uint256[]calldata rates, uint256[]calldata stages)
//       //     // If the callback function is async, Mocha will `await` it.
//       //      it("Should update the rate of USDC at particular stage", async function () {
//       //       const currentStages = [0,1,2,3];
//       //       const usdtRate = [1666,1666,1666,1666];
//       //       await IDOContract.setUSDTRate(usdtRate,currentStages);
//       //       expect(await IDOContract.usdtRate(3)).to.equal('1666');

//       //     });  
//       // });

//     // Update the rate in ETH
//     // describe("Update rate of the ETH", function () {
//     //   // If the callback function is async, Mocha will `await` it.
//     //    it("Should update the rate of ETH at particular stage", async function () {
//     //     const currentStages = [0,1,2,3];
//     //     const ethRate = [2000,2000,2000,2000];
//     //     await IDOContract.setEthRate(ethRate,currentStages);
//     //     expect(await IDOContract.ethRate(3)).to.equal('2000');
//     //   });  
//     // });

//     // Update the rate in ETH
//     //    describe("Update rate of the ETH,USDC,ZOGI all at once", function () {
//     //     // If the callback function is async, Mocha will `await` it.
//     //      it("Update rate of the ETH,USDC,ZOGI all at particular stage", async function () {
//     //       await IDOContract.upadateRates(1818,1818,1818,1);
//     //       expect(await IDOContract.zogiRate(1)).to.equal('1818');

//     //     });
//     // });

//   // ================= Check for current stage ================================

//    // You can nest describe calls to create subsections.
//   //   describe("Get the current stage of the IDO for Zogi", function () {
//   //     // If the callback function is async, Mocha will `await` it.
//   //     it("Test the current stage of the IDO", async function () {

//   //       let currentStage = 0;
//   //       let tokenSold = 0;
//   //       // what should be the limit of the user
//   //       for(i = 0; i<=305; i++) {
//   //           currentStage = await IDOContract._getCurrentIDOStage();
//   //           // console.log("stage before buy",currentStage);
//   //           await IDOContract.allocateMBLKContribution(addr1.address,'1',1,addr1.address);
//   //           currentStage = await IDOContract._getCurrentIDOStage();
//   //           // console.log("stage after buy",currentStage);
//   //           tokenSold = await IDOContract.tokensSold();
//   //           // console.log("Value of token sold",tokenSold)
//   //       } 
//   //       console.log("Value of current stage",currentStage);
//   //       expect(await IDOContract._getCurrentIDOStage()).to.equal(2);
//   //    });
//   // });

//     // You can nest describe calls to create subsections.
//   //   describe("Allocate the MBLK contribution by Admin", function () {
  
//   //     // If the callback function is async, Mocha will `await` it.
//   //     it("Admin should be able to allocate the MBLK contribution", async function () {
//   //     await IDOContract.allocateMBLKAllocationAdmin(addr1.address,'10000000000000000000');
//   //     const tokenSold = await IDOContract.tokensSold();
//   //     const currentmblkAllocation = await IDOContract.mblkAllocation(addr1.address);
//   //       console.log("Value of tokenSold",tokenSold);
//   //       console.log("Value of tokenSold",currentmblkAllocation);

//   //     expect(currentmblkAllocation.toString()).to.equal('10000000000000000000');
//   //     // expect(tokenSold.toString()).to.equal('10000000000000000000');
//   //     }); 
//   // });

//         // You can nest describe calls to create subsections.
//         describe("Withdraw the funds collected", function () {
    
//           // If the callback function is async, Mocha will `await` it.
//             it("Only Owner should be able to withdraw the funds collected", async function () {
//                 // check the balance of contract for zogi token before and after the with draw  
//                 // await (IDOContract.connect(addr1).collectUserContribution(addr1.address,'10000000000000000000'))
//                 // await (IDOContract.withDraw('1000000000000000000'));
//               });  
    
//                // If the callback function is async, Mocha will `await` it.
//         it("Correct Only Owner should be able to withdraw the funds collected", async function () {
//               // check the balance of contract for zogi token before and after the with draw  
//             //  await (IDOContract.connect(addr1).collectUserContribution(addr1.address,'10000000000000000000'))
//             //  await expect(IDOContract.connect(addr1).withDraw('1000000000000000000')).to.be.revertedWith('Ownable: caller is not the owner');
//             });  
//         });

//             // You can nest describe calls to create subsections.
//             describe("User Balance increases or not", function () {

//               it("User mapping balance should increase", async function () {
//                 // check the balance of contract for zogi token before and after the with draw  
//                 // await (IDOContract.connect(addr1).collectUserContribution(addr1.address,'1000000000000000000'));
//                 // await (IDOContract.connect(addr1).collectUserContribution(addr1.address,'1000000000000000000'));
//                 // expect(await IDOContract.totalcontributions(addr1.address)).to.equal('4000000000000000000');
      
//               });  
//         }); 

//             // You can nest describe calls to create subsections.
//       describe("Withdraw the funds collected", function () {

//         it("Only Owner should be able to withdraw the funds collected", async function () {
//           // check the balance of contract for zogi token before and after the with draw  

//         });  
//   });

//         // You can nest describe calls to create subsections.
//         describe("Withdraw the funds collected", function () {

//           it("Only Owner should be able to withdraw the funds collected", async function () {
//             // check the balance of contract for zogi token before and after the with draw  
//             // await (IDOContract.connect(addr1).collectUserContribution(addr1.address,'1000000000000000000'));

//             // await IDOContract.withDraw('1000000000000000000')

//             // const afterbalanceOfUser =  await TokenContract.balanceOf(owner.address)
   
//             // expect(afterbalanceOfUser.toString()).to.equal('1000000000000000000');

//           });  
//     });

//     describe("Check Pause Functionality", function () {

//       it("CollectUserContributions Pause Contract", async function () {
        
//         // await IDOContract.pause();
    
//         // await expect(
//         //   IDOContract.connect(addr1).collectUserContribution(addr1.address,'1000000000000000000')).to.be.revertedWith('Pausable: paused'); 
//       });
    
//     });
