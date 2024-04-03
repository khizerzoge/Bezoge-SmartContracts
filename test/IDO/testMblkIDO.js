const { assert } = require("chai");
const { ethers } = require("hardhat");
const { expect } = require("chai");

let owner;
let addr1;
let addr2;
let addr3;
let addr4;
let usdtToken;
let zogiToken;
let idoContract;
let proof= ['0x8a3552d60a98e0ade765adddad0a2e420ca9b1eef5f326ba7ab860bb4ea72c94','0xa1975ed13439a4103fa6ee17fea182624b4749f600e56c98de4b2a9f32ea1207','0x2aba7a152181eba316033b69043e39e9dba7d98f8de15d9a8fc228ad4f1dbfa0','0x28ee50ccca7572e60f382e915d3cc323c3cb713b263673ba830ab179d0e5d57f']

beforeEach(async function () {
  [owner,addr1,addr2,addr3,addr4] = await ethers.getSigners();

  // console.log("Value of owner:::",owner.address);
  // console.log("Value of addr1:::",addr1.address);
  // console.log("Value of addr2:::",addr2.address);
  // console.log("Value of addr3:::",addr3.address);
  // console.log("Value of addr4:::",addr4.address);

  const stageLimits = ["13000000000000000000000000","26000000000000000000000000","36000000000000000000000000","65000000000000000000000000"];

  const IDOOwner = await ethers.getContractFactory("MBLKIDO");
  idoContract = await IDOOwner.deploy();

  const zogiTokenOwner = await ethers.getContractFactory("ZOGI");
  zogiToken = await zogiTokenOwner.deploy();

  const usdtTokenOwner = await ethers.getContractFactory("TetherToken");
  usdtToken = await usdtTokenOwner.deploy("1000000000000", "usdt", "usdt", 6);

  await zogiToken.mint(addr1.address, "65000000000000000000000000");
  await zogiToken.connect(addr1).approve(idoContract.address, "65000000000000000000000000");

  await zogiToken.mint(addr2.address, "65000000000000000000000000");
  await zogiToken.connect(addr2).approve(idoContract.address, "65000000000000000000000000");

  await zogiToken.mint(addr3.address, "65000000000000000000000000");
  await zogiToken.connect(addr3).approve(idoContract.address, "65000000000000000000000000");

  // await usdtToken.mint(addr1.address, "65000000000000");
  // await usdtToken.connect(addr1).approve(idoContract.address, "65000000000000");

  // await usdtToken.mint(addr2.address, "65000000000000");
  // await usdtToken.connect(addr2).approve(idoContract.address, "65000000000000");

  // await usdtToken.mint(addr3.address, "65000000000000");
  // await usdtToken.connect(addr3).approve(idoContract.address, "65000000000000");

  await idoContract.init(zogiToken.address, usdtToken.address, stageLimits, 5);
  await idoContract.setCollectionWallet(addr4.address);

  await idoContract.setUSDTRate(['20000','18180','16660','15380'],[1,2,3,4]);
  await idoContract.setZogiRate(['4800','4800','0','0'], 240, [1,2,3,4]);
  await idoContract.setEthRate(['39760000','36123660','33103420','30560060'], 1987000, [1,2,3,4]);

});

  // You can nest describe calls to create subsections.
describe("User should enter correct paymentType", function () {
  it("Should check the correct paymentType", async function () {
     await expect(idoContract.connect(addr1).getMBLKAllocation(5,addr1.address,"1000000000000000000","456")).to.be.revertedWith("Invalid paymentType");
  });  
});

  // You can nest describe calls to create subsections.
  describe("ido pause", function () {
    it("Should fail during pause", async function () {
       await idoContract.pause();
      //  await idoContract.unpause();
      await expect(idoContract.connect(addr1).getMBLKAllocation(2,addr1.address,"1000000000000000000","456")).to.be.revertedWith("Pausable: paused");

    });  
  });

// You can nest describe calls to create subsections.
describe("Buy all zogi in stage1", function () {
  it("Buy tokens through zogi", async function () {

    for(let i = 0; i <= 5;i++){
        await idoContract.connect(addr1).getMBLKAllocation(2,addr1.address,"400000000000000000000000","456");
    }

    // expect(await idoContract.userAllocation(addr1.address).)

    await idoContract.connect(addr1).getMBLKAllocation(2,addr1.address,"300000000000000000000000","456");

    for(let i = 0; i < 4; i++){
      await idoContract.connect(addr1).getMBLKAllocation(2,addr1.address,"2000000000000000000000","456");
    }

    for(let i = 0; i < 3; i++){
      await idoContract.connect(addr1).getMBLKAllocation(2,addr1.address,"100000000000000000000","456");
    }

    expect(await idoContract.currentStage()).to.equal(1);

  });  
});


