// // We import Chai to use its asserting functions here.
// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// let owner;
// let addr1;
// let addr2;
// let usdtContract;
// let zogiContract;
// let IDOContract;

//   // `beforeEach` will run before each test, re-deploying the contract every
//   // time. It receives a callback, which can be async.
//   beforeEach(async function () {
//     // Get the ContractFactory and Signers here.
//     [owner, addr1, addr2] = await ethers.getSigners();
//     summonContract = await ethers.getContractFactory("Summoning");
//     SummonContract = await summonContract.deploy();
 
//   });

//   // generation 0-10
//   // summon count = > 0-20 
//   // truncate 17 decimals

// // All the testcases of Conversion Contract
// describe("Test summoningCost Generation 0-10 summonCount 0-20 totalSupply 4096", function () {
 
//   // Conversion Contract Approve and Wrap Bezoge to get Zogis
//   // Test Circulating Zogi and Balance of Zogi is according to formula
//   it("summon cost formula Generation 1 summonCount 1 totalSupply 4096", async function () {

//     const costValue = await SummonContract.getSummonCost(1,1,4096);
//     const trucatedValue = costValue.toString().slice(0, -17);

//     await expect(trucatedValue).to.equal('1155');

//     }).timeout(100000);
// });

// // All the testcases of Conversion Contract
// describe("Test summoningCost Generation 2 summonCount 2 totalSupply 4098", function () {
 
//   // Conversion Contract Approve and Wrap Bezoge to get Zogis
//   // Test Circulating Zogi and Balance of Zogi is according to formula
//   it("summon cost formula Generation 2 summonCount 2 totalSupply 4098", async function () {

//     const costValue = await SummonContract.getSummonCost(2,2,4098);
//     console.log("782300000000000000000".slice(0,-17));

//     const trucatedValue = costValue.toString().slice(0, -17);

//     await expect(trucatedValue).to.equal('1334');

//     }).timeout(100000);
// });

// // All the testcases of Conversion Contract
// describe("Test summoningCost Generation 5 summonCount 18 totalSupply 5000", function () {
 
//   // Conversion Contract Approve and Wrap Bezoge to get Zogis
//   // Test Circulating Zogi and Balance of Zogi is according to formula
//   it("summon cost formula Generation 5 summonCount 18 totalSupply 4098", async function () {

//     const costValue = await SummonContract.getSummonCost(5,18,4098);

//     const trucatedValue = costValue.toString().slice(0, -17);

//     await expect(trucatedValue).to.equal('7096');

//     }).timeout(100000);
// });

// // All the testcases of Conversion Contract
// describe("Test summoningCost Generation 7 summonCount 18 totalSupply 5000", function () {
 
//   // Conversion Contract Approve and Wrap Bezoge to get Zogis
//   // Test Circulating Zogi and Balance of Zogi is according to formula
//   it("summon cost formula Generation 7 summonCount 18 totalSupply 5000", async function () {

//     const costValue = await SummonContract.getSummonCost(7,18,5000);

//     const trucatedValue = costValue.toString().slice(0, -17);

//     await expect(trucatedValue).to.equal('8060');

//     }).timeout(100000);
// });


// // All the testcases of Conversion Contract
// describe("Test summoningCost Generation 10 summonCount 20 totalSupply 5000", function () {
 
//   // Conversion Contract Approve and Wrap Bezoge to get Zogis
//   // Test Circulating Zogi and Balance of Zogi is according to formula
//   it("summon cost formula Generation 10 summonCount 20 totalSupply 5000", async function () {

//     const costValue = await SummonContract.getSummonCost(10,20,5000);

//     const trucatedValue = costValue.toString().slice(0, -17);

//     await expect(trucatedValue).to.equal('11291');

//     }).timeout(100000);
// });


// // describe("Test summoningCost Generation 2 summonCount 3 totalSupply 4098", function () {
 
// //   // Conversion Contract Approve and Wrap Bezoge to get Zogis
// //   // Test Circulating Zogi and Balance of Zogi is according to formula
//   it("summon cost formula Generation 2 summonCount 3 totalSupply 4098", async function () {

//     const costValue = await SummonContract.getSummonCost(2,3,4098);
//     console.log("146700000000000000000".slice(0,-17));

//     const trucatedValue = costValue.toString().slice(0, -17);

//     await expect(trucatedValue).to.equal('1467');

//     }).timeout(100000);
    

//  // All the testcases of Conversion Contract
// describe("Test summoning cost", function () {
 
//     // Conversion Contract Approve and Wrap Bezoge to get Zogis
//     // Test Circulating Zogi and Balance of Zogi is according to formula
//     it("summon cost formula", async function () {
    
//     const costValue = await SummonContract.getSummonCost(2,1,4096);
//     const trucatedValue = costValue.toString().slice(0, -17);
//     await expect((await SummonContract.getSummonCost(70,60,4096)).toString()).to.equal('926428793243811222793327');

