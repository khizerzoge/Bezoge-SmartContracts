const { upgrades } = require("hardhat");

async function main() {
  
    const proxyAddress = '0xdF868C983866Cd91d7Df824c91fd8f11E5B3757d';
 
    const ConversionV3 = await ethers.getContractFactory("ConversionV3");
    console.log("Preparing upgrade...");


    const ConversionV3Address = await upgrades.upgradeProxy(proxyAddress, ConversionV3);
    console.log("ConversionV3 at:", ConversionV3Address.address);

}
    main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  
