// // We import Chai to use its asserting functions here.
// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// let owner;
// let addr1;
// let addr2;
// let BezogeToken;
// let BezogeEarth;
// let ZogiToken;
// let ZogiTokenWallet;
// let ConversionContract;
// let ConversionWallet;

// // `beforeEach` will run before each test, re-deploying the contract every
//   // time. It receives a callback, which can be async.
//   beforeEach(async function () {
//     const minWrapAmount = 100;

//     // Get the ContractFactory and Signers here.
//     [owner, addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners();

//     // To deploy our contract, we just have to call Token.deploy() and await
//     // for it to be deployed(), which happens once its transaction has been
//     // mined.
//     BezogeToken = await ethers.getContractFactory("BezosEarth");
//     BezogeEarth = await BezogeToken.deploy();

//     ZogiToken = await ethers.getContractFactory("ZOGI");
//     ZogiTokenWallet = await ZogiToken.deploy();

//     ConversionContract = await ethers.getContractFactory("Conversion");
//     ConversionWallet = await ConversionContract.deploy();
//     var decimals = 1000000;
//     await ConversionWallet.init(BezogeEarth.address, ZogiTokenWallet.address, minWrapAmount, decimals);
//     await ZogiTokenWallet.setAdmin(ConversionWallet.address, true);

//   });

// // All the testcases of Conversion Contract
// describe("Conversion Contract Wrap", function () {
 
//   // Conversion Contract Approve and Wrap Bezoge to get Zogis
//   // Test Circulating Zogi and Balance of Zogi is according to formula
//   it("ConversionContract Simple WrapBezoge", async function () {
//     const amount = "100000000000" // random value
//     const approveAmount = "1000000000000"
    
//     expect(await ZogiTokenWallet.isAdmin(ConversionWallet.address)).to.equal(true);
//     await BezogeEarth.approve(ConversionWallet.address, approveAmount);

//     await ConversionWallet.wrapBezoge(amount.toString()); 
    
//     let CirculatingZogi = await ConversionWallet.circulatingZogi();
//     // first time wrap equals same amount
//     expect(parseInt(CirculatingZogi)).to.equal(parseInt(amount)*0.98);
//     expect(await ZogiTokenWallet.balanceOf(owner.address)).to.equal(parseInt(CirculatingZogi));

//   }).timeout(100000);
// });
  
// // You can nest describe calls to create subsections.
// describe("Check renounce Ownership Zogi", function () {
//   // `it` is another Mocha function. This is the one you use to define your
//   // tests. It receives the test name, and a callback function.
 
//   // Check renounce Ownership
//   it("Check renounce Ownership Zogi", async function () {
    
//     await expect(
//       ConversionWallet.renounceOwnership()
//    ).to.be.revertedWith("can't renounceOwnership here");

//   });
// });

// describe("Conversion Contract Wrap with Minimum Amount", function () {

//   // Conversion Contract Minimum wrap amount test
//   // Result should be revert while calling Wrap Bezoge Function
//   it("ConversionContract Simple WrapBezoge Test min wrap Amount", async function () {
//     const amount = "99" // random value
//     const approveAmount = "1000000000000"
//     await BezogeEarth.approve(ConversionWallet.address, approveAmount);
//     await expect(ConversionWallet.wrapBezoge(amount.toString())).to
//     .be.revertedWith('Can not convert less than min limit');

//   }).timeout(100000);
// });

// describe("Conversion Contract non Admin while Paused", function () {

//   // Conversion Contract Minimum wrap amount test
//   // Result should be revert while calling Wrap Bezoge Function
//   it("ConversionContract Simple WrapBezoge with non Admin while paused", async function () {
//     const amount = "99" // random value
//     const approveAmount = "1000000000000"
//     await BezogeEarth.approve(ConversionWallet.address, approveAmount);
//     await ConversionWallet.pause()
//     await expect(ConversionWallet.wrapBezoge(amount.toString())).to
//     .be.revertedWith('Pausable: paused');

//   }).timeout(100000);
// });

// describe("Conversion Contract Admin while Paused", function () {

//   // Conversion Contract Minimum wrap amount test
//   // Result should be revert while calling Wrap Bezoge Function
//   it("ConversionContract Simple WrapBezoge with Admin while paused", async function () {
//     const amount = "100000000000" // random value
//     const approveAmount = "1000000000000"
//     await BezogeEarth.approve(ConversionWallet.address, approveAmount);
//     await ConversionWallet.pause()
//     await ConversionWallet.wrapBezogeAdmin(amount.toString())
//     console.log(await ZogiTokenWallet.balanceOf(owner.address))
//     expect(await ZogiTokenWallet.balanceOf(owner.address)).to.equal("98000000000");

