async function main() {

  const Zogi = await ethers.getContractFactory("ZOGI");
  const zogi = await Zogi.deploy();

  console.log("zogi contract deployed", zogi.address);

  const Bridge = await ethers.getContractFactory("ZogiBridge");
  console.log("Deploying Bridge Contract...");

  const bridge = await upgrades.deployProxy(Bridge);
  console.log("Bridge deployed to:", bridge.address);

// ================= update variables for main net deployment =======================
  let chainIds = [25, 56];            // CRO: 25, BSC: 56, ETH: 1
  let chainStatus = [true, true];     
  let decimals = "1000000000000000000"
  let ZogiAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
  let feePercentageDecimal = 10;      // 10 =>  1% 
  let SignersList = [ "0x85a1d9d2725f2e6904fd576cb05441697c38fe23",
  "0xae6319121b4a495a5f40904f7756af3d5d61400f",
  "0xe4a63f28974e98d9709eaca4b78cd17b112d73e4",]
// ==================================================================================

  const init = await bridge.init(ZogiAddress,feePercentageDecimal,decimals,chainIds,chainStatus);
  console.log("init done");

  const updateSigner = await bridge.updateSigners(SignersList);
  console.log("signers Updated");
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });


// RPCs:

// Cronos : wss://ws-nd-026-359-278.p2pify.com/e12639f12c5b40089234424fd304d073
// ETH (alchemy): wss://eth-mainnet.g.alchemy.com/v2/NLmd0QMExPhC07w5Z9cIFfYOAhqghFWw
// ETH (chainstack): wss://ws-nd-726-656-817.p2pify.com/92ce90bfa34212b5555243267757d00e
// BSC: wss://ws-nd-421-518-820.p2pify.com/cea05fa6c12d0a6dc40343d7fe3244d9