//       }).timeout(100000);
//   });


// // // All the testcases of Conversion Contract
// describe("Test summoning cost 45 45", function () {
 
//   // Conversion Contract Approve and Wrap Bezoge to get Zogis
//   // Test Circulating Zogi and Balance of Zogi is according to formula
//   it("summon cost formula 45 45", async function () {

//     await expect((await SummonContract.getSummonCost(45,45,4096)).toString()).to.equal('65492156398211052338917');

//     }).timeout(100000);
// });

// //       // All the testcases of Conversion Contract
//       describe("Test summoning cost 45 30", function () {
 
//         // Conversion Contract Approve and Wrap Bezoge to get Zogis
//         // Test Circulating Zogi and Balance of Zogi is according to formula
//         it("summon cost formula 45 30", async function () {
      
//           await expect((await SummonContract.getSummonCost(45,30,4096)).toString()).to.equal('15678301537773529650342');
           
//           }).timeout(100000);
//       });


// describe("Test summoning cost 30 25", function () {
 
//         // Conversion Contract Approve and Wrap Bezoge to get Zogis
//         // Test Circulating Zogi and Balance of Zogi is according to formula
//         it("summon cost formula 30 25", async function () {
      
//           await expect((await SummonContract.getSummonCost(30,25,4096)).toString()).to.equal('4682697473902690743456');
      
//           }).timeout(100000);
//       });


//       describe("Test summoning cost 80 25", function () {
 
//         // Conversion Contract Approve and Wrap Bezoge to get Zogis
//         // Test Circulating Zogi and Balance of Zogi is according to formula
//         it("summon cost formula 80 25", async function () {
      
//           await expect((await SummonContract.getSummonCost(80,25,4096)).toString()).to.equal('53698364008980965979337');
      
//           }).timeout(100000);
//       });

//       describe("Test summoning cost 5 25", function () {

//         // Conversion Contract Approve and Wrap Bezoge to get Zogis
//         // Test Circulating Zogi and Balance of Zogi is according to formula
//         it("summon cost formula 5 25", async function () {
      
//           await expect((await SummonContract.getSummonCost(5,25,4096)).toString()).to.equal('1382813543065574377845');
      
//           }).timeout(100000);
//       });

//       describe("Test summoning cost 70 80", function () {
 
//         // Conversion Contract Approve and Wrap Bezoge to get Zogis
//         // Test Circulating Zogi and Balance of Zogi is according to formula
//         it("summon cost formula 70 80", async function () {
      
//           await expect((await SummonContract.getSummonCost(70,80,4096)).toString()).to.equal('6232549659601515521396041');
      
//           }).timeout(100000);
//       });

//       describe("Test summoning cost 80 80", function () {
 
//         // Conversion Contract Approve and Wrap Bezoge to get Zogis
//         // Test Circulating Zogi and Balance of Zogi is according to formula
//         it("summon cost formula 80 80", async function () {
      
//           await expect((await SummonContract.getSummonCost(80,80,4096)).toString()).to.equal('10152166651648478977726583');
      
//           }).timeout(100000);
//       });

//       describe("Test summoning cost 70 70", function () {
 
//         // Conversion Contract Approve and Wrap Bezoge to get Zogis
//         // Test Circulating Zogi and Balance of Zogi is according to formula
//         it("summon cost formula 70 70", async function () {
      
//           await expect((await SummonContract.getSummonCost(70,70,4096)).toString()).to.equal('2402917697295676924634630');
      
//           }).timeout(100000);
//       });

//       describe("Test summoning cost 40 40", function () {
 
//         // Conversion Contract Approve and Wrap Bezoge to get Zogis
//         // Test Circulating Zogi and Balance of Zogi is according to formula
//         it("summon cost formula 40 40", async function () {
      
//           await expect((await SummonContract.getSummonCost(40,40,4096)).toString()).to.equal('31862464831912296640295');
          
//           }).timeout(100000);
//       });


//       describe("Test summoning cost 30 20", function () {
 
//         // Conversion Contract Approve and Wrap Bezoge to get Zogis
//         // Test Circulating Zogi and Balance of Zogi is according to formula
//         it("summon cost formula 30 20", async function () {
      
//           await expect((await SummonContract.getSummonCost(30,20,4096)).toString()).to.equal('2907586710981422649985');
          
//           }).timeout(100000);
//       });

//       describe("Test summoning cost 70 60", function () {
 
//         // Conversion Contract Approve and Wrap Bezoge to get Zogis
//         // Test Circulating Zogi and Balance of Zogi is according to formula
//         it("summon cost formula 70 60", async function () {
      
//           await expect((await SummonContract.getSummonCost(70,60,4096)).toString()).to.equal('926428793243811222793327');
          
//           }).timeout(100000);
//       });



