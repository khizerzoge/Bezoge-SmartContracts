const { ethers } = require("hardhat");

async function main() {
  let idoAddress = "0xD683E3649946e27385cE4F1eb23CCb22C4a053Ce";
  let USDTAddress=  "0x1c1688410f2eF2c61a8f4fD1aa935633f14A89E2";
  let ZOGIAddress = "0x314E7D7C890a1c59Ba800766F688C4A936160e6C";
  let BezogeAddress=  "0x5a443a90E96F5B96c4A9ebCcb34C47a83F9E8f8F";
  let WrapperAddress = "0x20C3dA2146DE404917F3cAf3007137E8A0558C58";

  [owner,addr1,addr2,addr3,addr4] = await ethers.getSigners();
  const stageLimits = ["13000000000000000000000000","26000000000000000000000000","36000000000000000000000000","65000000000000000000000000"];


  // await idoContract.init(zogiToken.address, usdtToken.address, stageLimits, 5);
  // await idoContract.setCollectionWallet(owner.address);

  // await idoContract.setUSDTRate(['20000','18180','16660','15380'],[1,2,3,4]);
  // await idoContract.setZogiRate(['4800','4800','0','0'], 240, [1,2,3,4]);
  // await idoContract.setEthRate(['39760000','36123660','33103420','30560060'], 1987000, [1,2,3,4]);

  // const wrapper = await ethers.getContractFactory("Conversion");
  // const Wrapper =  await wrapper.deploy();
  // console.log("Wrapper: ", Wrapper.address);

  // await new Promise(resolve => setTimeout(resolve, 8000));
  
  // await Wrapper.init(BezogeToken.address, zogiToken.address, "100000", "1000000000000000000")

  // await zogiToken.setAdmin(Wrapper.address, true);

  const buywithBezoge = await ethers.getContractFactory("BezogePayment");
  BezogeBuy =  await buywithBezoge.deploy();
  console.log("bezoge buy", BezogeBuy.address)
  const bezogeBuyInit = await BezogeBuy.init(WrapperAddress, ZOGIAddress, BezogeAddress, idoAddress);


  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });