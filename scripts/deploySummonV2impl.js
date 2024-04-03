async function main() {
    const summonV2 = await ethers.getContractFactory("SummoningV2");
    const SummonImp = await summonV2.deploy();
  
    await SummonImp.deployed();
  
    console.log("SummonImp deployed to:", SummonImp.address);
  
      }
      
      main()
        .then(() => process.exit(0))
        .catch(error => {
          console.error(error);
          process.exit(1);
        });