// You can nest describe calls to create subsections.
describe("Buy all the tokens in stage 1 and reach stage 2", function () {
  it("Buy tokens through zogi in stage1 and stage2", async function () {

    for(let i = 0; i <= 10;i++){
        await idoContract.connect(addr1).getMBLKAllocation(2,addr1.address,"400000000000000000000000","456");
    }

    await idoContract.connect(addr1).getMBLKAllocation(2,addr1.address,"300000000000000000000000","456");

    for(let i = 0; i < 4; i++){
      await idoContract.connect(addr1).getMBLKAllocation(2,addr1.address,"2000000000000000000000","456");
    }

    for(let i = 0; i < 3; i++){
      await idoContract.connect(addr1).getMBLKAllocation(2,addr1.address,"100000000000000000000","456");
    }

    expect(await idoContract.currentStage()).to.equal(2);
  });  
});

// Can not use Zogi as payment after round 2
// You can nest describe calls to create subsections.
describe("Buy all the tokens in stage 1 and reach stage 2 reach stage3", function () {
  it("User should not be allowed to buy after stage1 and stage2 ", async function () {

  for(let i = 0; i <= 12;i++){
      await idoContract.connect(addr1).getMBLKAllocation(2,addr1.address,"400000000000000000000000","456");
  }

  await idoContract.connect(addr1).getMBLKAllocation(2,addr1.address,"300000000000000000000000","456");
  await expect(idoContract.connect(addr1).getMBLKAllocation(2,addr1.address,"400000000000000000000000","456")).to.be.revertedWith("Can not use Zogi as payment after round 2");
  
  });  
});

// Can not use Zogi as payment after round 2
// You can nest describe calls to create subsections.
describe("Refund extra tokens that reach over the stage 3 should refund", function () {
  it("User should get refund after stage3 in case of zogi paymentIn ", async function () {

  for(let i = 0; i <= 6;i++){
      await idoContract.connect(addr1).getMBLKAllocation(2,addr1.address,"890000000000000000000000","456");
  }

  await expect(idoContract.connect(addr1).getMBLKAllocation(2,addr1.address,"110000000000000000000","456")).to.be.revertedWith("Can not use Zogi as payment after round 2");

  });  
});

// You can nest describe calls to create subsections.
describe("Buy MBLK through main net USDT", function () {
  it("Should be able to buy MBLK through USDT in stage 1", async function () {
  
      // for(let i = 0; i < 65;i++){
        await usdtToken.approve(idoContract.address, "100000000");
        await idoContract.getMBLKAllocation(3,addr2.address,"1000","456");
        await idoContract.withdrawUsdt("10", owner.address);
      // }

  });  
});

// You can nest describe calls to create subsections.
describe("Buy MBLK through USDT IDO closed case", function () {
  it("Should be able to buy MBLK through USDT in stage 1", async function () {
  
      for(let i = 0; i < 65;i++){
        await idoContract.connect(addr2).getMBLKAllocation(3,addr2.address,"10000000000","456");
      }

      for(let i = 0; i < 85;i++){
       await idoContract.connect(addr2).getMBLKAllocation(3,addr2.address,"10000000000","456");
      }

     for(let i = 0; i < 150;i++){
       await idoContract.connect(addr2).getMBLKAllocation(3,addr2.address,"10000000000","456");
     }

     for(let i = 0; i < 85;i++){
       await idoContract.connect(addr2).getMBLKAllocation(3,addr2.address,"10000000000","456");
     }

    await idoContract.connect(addr2).getMBLKAllocation(3,addr2.address,"10000000000","456");

    await expect(idoContract.connect(addr1).getMBLKAllocation(3,addr1.address,"90000000000000","456")).to.be.revertedWith("IDO closed");
  });  
});

// You can nest describe calls to create subsections.
describe("Buy MBLK through USDT", function () {
  it("Should be able to buy MBLK through USDT in stage 1", async function () {
   
    for(let i = 0; i < 65;i++){
     await idoContract.connect(addr2).getMBLKAllocation(3,addr2.address,"10000000000","456");
    }

    expect(await idoContract.currentStage()).to.equal(2);
  });  
});

  // You can nest describe calls to create subsections.
