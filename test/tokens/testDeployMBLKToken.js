// We import Chai to use its asserting functions here.
const { expect } = require("chai");
const { ethers } = require("hardhat");


let owner;
let addr1;
let addr2;
let TokenOwner;
let TokenContract;

// `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    [owner, addr1, addr2] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens once its transaction has been
    // mined.
    TokenOwner = await ethers.getContractFactory("MBLK");
    TokenContract = await TokenOwner.deploy();
    await TokenContract.mint(owner.address, '1000000000000000000000000000');

  });

// You can nest describe calls to create subsections.
describe("Deployment of MBLK tokens", function () {
  // `it` is another Mocha function. This is the one you use to define your
  // tests. It receives the test name, and a callback function.
 
  // If the callback function is async, Mocha will `await` it.
  it("Should set the right owner of MBLK tokens", async function () {
    // Expect receives a value, and wraps it in an Assertion object. These
    // objects have a lot of utility methods to assert values.
  
    // This test expects the owner variable stored in the contract to be equal
    // to our Signer's owner.
    expect(await TokenContract.owner()).to.equal(owner.address);
  });  
});

describe("Verify snap shot functions of MBLK", function(){
  it("Veriy snapshot balance MBLK", async function(){
    var balanceBefore = await TokenContract.balanceOf(owner.address);

    await TokenContract.snapShot();
    expect(await TokenContract.balanceOfAt(owner.address, 1)).to.equal(balanceBefore);

    await TokenContract.transfer(addr1.address, 1000000);
    var balanceAfter = await TokenContract.balanceOf(owner.address);

    expect(await TokenContract.balanceOfAt(owner.address, 1)) != (balanceAfter);

  })

  it("Only owner can call snapshot", async function(){

    await TokenContract.snapShot();
    
    await expect(
      TokenContract.connect(addr1).snapShot()
      ).to.be.revertedWith("Ownable: caller is not the owner");
    })

});

