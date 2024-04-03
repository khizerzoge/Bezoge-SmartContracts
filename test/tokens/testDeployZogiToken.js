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
    TokenOwner = await ethers.getContractFactory("ZOGI");
    TokenContract = await TokenOwner.deploy();
  });

// You can nest describe calls to create subsections.
describe("Deployment of ZOGI", function () {
  // `it` is another Mocha function. This is the one you use to define your
  // tests. It receives the test name, and a callback function.
 
  // If the callback function is async, Mocha will `await` it.
  it("Should set the right owner of ZOGI", async function () {
    // Expect receives a value, and wraps it in an Assertion object. These
    // objects have a lot of utility methods to assert values.
  
    // This test expects the owner variable stored in the contract to be equal
    // to our Signer's owner.
    expect(await TokenContract.owner()).to.equal(owner.address);
  });  
});

// You can nest describe calls to create subsections.
describe("Check renounce Ownership Token", function () {
  // `it` is another Mocha function. This is the one you use to define your
  // tests. It receives the test name, and a callback function.
 
  // Check renounce Ownership
  it("Check renounce Ownership Token", async function () {

    await expect(
      TokenContract.renounceOwnership()
   ).to.be.revertedWith("can't renounceOwnership here");

  });
});

// Verify Snapshot functionality of a Contract
// Check Owner's balance of a snapshot
describe("Verify snap shot functions", function() {

  it("Verify snapshot balance", async function(){
    var balanceBefore = await TokenContract.balanceOf(owner.address);
    await TokenContract.snapShot();
    
    expect(await TokenContract.balanceOfAt(owner.address, 1)).to.equal(balanceBefore);

    await TokenContract.mint(owner.address, 1000000);
    var balanceAfter = await TokenContract.balanceOf(owner.address);

    expect(await TokenContract.balanceOfAt(owner.address, 1)) != (balanceAfter);
    expect(parseInt(await TokenContract.getCurrentSnapshotId()) == 1);

  })

  // Check only owner can use Snapshot
  it("Only owner can call snapshot", async function(){

    await TokenContract.snapShot();
    await expect(
      TokenContract.connect(addr1).snapShot()
      ).to.be.revertedWith("Ownable: caller is not the owner");
    })

});

