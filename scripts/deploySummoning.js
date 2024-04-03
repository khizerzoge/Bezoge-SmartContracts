async function main() {
  
    const summoning = await ethers.getContractFactory("Summoning");
    console.log("Deploying summoning Contract...");
  
    const Summoning = await upgrades.deployProxy(summoning);
    console.log("summoning deployed to:", Summoning.address);
  
  // ================= update variables for main net deployment =======================

    let ZogiAddress = "0xfBC34fBd46F813b388E14aB3fc9f61538C01bce2"
    let usdtAddress = "0xA2CcF8f570a5F13dda6711F411779f8Cc5Fb140f"
    let bezogiNFTAddress = "0xfBC34fBd46F813b388E14aB3fc9f61538C01bce2"
    let mblkTokenAddress = "0xfBC34fBd46F813b388E14aB3fc9f61538C01bce2"
    let idoAddress = "0xfBC34fBd46F813b388E14aB3fc9f61538C01bce2"
    let originBlockAddr = "0xfBC34fBd46F813b388E14aB3fc9f61538C01bce2"
    let beneficiary = "0x5429cDCF79C21Cf6592D7d822857ea888cA55B59"
    let refId = "5429c55B59"
 
    
  // ==================================================================================
  
    const init = await Summoning.init(originBlockAddr, bezogiNFTAddress, mblkTokenAddress, idoAddress,
        ZogiAddress, usdtAddress);

    await new Promise(resolve => setTimeout(resolve, 8000));
    console.log("init done");

    const setBeneficiary = await Summoning.setBeneficiary(beneficiary);
    await new Promise(resolve => setTimeout(resolve, 8000));
    console.log("beneficiary added ");

    const setrefId = await Summoning.setRefId(refId);
    await new Promise(resolve => setTimeout(resolve, 8000));
    console.log("redId added ");


}
    main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  