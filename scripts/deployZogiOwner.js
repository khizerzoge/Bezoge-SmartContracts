async function main() {

    const ZogiAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";

    const ZogiOwner = await ethers.getContractFactory("ZogiOwner");
    const zogiowner = await ZogiOwner.deploy(ZogiAddress);
  
    await zogiowner.deployed();
  
    console.log("ZogiOwner deployed to:", zogiowner.address);
  
      }
      
      main()
        .then(() => process.exit(0))
        .catch(error => {
          console.error(error);
          process.exit(1);
        });
