async function main() {

    // const MBLK = await ethers.getContractFactory("MBLK");
    // const mblk = await MBLK.deploy();
  
    // await mblk.deployed();
  
    // console.log("MBLK deployed to:", mblk.address);


    const minigame = await ethers.getContractFactory("MiniGame");
    const MiniGame = await minigame.deploy();
  
    await MiniGame.deployed();
    console.log("MiniGame deployed to:", MiniGame.address);

    await MiniGame.init("0x83E6A90933209Ca3ce5b5487967f5e5891D42515", 10);

    }
    
    main()
      .then(() => process.exit(0))
      .catch(error => {
        console.error(error);
        process.exit(1);
      });
