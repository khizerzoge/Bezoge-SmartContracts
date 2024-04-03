async function main() {

    const BezogeAddress = "0xBaf76d4dCd798CC8AA9395EBE8969fE319d495a0";
    const ZogiAddress = "0xBaf76d4dCd798CC8AA9395EBE8969fE319d495a0";
  
    const Bridge = await ethers.getContractFactory("Conversion");
    console.log("Deploying Wrapper Contract...");

    const bridge = await upgrades.deployProxy(Bridge);
    console.log("Wrapper deployed to:", bridge.address);
  
    const init = await bridge.init(BezogeAddress,ZogiAddress, "1000000000000000000", "1000000000000000000");

    console.log("Init tx sent");
    }
    
    main()
      .then(() => process.exit(0))
      .catch(error => {
        console.error(error);
        process.exit(1);
      });
