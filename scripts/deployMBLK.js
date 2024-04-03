async function main() {

    const MBLK = await ethers.getContractFactory("MBLK");
    const mblk = await MBLK.deploy();
  
    await mblk.deployed();
  
    console.log("MBLK deployed to:", mblk.address);

  
      }
      
      main()
        .then(() => process.exit(0))
        .catch(error => {
          console.error(error);
          process.exit(1);
        });
