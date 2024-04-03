const { upgrades } = require("hardhat");

async function main() {

  
    const proxyAddress = '0xDa4A41Aa0782eE899815652ef8a179a943F9623F';

    const SummonV2 = await ethers.getContractFactory("SummoningV2");
    console.log("Preparing upgrade...");

    await upgrades.forceImport(proxyAddress, SummonV2);

    const SummonV2Address = await upgrades.upgradeProxy(proxyAddress, SummonV2);
    console.log("summoningV2 at:", SummonV2Address);
  
}
    main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  

