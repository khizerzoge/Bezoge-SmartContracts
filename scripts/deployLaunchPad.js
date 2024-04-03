async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const Contract = await ethers.getContractFactory("LaunchpadNFT");
    const contract = await Contract.deploy("TestBezogeNFT", "TBZ", "https://api.bezoge.com/token/api/wpdemo/","0x64eF5f4145A77EA9091DA00eb5f5B865eB27B5D2", 3000);
  
    console.log("Contract address:", contract.address);
    

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });