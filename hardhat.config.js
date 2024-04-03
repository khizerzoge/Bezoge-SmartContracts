require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('@openzeppelin/hardhat-upgrades');
// require("hardhat-gas-reporter");
require('solidity-coverage');
require("@nomiclabs/hardhat-web3");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const POLYTEST_PRIVATE_KEY = "2057feeabf3183bd7b503a7a6f7e27bd607e0b1b3705716d91db210f046efa5e";


// =========================== private key for ETH main net deployment ====================
const MAIN_PK = "7cd308f8b5f80233b279079ccf61dfc8ad4b2a7728ed971c2321794621f1f15c"

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000
          },
        }
      },
      {
        version: "0.8.19",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000
          },
        }
      },
      {
        version: "0.4.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000
          },
        }
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
    ]
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 50,
    enabled:  true, //(process.env.REPORT_GAS)? true :
    ethPrice: 1600.1
    // coinmarketcap: "8cab7a0f-7baf-4e90-8c12-39d78eacb364"//process.env.COINMARKETCAP_API_KEY
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  networks: {
    
    EthMainNet: {
      url: `https://mainnet.infura.io/v3/b82fa27b175e44de9ff03c6abd3e7bcd`,
      accounts: [`${MAIN_PK}`],
     
    },
    BscMainNet: {
      url: `https://nd-729-613-338.p2pify.com/173e0417581f0aff2aa9cad0c538fe9c`,
      accounts: [`${MAIN_PK}`],
     
    },
    CroMainNet: {
      url: `https://nd-356-181-365.p2pify.com/405ec19d0c9da819c6e5f7ad9c586969`,
      accounts: [`${MAIN_PK}`],
    },

    rinkeby: {
      url: `https://rinkeby.infura.io/v3/49909763e62f4e1f947ea70b2c343db2`,
      accounts: [`${POLYTEST_PRIVATE_KEY}`],
     
    },
    polygonTest:{
      url: "https://polygon-mumbai.blockpi.network/v1/rpc/public",
      accounts: [`${POLYTEST_PRIVATE_KEY}`],
    },
    bscTest:{
      url: "https://bsc-testnet.public.blastapi.io",
      accounts: [`${POLYTEST_PRIVATE_KEY}`],
    },

    goerli:{
      url: "https://goerli.infura.io/v3/49909763e62f4e1f947ea70b2c343db2",
      accounts: [`${POLYTEST_PRIVATE_KEY}`],
    },
    hardhat: {
      allowUnlimitedContractSize: true,
      timeout: 1200000000000000
    },
    // local:{
    //   url: 'http://127.0.0.1:8545/',
    //   accounts: [`${K1}`]
    // },
    bscTestnet:{
      url: "https://data-seed-prebsc-2-s1.binance.org:8545/",
      accounts: [`${POLYTEST_PRIVATE_KEY}`]
    }
  },
  
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "DZYHY93DFFYR675QMC7YR3V4SIUR1GEYZU" // polygon
    // apiKey: "PQUKAX31HQMG8EVFUDFJ7TGNZSMIFB6QH8" // ethereum
  }

};