describe("15% and 85% of amount case for USDT", function () {
  it("Payment amount should go to contract address and collectionWallet address", async function () {
   
    await idoContract.connect(addr2).getMBLKAllocation(3,addr2.address,"110000000000","456");
    const usdtContractBalance = await usdtToken.balanceOf(idoContract.address);
    const usdtCollectionWallet = await usdtToken.balanceOf(addr4.address);

    expect(usdtCollectionWallet).to.equal(93500000000);
    expect(usdtContractBalance).to.equal(16500000000);

  });  
});

  // You can nest describe calls to create subsections.
  describe("15% and 85% of amount case for ZOGI", function () {
    it("Payment amount should go to contract address and collectionWallet address", async function () {
     
      await idoContract.connect(addr2).getMBLKAllocation(2,addr2.address,"400000000000000000000000","456");
      const zogiContractBalance = await zogiToken.balanceOf(idoContract.address);
      const zogiCollectionWallet = await zogiToken.balanceOf(addr4.address);

      expect(zogiCollectionWallet.toString()).to.equal("340000000000000000000000"); //60000
      expect(zogiContractBalance.toString()).to.equal("60000000000000000000000");

    });  
  });


// You can nest describe calls to create subsections.
describe("Buy MBLK through USDT", function () {
  it("Buy all the tokens in stage 1 and 2 and reach stage 3", async function () {
  
    for(let i = 0; i < 137;i++){
     await idoContract.connect(addr2).getMBLKAllocation(3,addr2.address,"10000000000","456");
    }

    expect(await idoContract.currentStage()).to.equal(3);

  });  
});

describe("Buy all zogi in stage1 through ETH", function () {
  it("Buy tokens through eth in stage 1", async function () {

    //ask this how to get to small values

    for(let i = 0; i <= 107;i++){
        const ethBalance = await ethers.provider.getBalance(addr1.address);
        await idoContract.connect(addr1).getMBLKAllocation(1,addr1.address,"3000000000000000000","456",{value: "3000000000000000000"});
    }

    for(let i = 0; i <= 1;i++){
        await idoContract.connect(addr1).getMBLKAllocation(1,addr1.address,"1000000000000000000","456",{value: "1000000000000000000"});
    }

    const currentStage = await idoContract.currentStage();
    console.log("Value of currentStage",currentStage);
    await idoContract.connect(addr1).getMBLKAllocation(1,addr1.address,"1000000000000000000","456",{value: "1000000000000000000"});

    const totalAllocated = await idoContract.totalAllocated();
    console.log("value of totalAllocated:::",totalAllocated);

    expect(await idoContract.currentStage()).to.equal(2);

  });  
});


describe("Buy all zogi in stage1 & stage2 through ETH", function () {
  it("Buy tokens through eth in stage1 and stage2 ", async function () {
    
    for(let i = 0; i <= 118;i++){
      await idoContract.connect(addr1).getMBLKAllocation(1,addr1.address,"3000000000000000000","456",{value: "3000000000000000000"});
  }

    for(let i = 0; i <= 119;i++){
        await idoContract.connect(addr1).getMBLKAllocation(1,addr1.address,"3000000000000000000","456",{value: "3000000000000000000"});
    }

    await idoContract.connect(addr1).getMBLKAllocation(1,addr1.address,"1000000000000000000","456",{value: "1000000000000000000"});
    await idoContract.connect(addr1).getMBLKAllocation(1,addr1.address,"1000000000000000000","456",{value: "1000000000000000000"});
    await idoContract.connect(addr1).getMBLKAllocation(1,addr1.address,"1000000000000000000","456",{value: "1000000000000000000"});

    expect(await idoContract.currentStage()).to.equal(3);

  });  
});


describe("Buy all zogi in stage1 & stage2  & stage3 through ETH", function () {
  it("Buy tokens through eth in stage1 and stage2 and stage3 ", async function () {
    
    for(let i = 0; i <= 0;i++){
      await idoContract.connect(addr1).getMBLKAllocation(1,addr1.address,"1000000000000000000","456",{value: "1000000000000000000"});
    }

    for(let i = 0; i <= 119;i++){
        await idoContract.connect(addr1).getMBLKAllocation(1,addr1.address,"3000000000000000000","456",{value: "3000000000000000000"});
    }

    for(let i = 0; i <= 105;i++){
      await idoContract.connect(addr1).getMBLKAllocation(1,addr1.address,"6000000000000000000","456",{value: "6000000000000000000"});
    }

    expect(await idoContract.currentStage()).to.equal(4);

  });  
});


