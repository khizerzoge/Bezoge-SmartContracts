const { upgrades } = require("hardhat");

async function main() {
  
    const proxyAddress = '0xdF868C983866Cd91d7Df824c91fd8f11E5B3757d';
    const signerAddress = "0xdF868C983866Cd91d7Df824c91fd8f11E5B3757d";

    const ConversionV2 = await ethers.getContractFactory("ConversionV2");
    console.log("Preparing upgrade...");


    const ConversionV2Address = await upgrades.upgradeProxy(proxyAddress, ConversionV2);
    console.log("ConversionV2 at:", ConversionV2Address.address);

    // let newImplementation = await upgrades.erc1976.getImplementationAddress(proxyAddress.address)

    // console.log("newImplementation", newImplementation)


}
    main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  