//   }).timeout(100000);
// });

// describe("Conversion Contract Test Circulating Zogi", function () {

//   // Test Conversion Contract Wrap Bezoge using Formula to check accuracy of answer in Contract
//   it("ConversionContract CirculatingZogi after Wrapping", async function () {
//     const amount = "100000000000" // random value
//     const approveAmount = "1000000000000"
//     let balanceToWrap = amount;

//     await BezogeEarth.approve(ConversionWallet.address, approveAmount);
//     await ConversionWallet.wrapBezoge(balanceToWrap.toString()); 
    
//     let ContractBezogeBalance = await BezogeEarth.balanceOf(ConversionWallet.address);
//     let CirculatingZogi = await ConversionWallet.circulatingZogi()
    
//     let zogiAmount = (amount*0.98)*CirculatingZogi/ContractBezogeBalance; // Unitary Method to calculate Zogi Amount

//     // wrap again to verify estimated Circulated Zogi
//     await ConversionWallet.wrapBezoge(balanceToWrap.toString());
    
//     let updateCirculatingZogi = await ConversionWallet.circulatingZogi();
//     let balanceOwner = await ZogiTokenWallet.balanceOf(owner.address);
   
//     expect((Math.round(zogiAmount))).to.equal(parseInt(updateCirculatingZogi)-parseInt(CirculatingZogi));
//     expect(Math.round(balanceOwner)).to.equal(parseInt(updateCirculatingZogi));

//   }).timeout(100000);
// });
  
// describe("Conversion Contract Test Circulating Zogi Multiple Time(loop)", function () {

//   // Test Conversion Contract Wrap Bezoge using Formula to check accuracy of answer in Contract in a loop
//   it("ConversionContract Circulating Zogi after WrapBezoge in Loop", async function () {
//     let loopNum = 20;
//     const amount = "100000000000"; // random value
//     const approveAmount = await BezogeEarth.totalSupply();
//     let balanceToWrap = amount;
//     let arr = Array.from(Array(loopNum).keys());

//     await BezogeEarth.approve(ConversionWallet.address, approveAmount);
//     await ConversionWallet.wrapBezoge(balanceToWrap.toString()); 
//     let CirculatingZogi = 0; // used in loop
    
//     for(i of arr) {
//       let ContractBezogeBalance = await BezogeEarth.balanceOf(ConversionWallet.address);
//       let CirculatingZogi = await ConversionWallet.circulatingZogi()
//       let UnitZogiPrice = (amount*0.98)*CirculatingZogi/ContractBezogeBalance; // Unitary Method to calculate Zogi Price
//       let CirculatingZogiBefore = await ConversionWallet.circulatingZogi()

//       await ConversionWallet.wrapBezoge(balanceToWrap.toString());
      
//       let CirculatingZogiAfterWrapping = await ConversionWallet.circulatingZogi();
//       // price calculated by formula should be equal to Ciculation of prev transaction
//       expect(Math.round(UnitZogiPrice)).to.equal(CirculatingZogiAfterWrapping-CirculatingZogiBefore);

//       let balanceOwner = await ZogiTokenWallet.balanceOf(owner.address);
//       expect(Math.round(balanceOwner)).to.equal(parseInt(CirculatingZogiAfterWrapping));

//       CirculatingZogi = parseInt(CirculatingZogiAfterWrapping)-parseInt(CirculatingZogiBefore);
      
//     }

//   }).timeout(100000);
// });

// describe("Conversion Contract Unwrap Bezoge", function () {

//   // Test Conversion Contract UnWrap Bezoge using Formula to check accuracy of answer in a Contract
//   it("ConversionContract CirculatingZogi after UnWrapBezoge", async function () {
//     const amount = "100000000000" // random value
//     const approveAmount = "1000000000000"
//     let balanceToWrap = amount;

//     await BezogeEarth.approve(ConversionWallet.address, approveAmount);
//     await ConversionWallet.wrapBezoge(balanceToWrap.toString()); 
    
//     let ContractBezogeBalance = await BezogeEarth.balanceOf(ConversionWallet.address);
//     let CirculatingZogi = await ConversionWallet.circulatingZogi()
//     let zogiPrice = (amount*0.98)*CirculatingZogi/ContractBezogeBalance; // Unitary Method to calculate Zogi one Price
//     let previousCirculatingZogi = await ConversionWallet.circulatingZogi()

//     // wrap again to verify estimated Circulated Zogi
//     await ConversionWallet.wrapBezoge(balanceToWrap.toString());
    
//     let circulatingZogi  = await ConversionWallet.circulatingZogi();

//     expect(Math.round(zogiPrice)).to.equal(circulatingZogi-previousCirculatingZogi);

//     circulatingZogi = await ConversionWallet.circulatingZogi();

