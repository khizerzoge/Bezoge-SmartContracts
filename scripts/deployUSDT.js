async function main() {
    const NFT = await ethers.getContractFactory("TetherToken");
    const nft = await NFT.deploy("10000000000000", "usdt", "usdt", 6);
  
    await nft.deployed();
  
    console.log("USDT deployed to:", nft.address);
  
      }
      
      main()
        .then(() => process.exit(0))
        .catch(error => {
          console.error(error);
          process.exit(1);
        });
