async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    // console.log("Account balance:", (await deployer.getBalance()).toString());
    
    const StakingWallet = await ethers.getContractFactory("StakingWallet");
    const stakingWallet = await StakingWallet.deploy();

    const ZOGI = await ethers.getContractFactory("ZOGI");
    const zogi = await ZOGI.deploy();

    await zogi.mint(deployer.address, "100000");
    
    const Contract = await ethers.getContractFactory("StakingRewardsV2");
    const contract = await Contract.deploy(100, stakingWallet.address,zogi.address ,[zogi.address], 
      [5000000000000000000,200],  [5000000000000000000,200],  [5000000000000000000,200]);
  
    console.log("Contract address:", contract.address);
    console.log("ZOGI address:", zogi.address);


    await zogi.approve(contract.address, "10000000000");
    await contract.stake("1000", "0");
    // await contract.stake("1000", "1");

    let cycleCount= await contract.monthlyCycleCounter();
    console.log(cycleCount);

    await sleep(10000);
    await contract.stake("1000", "0");
    cycleCount= await contract.monthlyCycleCounter();
    console.log(cycleCount);

  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });