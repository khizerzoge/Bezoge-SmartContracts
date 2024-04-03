async function main() {

    const NFT = await ethers.getContractFactory("ZOGI");
    const nft = await NFT.deploy();
  
    await nft.deployed();
  
    console.log("ZOgi deployed to:", nft.address);
  
      }
      
      main()
        .then(() => process.exit(0))
        .catch(error => {
          console.error(error);
          process.exit(1);
        });
