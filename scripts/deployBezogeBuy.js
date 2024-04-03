async function main() {

    let idoAddress = "0xD683E3649946e27385cE4F1eb23CCb22C4a053Ce";
    let ZOGIAddress = "0x314E7D7C890a1c59Ba800766F688C4A936160e6C";
    let BezogeAddress=  "0x5a443a90E96F5B96c4A9ebCcb34C47a83F9E8f8F";
    let WrapperAddress = "0x20C3dA2146DE404917F3cAf3007137E8A0558C58";
    
    const BezogePayment = await ethers.getContractFactory("BezogePayment");
    console.log("Deploying BezogePayment Contract...");
  
    const bezogePayment = await upgrades.deployProxy(BezogePayment);
    console.log("Bezoge Payment deployed to:", bezogePayment.address);
     
  // ============================================================================================== 
  
    const init = await bezogePayment.init(WrapperAddress, ZOGIAddress, BezogeAddress, idoAddress);
    console.log("init done");
 
}
    main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  