describe("Buy all zogi in stage1 & stage2  & stage3 & stage4 through ETH", function () {
  it("Buy tokens through eth in stage1 and stage2 and stage3 and stage4 ", async function () {
    
    for(let i = 0; i <= 0;i++){
      await idoContract.connect(addr1).getMBLKAllocation(1,addr1.address,"1000000000000000000","456",{value: "1000000000000000000"});
    }

    for(let i = 0; i <= 119;i++){
        await idoContract.connect(addr1).getMBLKAllocation(1,addr1.address,"3000000000000000000","456",{value: "3000000000000000000"});
    }

    for(let i = 0; i <= 105;i++){
      await idoContract.connect(addr1).getMBLKAllocation(1,addr1.address,"6000000000000000000","456",{value: "6000000000000000000"});
    
    }

    for(let i = 0; i <= 78;i++){
      await idoContract.connect(addr1).getMBLKAllocation(1,addr1.address,"12000000000000000000","456",{value: "12000000000000000000"});
    }

    await expect(idoContract.connect(addr1).getMBLKAllocation(5,addr1.address,"1000000000000000000","456")).to.be.revertedWith("IDO closed");

    expect(await idoContract.currentStage()).to.equal(5);

  });  
});


  describe("Enable whitelisting through owner", function () {
    it("Should check the correct paymentType", async function () {
      await idoContract.updateWhiteListStatus(true);
      await idoContract.setMerkleRoot("0xc31d71ec517af26dce43147777a9b5f41d715864710de071bd4da5c786745471")

      const whiteListEnabled = await idoContract.whiteListEnabled();
      const beforezogiContractBalance = await zogiToken.balanceOf(addr1.address);
      console.log("beforezogiContractBalance",beforezogiContractBalance);   

      await idoContract.connect(addr1).whiteListGetMBLKAllocation(2,proof,"2000000000000000000","456");

      const userAllocation =  await idoContract.userAllocation(addr1.address);
      expect(userAllocation.toString()).to.equal("9600000000000000000"); 

      const afterzogiContractBalance = await zogiToken.balanceOf(addr1.address);
      console.log("afterzogiContractBalance",afterzogiContractBalance); 
      
      const zogiContractBalance = await zogiToken.balanceOf(idoContract.address);
      const zogiCollectionWallet = await zogiToken.balanceOf(addr4.address);

      expect(zogiCollectionWallet.toString()).to.equal("1700000000000000000"); 
      expect(zogiContractBalance.toString()).to.equal("300000000000000000");

      expect(idoContract.connect(addr1).getMBLKAllocation(1,addr1.address,"12000000000000000000","456",{value: "12000000000000000000"})).to.be.revertedWith("Can not buy during whitelisting stage");

      expect(idoContract.connect(addr1).getMBLKAllocation(1,addr1.address,"12000000000000000000","456",{value: "12000000000000000000"})).to.be.revertedWith("Can not buy during whitelisting stage");
      expect(whiteListEnabled).to.equal(true);

    });  

  });

  describe("Buy whitelisting using USDT", function () {
    it("Should buy using usdt during whitelsting", async function () {
      await idoContract.updateWhiteListStatus(true);
      await idoContract.setMerkleRoot("0xc31d71ec517af26dce43147777a9b5f41d715864710de071bd4da5c786745471")

      const whiteListEnabled = await idoContract.whiteListEnabled();
      const beforeusdtContractBalance = await usdtToken.balanceOf(addr1.address);
      console.log("beforeusdtContractBalance",beforeusdtContractBalance);   
      
      await idoContract.connect(addr1).whiteListGetMBLKAllocation(3,proof,"20000000","456");

      const userAllocation =  await idoContract.userAllocation(addr1.address);
      expect(userAllocation.toString()).to.equal("400000000000000000000"); 

      const beforeusdtContractBalance1 = await usdtToken.balanceOf(addr1.address);
      console.log("beforeusdtContractBalance1",beforeusdtContractBalance - beforeusdtContractBalance1); 

      let refered = await idoContract.totalReffered("456")
      console.log("reffered", refered)
      
      const usdtContractBalance = await usdtToken.balanceOf(idoContract.address);
      const usdtCollectionWallet = await usdtToken.balanceOf(addr4.address);

      expect(usdtCollectionWallet.toString()).to.equal("17000000"); 
      expect(usdtContractBalance.toString()).to.equal("3000000");

      // expect(idoContract.connect(addr1).getMBLKAllocation(1,addr1.address,"12000000000000000000","456",{value: "12000000000000000000"})).to.be.revertedWith("Can not buy during whitelisting stage");

      // expect(idoContract.connect(addr1).getMBLKAllocation(1,addr1.address,"12000000000000000000","456",{value: "12000000000000000000"})).to.be.revertedWith("Can not buy during whitelisting stage");
      expect(whiteListEnabled).to.equal(true);

    });  

  });

  describe("Buy whitelisting using ETH", function () {
    it("Should buy using usdt during whitelsting", async function () {

      await idoContract.updateWhiteListStatus(true);
      await idoContract.setMerkleRoot("0xc31d71ec517af26dce43147777a9b5f41d715864710de071bd4da5c786745471")

      const whiteListEnabled = await idoContract.whiteListEnabled();
      const ethBalance1 = await ethers.provider.getBalance(addr1.address);
      // console.log("user  ethBalance before",ethBalance1);   
      

      const ethBalanceContract = await ethers.provider.getBalance(idoContract.address);
      console.log("contract  ethBalance before",ethBalanceContract); 
      
      const ethBalanceCollector = await ethers.provider.getBalance(addr4.address);
      console.log("Collector  ethBalance before",ethBalanceCollector); 

      await idoContract.connect(addr1).whiteListGetMBLKAllocation(1,proof,"1000000000000000000","456", {value: "1000000000000000000"});

      const userAllocation =  await idoContract.userAllocation(addr1.address);
      console.log(userAllocation)
      expect(userAllocation.toString()).to.equal("39760000000000000000000"); 

      const ethBalance = await ethers.provider.getBalance(addr1.address);
      // console.log("user  ethBalance after",ethBalance);   

      const ethBalanceContract1 = await ethers.provider.getBalance(idoContract.address);
      console.log("contract  ethBalance after",ethBalanceContract1);  

      const ethBalanceCollector1 = await ethers.provider.getBalance(addr4.address);
      console.log("Collector  ethBalance after",ethBalanceCollector1); 

      // const beforeusdtContractBalance1 = await usdtToken.balanceOf(addr1.address);
      // console.log("beforeusdtContractBalance1",beforeusdtContractBalance - beforeusdtContractBalance1); 

      let refered = await idoContract.totalReffered("456")
      console.log("reffered", refered)

      let EthReffered = await idoContract.ethRefferal("456")
      console.log("reffered", EthReffered)

      // expect(ethCollectionWallet.toString()).to.equal("850000000000000000"); 
      // expect(ethContractBalance.toString()).to.equal("150000000000000000");

      // expect(idoContract.connect(addr1).getMBLKAllocation(1,addr1.address,"12000000000000000000","456",{value: "12000000000000000000"})).to.be.revertedWith("Can not buy during whitelisting stage");

      // expect(idoContract.connect(addr1).getMBLKAllocation(1,addr1.address,"12000000000000000000","456",{value: "12000000000000000000"})).to.be.revertedWith("Can not buy during whitelisting stage");
      expect(whiteListEnabled).to.equal(true);

    });  

  });

 // You can nest describe calls to create subsections.
 describe("Claim testing", function () {
  it("Referal buy/sell testing", async function () {
    // updateIDOStatus

    //buy zogi
    // await idoContract.connect(addr2).getMBLKAllocation(2,addr2.address,"1000000000000000000","70997c79c8");
    // console.log("addr1.address",addr2.address)

    //buy eth
    await idoContract.connect(addr2).getMBLKAllocation(1,addr2.address,"1000000000000000000","70997c79c8",{value: "1000000000000000000"});
    await idoContract.connect(addr2).getMBLKAllocation(3,addr2.address,"3013000000","70997c79c8");

    //buy usdt
    // await idoContract.connect(addr2).getMBLKAllocation(3,addr2.address,"1000000","70997c79c8");

    await idoContract.updateIDOStatus(true);

    await idoContract.setTier(0,"4999000000000000000000","25");
    await idoContract.setTier(1,"49990000000000000000000","50");
    await idoContract.setTier(2,"249999000000000000000000","75");
    await idoContract.setTier(3,"499999000000000000000000","100");
    await idoContract.setTier(4,"500000000000000000000000","150");

    let reffered = await idoContract.totalReffered("70997c79c8")
    
    const ethBalance = await ethers.provider.getBalance(addr1.address);
    const usdtBalance = await usdtToken.balanceOf(addr1.address);

    await idoContract.connect(addr1).claimRefReward("70997c79c8",false);

    const ethBalance1 = await ethers.provider.getBalance(addr1.address);
    const usdtBalance1 = await usdtToken.balanceOf(addr1.address);
    
    console.log("ethBalance1:::", ethBalance1 - ethBalance )
    console.log("usdtBalance:::", usdtBalance1 - usdtBalance )

  });

});