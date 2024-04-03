// We import Chai to use its asserting functions here.
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { utils } = require('ethers');

let owner;
let addr1;
let addr2;
let addr4;
let addr3;
let MBLKTokenOwner;
let MBLKTokenContract;
let VestingTokenOwner;
let VestingTokenContract;
let IDOOwner;
let IDOContract;

  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    [owner, addr1, addr2,addr3,addr4] = await ethers.getSigners();

    //Deploy Vesting contract 
    VestingTokenOwner = await ethers.getContractFactory("MBLKVesting");
    VestingTokenContract = await VestingTokenOwner.deploy();

    // Deploy MBLK set admin to Vesting contract
    MBLKTokenOwner = await ethers.getContractFactory("MBLK");
    MBLKTokenContract = await MBLKTokenOwner.deploy();
    await MBLKTokenContract.setAdmin(VestingTokenContract.address,true);

    // Deploy MBLKIDO
    IDOOwner = await ethers.getContractFactory("MBLKIDOV2");
    IDOContract = await IDOOwner.deploy();

    const stageLimits = ["13000000000000000000000000","26000000000000000000000000","36000000000000000000000000","65000000000000000000000000"];

    const zogiTokenOwner = await ethers.getContractFactory("ZOGI");
    zogiToken = await zogiTokenOwner.deploy();
  
    const usdtTokenOwner = await ethers.getContractFactory("TetherToken");
    usdtToken = await usdtTokenOwner.deploy("1000000000000", "usdt", "usdt", 6);
  
    await zogiToken.mint(addr1.address, "65000000000000000000000000");
    await zogiToken.connect(addr1).approve(IDOContract.address, "65000000000000000000000000");
  
    await zogiToken.mint(addr2.address, "65000000000000000000000000");
    await zogiToken.connect(addr2).approve(IDOContract.address, "65000000000000000000000000");
  
    await zogiToken.mint(addr3.address, "65000000000000000000000000");
    await zogiToken.connect(addr3).approve(IDOContract.address, "65000000000000000000000000");
  
    await usdtToken.issue("65000000000000");
    await usdtToken.connect(addr1).approve(IDOContract.address, "65000000000000");
  
    await usdtToken.issue("65000000000000");
    await usdtToken.connect(addr2).approve(IDOContract.address, "65000000000000");
  
    await usdtToken.issue("65000000000000");
    await usdtToken.connect(addr3).approve(IDOContract.address, "65000000000000");
  
    await IDOContract.init(zogiToken.address, usdtToken.address, stageLimits, 5);
    await IDOContract.setCollectionWallet(addr4.address);
  
    await IDOContract.setUSDTRate(['20000','18180','16660','15380'],[1,2,3,4]);
    await IDOContract.setZogiRate(['4800','4800','0','0'], 240, [1,2,3,4]);
    await IDOContract.setEthRate(['39760000','36123660','33103420','30560060'], 1987000, [1,2,3,4]);

    for(let i = 0; i <= 5;i++){
        await IDOContract.connect(addr1).getMBLKAllocation(2,addr1.address,"400000000000000000000000","456");
    }

    await VestingTokenContract.init(MBLKTokenContract.address,IDOContract.address,1686908305,1686908305,1686908305);
    await VestingTokenContract.setAdmin(addr2.address, true);

    await VestingTokenContract.connect(addr2).setPrivateSaleMapping(addr3.address,"11520000000000000000000000");
   
  });

// describe('Claim TGE', function () {     
//       it('Should not allow a user to claim TGE before TGE time', async function () {
//             await expect(VestingTokenContract.connect(addr1).claimTGE(addr1.address,0)).to.be.revertedWith('TGE has not started yet');
//       });
// });

describe('Claim TGE', function () {     
    it('Should not allow a user to claim TGE more than once', async function () {
      await VestingTokenContract.connect(addr1).claimTGE(addr1.address,0);
      await expect(VestingTokenContract.connect(addr1).claimTGE(addr1.address,0)).to.be.revertedWith('TGE already claimed');

    });
});