describe("Transactions of transferFrom of Blacklist Address should panic", function () {

  it("TransferMBLKBlackList", async function () {
    var balance = await TokenContract.balanceOf(addr1.address);
    console.log("BlackList before balance:", balance);
    await TokenContract.transfer(addr1.address, 1000000);
    balance = await TokenContract.balanceOf(addr1.address);
    console.log("BlackList before balance:", balance);
   await TokenContract.connect(addr1).transfer(addr2.address, 100);

    await TokenContract.connect(addr1).approve(addr2.address, 100);
    
    console.log("BlackList allowance before:", await TokenContract.allowance(addr1.address, addr2.address));

    await TokenContract.connect(addr2).transferFrom(addr1.address, addr2.address, 10);

    await TokenContract.blacklistUpdate(addr2.address, true);

    await expect(
        TokenContract.connect(addr2).transferFrom(addr1.address, addr2.address, 10)
      ).to.be.revertedWith("Token transfer refused because Sender is on blacklist");
    console.log("allowance after:", await TokenContract.allowance(addr1.address, addr2.address));

  });

  it("TransferMBLKBlackList from blacklisted user", async function () {
    var balance = await TokenContract.balanceOf(addr1.address);
    var ownerBalance = await TokenContract.balanceOf(owner.address);

    console.log("BlackList before balance:", balance,ownerBalance);
    await TokenContract.transfer(addr1.address, 1000000);
    balance = await TokenContract.balanceOf(addr1.address);
    console.log("BlackList  after tranfer before balance:", balance);
   await TokenContract.connect(addr1).transfer(addr2.address, 100);

    await TokenContract.connect(addr1).approve(addr2.address, 100);
    
    console.log("BlackList allowance before:", await TokenContract.allowance(addr1.address, addr2.address));

    await TokenContract.connect(addr2).transferFrom(addr1.address, addr2.address, 10);

    await TokenContract.blacklistUpdate(addr2.address, true);

    await expect(
        TokenContract.connect(addr2).transferFrom(addr1.address, addr2.address, 10)
      ).to.be.revertedWith("Token transfer refused because Sender is on blacklist");
    console.log("allowance after:", await TokenContract.allowance(addr1.address, addr2.address));

  });

//   describe("Transactions of transferFrom of Non-Blacklisted ETH Address", function () {
//     it("TransferMBLK", async function () {
//       var balance = await TokenContract.balanceOf(addr1.address);

//       // blacklist a user
//       // send money to him
//       // try sending money from user to owner address 
      
//       console.log("before balance:", balance);
      
//       await TokenContract.transfer(addr1.address, 1000000);
      
//       balance = await TokenContract.balanceOf(addr1.address);
      
//       console.log("before balance:", balance);
   
//       await TokenContract.connect(addr1).approve(addr2.address, 100);
      
//       console.log("allowance before:", await TokenContract.allowance(addr1.address, addr2.address));
  
//       await TokenContract.connect(addr2).transferFrom(addr1.address, addr2.address, 10);
      
//       await TokenContract.blacklistUpdate(addr2.address, true);
      
//       await TokenContract.blacklistUpdate(addr2.address, false);
      
//       const response =  await TokenContract.connect(addr2).transferFrom(addr1.address, addr2.address, 10);

//       console.log("allowance after:", await TokenContract.isBlackListed(addr2.address));
  
//         });
//     });

    // describe("Transactions of transfer of Blacklist Address", function () {
    //     it("TransferMBLK", async function () {
    //       var balance = await TokenContract.balanceOf(addr1.address);
          
    //       console.log("before balance:", balance);
          
    //       await TokenContract.transfer(addr1.address, 1000000);
          
    //       balance = await TokenContract.balanceOf(addr1.address);
          
    //       console.log("before balance:", balance);
      
    //       await TokenContract.connect(addr1).approve(addr2.address, 100);
          
    //       console.log("allowance before:", await TokenContract.allowance(addr1.address, addr2.address));
      
    //       await TokenContract.connect(addr2).transferFrom(addr1.address, addr2.address, 10);
          
    //       await TokenContract.blacklistUpdate(addr2.address, true);
          
    //       await TokenContract.blacklistUpdate(addr2.address, false);
          
    //       const response =  await TokenContract.connect(addr2).transferFrom(addr1.address, addr2.address, 10);
    
    //       console.log("allowance after:", await TokenContract.isBlackListed(addr2.address));
      
    //         });
    //     });

    // describe("Transactions of transfer of Non-Blacklisted Address", function () {
    //     it("TransferMBLKTransfer", async function () {
    //       var balance = await TokenContract.balanceOf(addr1.address);
          
    //       console.log("before balance:", balance);
          
    //       await TokenContract.transfer(addr1.address, 1000000);
          
    //       balance = await TokenContract.balanceOf(addr1.address);
          
    //       console.log("before balance:", balance);      
          
    //       console.log("allowance before:", await TokenContract.allowance(addr1.address, addr2.address));
      
    //       await TokenContract.blacklistUpdate(addr1.address, true);
    //       await expect(
    //         TokenContract.connect(addr1).transfer(addr2.address, 10)
    //                   ).to.be.revertedWith("Token transfer refused because Sender is on blacklist");

    //       await TokenContract.blacklistUpdate(addr2.address, false);
    
    //       });
    //     });

    // describe("Transactions of simple transfer", function () {
    //     it("TransferMBLKTransferSucess", async function () {
    //       var balance = await TokenContract.balanceOf(addr1.address);
          
    //       console.log("before balance:", balance);
          
    //       await TokenContract.transfer(addr1.address, 1000000);
          
    //       balance = await TokenContract.balanceOf(addr1.address);
          
    //       console.log("before balance:", balance);      
          
    //       console.log("allowance before:", await TokenContract.allowance(addr1.address, addr2.address));
          
    //       await TokenContract.connect(addr1).transfer(addr2.address, 10);
          
    //       await TokenContract.blacklistUpdate(addr1.address, true);
          
    //       await TokenContract.blacklistUpdate(addr2.address, false);
          
    //       console.log("successfully transfer");
      
    //         });
    //     });


    // describe("Transactions of Extract all tokens of Blacklisted address by admin", function () {
    //     it("TransferMBLKExtractAdmin", async function () {
    //         var balance = await TokenContract.balanceOf(addr1.address);
            
    //         console.log("BlackList before balance:", balance);
            
    //         await TokenContract.transfer(addr1.address, 1000000);

    //         await TokenContract.blacklistUpdate(addr1.address, true);
            
    //         var balance = await TokenContract.balanceOf(addr1.address);
            
    //         console.log("after balance:", balance)

    //         await TokenContract.transferFrom(addr1.address, owner.address, 1000000);
            
    //         balance = await TokenContract.balanceOf(addr1.address);
            
    //         console.log("before balance:", balance);   
    //         });
    //     });

    // describe("Transactions of Extract all tokens of Blacklisted address by non-admin", function () {
    //     it("TransferMBLKExtract", async function () {
    //         var balance = await TokenContract.balanceOf(addr1.address);
    //         console.log("BlackList before balance:", balance);
    //         await TokenContract.transfer(addr1.address, 1000000);

        
    //         var balance = await TokenContract.balanceOf(addr1.address);
    //         console.log("after balance:", balance);
    //         await expect(
    //               TokenContract.transferFrom(addr1.address, owner.address, 1000000)
    //           ).to.be.revertedWith("ERC20: insufficient allowance");
    //         balance = await TokenContract.balanceOf(addr1.address);
    //         console.log("before balance:", balance);
    //         });
    //     });
});