async function main() {

    // function init(address zogiToken_,address usdtAddress_, uint256[]calldata stageLimits, uint256 totalTiers_) external initializer
  
    const IDO = await ethers.getContractFactory("MBLKIDO");
    console.log("Deploying IDO Contract...");
  
    const ido = await upgrades.deployProxy(IDO);
    console.log("IDO deployed to:", ido.address);
  
  // ================= update variables for main net deployment =======================
    
//   let ZogiAddress = "0x7e80e4d7d5725499791CF8b17A4586F1f0672A0C"
//   let usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
    let ZogiAddress = "0xfBC34fBd46F813b388E14aB3fc9f61538C01bce2"
    // let usdtAddress = "0x758bcd7Ba8252983e43c8b9f11dE09EdcCE7E658"
    let usdtAddress = "0xA2CcF8f570a5F13dda6711F411779f8Cc5Fb140f"
    let collectionWallet = "0x5429cDCF79C21Cf6592D7d822857ea888cA55B59"
    let totalTiers = 5;      
    let stageLimits = [ "1300000000000000000000000",
    "1300000000000000000000000","3900000000000000000000000","6500000000000000000000000"]
    
  // ==================================================================================
  
    const init = await ido.init(ZogiAddress, usdtAddress, stageLimits, totalTiers);
    console.log("init done");

    let x =  await ethers.getSigner();
    console.log("signer", x.address);
    console.log("owner",await ido.owner());

    await new Promise(resolve => setTimeout(resolve, 8000));
   
    console.log("owner",await ido.owner());

    const updatewallet = await ido.setCollectionWallet(collectionWallet);
    console.log("wallet Updated");
    
    const setUSDTRate = await ido.setUSDTRate(['20000','18180','16660','15380'],[1,2,3,4]);
    console.log("usdt rate added");

    const setZogiRate = await ido.setZogiRate(['5080','5080','0','0'], 254, [1,2,3,4]);
    console.log("zogi rate added");

    const ethRate = await ido.setEthRate(['42220000','38381000','35183000','32476000'], 2111000, [1,2,3,4]);
    console.log("eth rate added");


    // await ido.getMBLKAllocation(2,x.address,"100000","456")
    // '42305800','38455972','35240731','32533160' => 2115.29

    // ================================

}
    main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  