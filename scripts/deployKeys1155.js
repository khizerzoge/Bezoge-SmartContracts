async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const Contract = await ethers.getContractFactory("BezogiaKeys");
    const contract = await Contract.deploy("The Lost Keys of Bezogia", "LKOB", "https://api.zogilabs.io/collectibles/key/");
  
    console.log("Contract address:", contract.address);

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });