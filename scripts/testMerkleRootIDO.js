async function main() {

    // function init(address zogiToken_,address usdtAddress_, uint256[]calldata stageLimits, uint256 totalTiers_) external initializer
  
    const IDO = await ethers.getContractFactory("TestMBLKIDO");
    console.log("Deploying IDO Contract...");
  
    const ido = await upgrades.deployProxy(IDO);
    console.log("IDO deployed to:", ido.address);
  
  // ================= update variables for main net deployment =======================

  const setRoot  = await ido.setMerkleRoot("0xf3c5813a2f5d687892be51b40acaff66e2235dbb9c0056dde0127ba4e392a964")

    let x =  await ethers.getSigner();
    console.log("signer", x.address);

    let proof = ['0x3d91e06cd56e1599de3c210bf58553093227542f1fc87da633bb886b877bc1fb','0xb58c731e71f6572c5101da06337c65b939334ff09213c30514c51f88f8d8544e','0x1369745292869f04ba71136fd525a35f5c3dadd0393d9c0eea69c98004f508c8']
    const tx = await ido.whiteListGetMBLKAllocation(proof);

    // const tx2 = await ido.whiteListGetMBLKAllocation(proof);

   
    // const updatewallet = await ido.setCollectionWallet(collectionWallet);
    console.log("wallet Updated");

    }
    
    main()
      .then(() => process.exit(0))
      .catch(error => {
        console.error(error);
        process.exit(1);
      });
  