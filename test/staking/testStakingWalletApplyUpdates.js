// const { expect } = require("chai");
// const { ethers } = require("hardhat");


// describe("Token contract", function () {
//   it("Deployment should assign the total supply of tokens to the owner", async function () {
//     const [owner, addr1, addr2, addr3] = await ethers.getSigners();
//     console.log("Owner Address:", owner.address);
//     console.log("Addr1 Address:", addr1.address);
//     console.log("Addr2 Address:", addr2.address);

//     const Token = await ethers.getContractFactory("StakingWallet");
//     const hardhatToken = await Token.deploy();

//     const resp = await hardhatToken.initData(addr1.address, 1, [owner.address]) //,addr2.address
//     const response = await hardhatToken.isSignatory(addr2.address);
//     const responseOwner = await hardhatToken.isSignatory(owner.address);

//   //  expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
//     console.log("Address 2 isSignatory before update: ", response);
//     console.log("responseOwner isSignatiry before update:",responseOwner);
//     const beforeSign = await hardhatToken.getSignatories();
//     console.log("beforeSignatories:", beforeSign);

//     var getone = await hardhatToken.getApplyOfSignatories(0);
//     console.log("getone:", getone);
//     // var gettwo = await hardhatToken.getApplyOfSignatories(2);
//     // console.log("gettwo:", gettwo);

//     await hardhatToken.applyForUpdateSignatories(2, [owner.address, addr1.address]);
//     const responseSig = await hardhatToken.isSignatory(addr2.address);
//     const responseOwnerAfter = await hardhatToken.isSignatory(owner.address);


//     console.log("responseOwner isSignatory After update:",responseOwnerAfter);

//     console.log("Address 2 isSignatory after update: ", responseSig);

//     var gettwo = await hardhatToken.getApplyOfSignatories(1);
//     //console.log("gettwo:", gettwo);
//     const sign = await hardhatToken.signUpdateSignatories(1);
//     //console.log("sign:",sign)
//     const rrr = await hardhatToken.updateSignatories(1);
//     const AfterSign = await hardhatToken.getSignatories();
//     console.log("AfterSignatories:", AfterSign);

//     console.log("Deploying contracts with the account:", owner.address, response);
    
//   });
// });