// Check Blacklist Functionality. Blacklisted user can't transfer to other address
describe("Transactions of transferFrom of Blacklist Address should panic", function () {
  it("TransferMZOGIBlackList", async function () {
    var balance = await TokenContract.balanceOf(addr1.address);

    await TokenContract.mint(addr1.address, 1000000);
    balance = await TokenContract.balanceOf(addr1.address);

    await TokenContract.connect(addr1).approve(addr2.address, 100);
    
    await TokenContract.allowance(addr1.address, addr2.address);

    await TokenContract.connect(addr2).transferFrom(addr1.address, addr2.address, 10);

    await TokenContract.blacklistUpdate(addr2.address, true);

    await expect(
        TokenContract.connect(addr2).transferFrom(addr1.address, addr2.address, 10)
      ).to.be.revertedWith("Token transfer refused because Sender is on blacklist");

  });

  // Check Blacklist Functionality. 
  // owner will transfer Blacklister user Balance to other address
  describe("Transactions of transfer balance of Blacklisted Address by Any USER", function () {

    it("TransferZOGI", async function () {
      
      await TokenContract.mint(addr2.address, 1000000);

      // Blacklisted address 2
      await TokenContract.blacklistUpdate(addr2.address, true);
      
      var balance = await TokenContract.balanceOf(addr2.address);

      await TokenContract.connect(addr2).approve(addr1.address, parseInt(balance));
      
      await expect(
         TokenContract.connect(addr1).transferFrom(addr2.address, owner.address, parseInt(balance))
      ).to.be.revertedWith('Token transfer refused because Sender is on blacklist');

      await TokenContract.blacklistUpdate(addr2.address, false);
    
    });

  });

    // Check Blacklist transferFrom Function. 
    // Check only owner can transfer Blacklister user Balance to other address
    describe("Transactions of transfer balance of Blacklisted Address by Admin", function () {

      it("TransferZOGI", async function () {
        
        await TokenContract.mint(addr2.address, 1000000);

        // Blacklisted address 2
        await TokenContract.blacklistUpdate(addr2.address, true);
        
        var balance = await TokenContract.balanceOf(addr2.address);

        await TokenContract.connect(addr2).approve(addr1.address, parseInt(balance));

        await TokenContract.transferFrom(addr2.address, owner.address, parseInt(balance));

        await TokenContract.balanceOf(addr2.address);

        await TokenContract.blacklistUpdate(addr2.address, false);
      
      });

    });

    // Check Blacklisted address transfer functionality 
    // should revert
    describe("Transactions of transfer of Non-Blacklisted Address", function () {
        it("TransferZOGITransfer", async function () {
          var balance = await TokenContract.balanceOf(addr1.address);
          
          console.log("before balance:", balance);
          
          await TokenContract.mint(addr1.address, 1000000);
          
          balance = await TokenContract.balanceOf(addr1.address);
          
          console.log("before balance:", balance);      
          
          await TokenContract.allowance(addr1.address, addr2.address);
      
          await TokenContract.blacklistUpdate(addr1.address, true);
          await expect(
            TokenContract.connect(addr1).transfer(addr2.address, 10)
                      ).to.be.revertedWith("Token transfer refused because Sender is on blacklist");

          await TokenContract.blacklistUpdate(addr2.address, false);
    
        });
    });

    //  Test Simple Transfer of ZOGI from one account to another  
    describe("Transactions of simple transfer ZOGI", function () {
        it("TransferZOGITransferSucess", async function () {
          await TokenContract.balanceOf(addr1.address);
                    
          await TokenContract.mint(addr1.address, 1000000);
          
          await TokenContract.balanceOf(addr1.address);
                    
          await TokenContract.allowance(addr1.address, addr2.address);
          
          await TokenContract.connect(addr1).transfer(addr2.address, 10);
          
          await expect(TokenContract.balanceOf(addr2.address) == "10")
          await expect(TokenContract.balanceOf(addr1.address) == "999990")

          console.log("successfully transfer");
      
          });
      });

    //  Test Extracting all token of non-blacklisted and blacklisted address by admin
    // Should revert because admin can only extract balance of blacklisted address
    describe("Transactions of Extract all tokens of Non-Blacklisted address by admin", function () {
        it("TransferZOGIExtractAdmin", async function () {
            var balance = await TokenContract.balanceOf(addr1.address);
            
            console.log("BlackList before balance:", balance);
            
            await TokenContract.mint(addr1.address, 1000000);
            
            var balance = await TokenContract.balanceOf(addr1.address);
            
            console.log("after balance:", balance)

            await expect(
               TokenContract.transferFrom(addr1.address, owner.address, 1000000)
            ).to.be.revertedWith('ERC20: insufficient allowance');
            
            balance = await TokenContract.balanceOf(addr1.address);
            
            await expect(TokenContract.balanceOf(owner.address) == "1000000")

            });
        });

    //  Test Extracting all token of non-blacklisted and blacklisted address by Non admin(Any other user)
    //  Should revert because non-admin cannot extract balance of blacklisted address
    describe("Transactions of Extract all tokens of Blacklisted address by non-admin", function () {
        it("TransferZOGIExtract", async function () {
            var balance = await TokenContract.balanceOf(addr1.address);
            await TokenContract.mint(addr1.address, 1000000);

            var balance = await TokenContract.balanceOf(addr1.address);
            await expect(
                  TokenContract.transferFrom(addr1.address, owner.address, 1000000)
              ).to.be.revertedWith("ERC20: insufficient allowance");
            balance = await TokenContract.balanceOf(addr1.address);
            console.log("before balance:", balance);
            });
        });

    // Test Transaction Pause Unpause Functionality 
    describe("Transactions Paused Unpaused", function () {
      it("TransferZOGIPauseUnpause", async function () {
        
          await TokenContract.mint(addr1.address, 500000);
          // await TokenContract.approve(ConversionWallet.address, 500000);

          await TokenContract.pause();
          await expect(
              TokenContract.mint(owner.address, 500000)
           ).to.be.revertedWith("Pausable: paused");
          await TokenContract.unpause();

          await TokenContract.mint(addr1.address, 500000);
          expect(await TokenContract.balanceOf(addr1.address)).to.equal("1000000");
          
          await expect(
            await TokenContract.allowance(addr1.address, owner.address)
          ).to.equal("0");
           
          });

    

      });
    });