describe('Claim TGE', function () {    
    it("Should allow a user to claim public TGE", async function () {
      await VestingTokenContract.connect(addr1).claimTGE(addr1.address,0);
      const mblkBalance = await MBLKTokenContract.balanceOf(addr1.address);
      await expect('1152000000000000000000000').to.equal(mblkBalance);
  });  
});

  describe('Claim Public Sale Sequence private and public', function () {
    it('Should allow a user to claim Public Sale Sequence', async function () {
        
        var userBalance1;
        var userBalance3;

        const privateUserAllocation = await VestingTokenContract.getPrivateSaleMapping(addr3.address);      
        const userAllocation = await IDOContract.userAllocation(addr1.address);

        console.log("PrivateAllocation:::",privateUserAllocation);
        console.log("userAllocation:::",userAllocation);
        
        await VestingTokenContract.connect(addr3).claimTGE(addr3.address,1);
        await VestingTokenContract.connect(addr1).claimTGE(addr1.address,0);

        userBalance1 = await MBLKTokenContract.balanceOf(addr1.address);
        userBalance3 = await MBLKTokenContract.balanceOf(addr3.address);

        console.log("Value of userBalance1 userBalance3 afterTGE",userBalance1,userBalance3);
        await network.provider.send("evm_increaseTime", [777600]); // Increase time by 9 days
        await network.provider.send("evm_mine"); // Mine a new block to apply the time change

        await VestingTokenContract.connect(addr1).claimPublicSale(); //3200000 * 9
        await VestingTokenContract.connect(addr3).claimPrivateSale();//15200 * 9

        userBalance1 = await MBLKTokenContract.balanceOf(addr1.address);
        userBalance3 = await MBLKTokenContract.balanceOf(addr3.address);

        console.log("Value of userBalance1 userBalance3 afterNineDays",userBalance1,userBalance3);
        
        await network.provider.send("evm_increaseTime", [172800]); // Increase time by 2 days
        await network.provider.send("evm_mine"); // Mine a new block to apply the time change

        await VestingTokenContract.connect(addr1).claimPublicSale(); //3200000 * 2
        await VestingTokenContract.connect(addr3).claimPrivateSale();//15200 * 2

        userBalance1 = await MBLKTokenContract.balanceOf(addr1.address);
        userBalance3 = await MBLKTokenContract.balanceOf(addr3.address);

        console.log("Value of userBalance1 userBalance3 after2Days",userBalance1,userBalance3);

        await network.provider.send("evm_increaseTime", [86400]); // Increase time by 1 days
        await network.provider.send("evm_mine"); // Mine a new block to apply the time change

        await VestingTokenContract.connect(addr1).claimPublicSale();
        await VestingTokenContract.connect(addr3).claimPrivateSale();

        userBalance1 = await MBLKTokenContract.balanceOf(addr1.address);
        userBalance3 = await MBLKTokenContract.balanceOf(addr3.address);

        console.log("Value of userBalance1 userBalance3 after 1Day",userBalance1,userBalance3);

        expect(await MBLKTokenContract.balanceOf(addr3.address)).to.equal('758400000000000000000000');  //576000+(15200*9)+(15200*2)+(15200*1)
        expect(await MBLKTokenContract.balanceOf(addr1.address)).to.equal('1536000000000000000000000'); //(11520000*0.1)+ 288000+(32000*2)+(32000)

        // for(i =0; i <= 358; i++){
        // await network.provider.send("evm_increaseTime", [86400]); // Increase time by 1 days
        // await VestingTokenContract.connect(addr1).claimPublicSale();
        // // const privateUserAllocation = await VestingTokenContract.getPrivateSaleMapping(addr3.address);      
        // const userAllocation = await IDOContract.userAllocation(addr1.address);
        // console.log("Value of userAllocation:::",userAllocation);
        // }
    });
  });

  // describe('Claim Public Sale', function () {

  //   it('Should not allow a user to claim Public Sale before public cliff period', async function () {
  //       it('Should not allow a user to claim TGE before TGE time', async function () {
  //                   await expect(VestingTokenContract.connect(addr1).claimPublicSale()).to.be.revertedWith('TGE has not started yet');
  //       });
  //   });
  // });


  //  describe('Claim Private Sale', function () {

  //   it('Should not allow a user to claim Private Sale before private cliff period', async function () {
  //       it('Should not allow a user to claim Private Sale before Private time', async function () {
  //                   await expect(VestingTokenContract.connect(addr1).claimPrivateSale()).to.be.revertedWith('private cliff period has not started yet');
  //       });
  //   });
  // });



