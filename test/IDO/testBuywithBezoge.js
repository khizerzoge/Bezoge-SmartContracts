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
let BezogeBuy;

beforeEach(async function () {
    [owner,addr1,addr2,addr3,addr4] = await ethers.getSigners();
    const stageLimits = ["13000000000000000000000000","26000000000000000000000000","36000000000000000000000000","65000000000000000000000000"];

    const IDOOwner = await ethers.getContractFactory("MBLKIDO");
    idoContract = await IDOOwner.deploy();

    const usdtTokenOwner = await ethers.getContractFactory("TetherToken");
    usdtToken = await usdtTokenOwner.deploy("1000000000000", "usdt", "usdt", 6);
  
    const zogiTokenOwner = await ethers.getContractFactory("ZOGI");
    zogiToken = await zogiTokenOwner.deploy();

    const bezoge = await ethers.getContractFactory("BezosEarth");
    BezogeToken = await bezoge.deploy();

    await BezogeToken.transfer(addr1.address, "10000000000000000000");

    await idoContract.init(zogiToken.address, usdtToken.address, stageLimits, 5);
    await idoContract.setCollectionWallet(addr4.address);
  
    await idoContract.setUSDTRate(['20000','18180','16660','15380'],[1,2,3,4]);
    await idoContract.setZogiRate(['4800','4800','0','0'], 240, [1,2,3,4]);
    await idoContract.setEthRate(['39760000','36123660','33103420','30560060'], 1987000, [1,2,3,4]);

    const wrapper = await ethers.getContractFactory("Conversion");
    const Wrapper =  await wrapper.deploy();
    
    await Wrapper.init(BezogeToken.address, zogiToken.address, "100000", "1000000000000000000")

    await zogiToken.setAdmin(Wrapper.address, true);

    const buywithBezoge = await ethers.getContractFactory("BezogePayment");
    BezogeBuy =  await buywithBezoge.deploy();

    const bezogeBuyInit = await BezogeBuy.init(Wrapper.address, zogiToken.address, BezogeToken.address, idoContract.address);
  
  });


    // You can nest describe calls to create subsections.
describe("User should buy using Bezoge", function () {
  it("Should check the correct bezoge buy", async function () {

    await BezogeToken.approve(BezogeBuy.address, "100000000000000000000");
    await BezogeBuy.approveTokens("10000000000000000000000000000000");

    // let contractBalance = zogiToken.balanceOf()

    await BezogeBuy.getMBLKAllocationByBezoge("100000000000000000000", addr1.address, "ok");

    let x =  await idoContract.userAllocation(addr1.address)

    console.log(x)

  });  
});