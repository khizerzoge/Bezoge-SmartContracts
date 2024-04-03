async function main() {

    // function init(address zogiToken_,address usdtAddress_, uint256[]calldata stageLimits, uint256 totalTiers_) external initializer
  
    const proxyAddress = '0x86c10a8796a51874D00B16635537c4B3EF828bA8';

    const MBLKIDOV2 = await ethers.getContractFactory("MBLKIDOV2");
    console.log("Preparing upgrade...");
    const MBLKIDOV2Address = await upgrades.upgradeProxy(proxyAddress, MBLKIDOV2);
    console.log("MBLKIDOV2 at:", MBLKIDOV2Address);

    const usdtUpdate = await MBLKIDOV2Address.addUSDTAddress("");
  

}
    main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  