//     await ZogiTokenWallet.approve(ConversionWallet.address, balanceToWrap.toString());
//     await ConversionWallet.unWrapBezoge(balanceToWrap.toString());
  
//     circulatingZogi = await ConversionWallet.circulatingZogi();

//   }).timeout(100000);
// });

// describe("Conversion Contract Test Unwrap Bezoge in loop", function () {

//   // Test Conversion Contract UnWrap Zogi using Formula to check accuracy of answer in a Contract in a loop
//   it("ConversionContract CirculatingZogi after UnWrapBezoge(circulating supply after unwrapping should be less) in Loop ", async function () {
//     let loopNum = 10;
//     const amount = "100000000"; // random value

//     const approveAmount = await BezogeEarth.totalSupply();
//     let balanceToWrap = "1000000000000";
//     let balanceToUnWrap = amount;

//     let arr = Array.from(Array(loopNum).keys());

//     await BezogeEarth.approve(ConversionWallet.address, approveAmount);
//     await ConversionWallet.wrapBezoge(balanceToWrap.toString()); 

//     let previousCirculatingZogi = 1000000000000;
    
//     for(i of arr) { 

//       await ZogiTokenWallet.approve(ConversionWallet.address, balanceToWrap.toString());
//       // wrap again to verify estimated Circulated Zogi
//       await ConversionWallet.unWrapBezoge(balanceToUnWrap.toString());

//       let CirculatingZogi = await ConversionWallet.circulatingZogi();
//       expect(parseInt(CirculatingZogi)).to.lessThan(parseInt(previousCirculatingZogi));
//       previousCirculatingZogi = CirculatingZogi;
//     }
//   }).timeout(100000); 
// });

// describe("Conversion Contract Test Total Balance Unwrap ", function () {

//   // Test Conversion Contract UnWrap all zogis to check all balance unwrapping
//   it("ConversionContract Check Calculations with Wrap and Unwrap", async function () {
//     await BezogeEarth.transfer(addr1.address, await BezogeEarth.totalSupply());
//     await BezogeEarth.connect(addr2).approve(ConversionWallet.address, "100000000000");
//     await BezogeEarth.connect(addr1).transfer(addr2.address, "200000000");

//     // Wrapping
//     let balanceaddr2 = await BezogeEarth.balanceOf(addr2.address);
//     await ConversionWallet.connect(addr2).wrapBezoge(balanceaddr2.toString());

//     ZogiBalanceuser2 = await ZogiTokenWallet.balanceOf(addr2.address);
//     let circulating = await ConversionWallet.circulatingZogi();

//     expect(ZogiBalanceuser2).to.equal("192080000");
//     expect(circulating).to.equal("192080000");

//     await ZogiTokenWallet.connect(addr2).approve(ConversionWallet.address, ZogiBalanceuser2.toString());
    
//       // Unwrapping
//     await ConversionWallet.connect(addr2).unWrapBezoge(ZogiBalanceuser2.toString());
    
//     expect(await ZogiTokenWallet.balanceOf(addr2.address)).to.equal("0");
//     expect(await ConversionWallet.circulatingZogi()).to.equal("0");

//   });
// });

// describe("Conversion Contract Percentage Testcases ", function () {

//   // Test Conversion Contract to check percentage function of Contract
//   it("ConversionContract Test Function Calculate Percentage", async function () {
    
//     let result = await ConversionWallet.calculatePercentage("1920800001075648","19208000010756480000");
//     console.log("Answer should be 10000 and result is:",result)
//     expect(parseInt(result)).to.equal(10000);

//   });

//   // Test Conversion Contract to check percentage function of Contract
//   it("ConversionContract Calculate Percentage Exclude Points", async function () {
    
//     let result = await ConversionWallet.calculatePercentage(98000,"19204000");
//     console.log("Answer should be 510310 and result is:",result)
//     expect(parseInt(result)).to.equal(510310);

//   });

//   // Test Conversion Contract to check percentage function of Contract
//   it("ConversionContract Calculate Percentage ExcludePoints", async function () {
    
//     let result = await ConversionWallet.calculateValueOfPercentage(ConversionWallet.calculatePercentage(98,100),"88892049");
//     console.log("Answer should be 87114208.02 and result is:", result);
//     expect(parseInt(result)).to.equal(87114208);

//   });
//   // Test Conversion Contract to check percentage function of Contract with zero total value
//   it("ConversionContract Calculate Percentage Zero Parameter", async function () {
  
//     let result = await ConversionWallet.calculatePercentage(ConversionWallet.calculatePercentage(98,100),"0");
//     console.log("Answer should be 0 and result is:", result);
//     expect(parseInt(result)).to.equal(0);

//   });
// });

