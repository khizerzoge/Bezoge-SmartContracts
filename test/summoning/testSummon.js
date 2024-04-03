// We import Chai to use its asserting functions here.
const { expect } = require("chai");
const { ethers } = require("hardhat");
function getmessageHash(param1, param2, param3, param4, param5, param6, param7, param8, param9) {
  const data = web3.utils.soliditySha3(param1, param2, param3, param4, param5, param6, param7, param8, param9);
  return data;
};
function signMessage(msgHash, adminAddress, adminKey) {
  web3.eth.defaultAccount = adminAddress;
  const signObj = web3.eth.accounts.sign(msgHash, adminKey);
  return signObj;
};

const Web3 = require('web3');
// const Rpc = config.eth.rpc || null;
// const web3 = new Web3(Rpc);
const web3 = new Web3();


let owner;
let addr1;
let addr2;
let addr3;
let addr4;
let usdtToken;
let zogiToken;
let idoContract;
let bezogiNFT;
let OriginBlockNFT;
let mblkToken;



  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
    const stageLimits = ["13000000000000000000000000","26000000000000000000000000","39000000000000000000000000","65000000000000000000000000"];
    summonContract = await ethers.getContractFactory("SummoningV2");
    SummonContract = await summonContract.deploy();

    const IDOOwner = await ethers.getContractFactory("MBLKIDOV2");
    idoContract = await IDOOwner.deploy();
  
    const zogiTokenOwner = await ethers.getContractFactory("ZOGI");
    zogiToken = await zogiTokenOwner.deploy();

    const mblkTokenOwner = await ethers.getContractFactory("MBLK");
    mblkToken = await mblkTokenOwner.deploy();

    const bezogiTokenOwner = await ethers.getContractFactory("Bezogi");
    bezogiNFT = await bezogiTokenOwner.deploy("bezogi","bezogi","bezogi.com/");

    const OriginBlockOwner = await ethers.getContractFactory("OriginBlock");
    OriginBlockNFT = await OriginBlockOwner.deploy("OriginBlock","OriginBlock","OriginBlockNFT.com/");
  
    const usdtTokenOwner = await ethers.getContractFactory("TetherToken");
    usdtToken = await usdtTokenOwner.deploy("1000000000000", "usdt", "usdt", 6);
  
    await idoContract.init(zogiToken.address, usdtToken.address, stageLimits, 5);
    await idoContract.setCollectionWallet(addr4.address);
  
    await idoContract.setUSDTRate([20000,18180,16660,15380],[1,2,3,4]);
    await idoContract.setZogiRate([5080,5080,0,0], 254, [1,2,3,4]);
    await idoContract.setEthRate([42220000,38381000,35183000,32476000], 2111000, [1,2,3,4]);
    await idoContract.setEthRate([41080000,37345000,34233000,31600000], 2054000, [1,2,3,4]);
    await idoContract.setZogiRate([4838,4838,0,0], 242, [1,2,3,4]);
    await idoContract.setEthRate([27800000,25661538], 1668000, [3,4]);
    await idoContract.addUSDTAddress(usdtToken.address)

    await SummonContract.init(OriginBlockNFT.address, bezogiNFT.address, mblkToken.address,
        idoContract.address , zogiToken.address, usdtToken.address)
 
  });

  // All the testcases of Conversion Contract
describe("Test summoning functions", function () {
 
    it("call summon functions", async function () {
        // 1 = eth
        // 2 = usdt 
        // 3 = use ido allocation
        // 4 = mblk 
        // uint256[] memory nftInfo, uint8 paymentType, uint256 mblkUsdVal, uint256 nonce, bytes memory signature_
        // https://zogidev.whoolala.com/bezogia/pl/webgl/signature?mblk_usd_val=0&token_1=0&token_2=1&nonce=0&address=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
        // summoning.bezogiSummon=[0,1,0,0],4,0,0,0x90a5e40c911d1f66e2ea8eaa8321598f4b372278f43c8806b9e25cac3c32bee104659a591d2beff9cbee80db84ee04cd7e8425fd6864914ff99a74d0a80e23451c
        let sign = "0x9e3dc8cf634253b4d3932f8573f5019d305ea82d37fd34403b08857d7ef26601125d4479f884e8b419d14a2b395d8b831f66682f19159c9aac4ac246273ac0921c"
        
        await bezogiNFT.mintTo(owner.address, 4086)
        await SummonContract.updateSignerStatus("0x0a66D27b91bEC19dAAF6722680e6AdC9b7c064FF", true)
        // await usdtToken.issue("100000000000000000000");
        await usdtToken.approve(SummonContract.address, "115792089237316195423570985008687907853269984665640564039457584007913129639935")
        await SummonContract.setRefId("0xabc")
        await SummonContract.setBeneficiary(owner.address)
        await SummonContract.bezogiSummonStatus (false)
        await bezogiNFT.setAdmin(SummonContract.address,true);
        await bezogiNFT.setApprovalForAll(SummonContract.address, true)
        
        await SummonContract.approveUSDT("115792089237316195423570985008687907853269984665640564039457584007913129639935")
        
        console.log('owner.address=',owner.address);
        console.log('SummonContract.address=',SummonContract.address);
        console.log('usdtToken.address=',usdtToken.address);
        console.log('bezogiNFT.address=',bezogiNFT.address);
        console.log('idoContract.address=',idoContract.address);


        let totalSupplyOld = await bezogiNFT.totalSupply();
        console.log('totalSupplyOld',totalSupplyOld);
        
        // let tx = await SummonContract.bezogiSummon([0,1,0,0], 2, 0, 0, sign)
        let tokenId1 = 0;
        let tokenId2 = 1;
        let gen1 = 0;
        let gen2 = 0;
        console.log('bezogiNFT.ownerOf(tokenId1)=' ,await bezogiNFT.ownerOf(tokenId1));
        // 两个新的
        const transaction = await SummonContract.bezogiSummon([tokenId1,tokenId2,gen1,gen2], 2, 0, 0, sign)
        
        // 得到summonId
        const receipt = await transaction.wait();
        // console.log('receipt-',receipt)
        const originBlockSummonedDataStr = receipt.events[8]?.data?.toString();
        console.log('originBlockSummonedDataStr-',originBlockSummonedDataStr)
        // 8c1d353e0ebb139379abc752c180e15496523fa66367cdaeaeed8f9c56a13d620000000000000000000000000000000000000000000000000000000000000d60000000000000000000000000704f93beff4d180f182093cbfc6ea081e4a399a40000000000000000000000000000000000000000000000000000000000000000
        const originBlockSummonedDataWithout0x = originBlockSummonedDataStr?.substring(2, originBlockSummonedDataStr.length);
        console.log('originBlockSummonedDataWithout0x-',originBlockSummonedDataWithout0x)
        // 8c1d353e0ebb139379abc752c180e15496523fa66367cdaeaeed8f9c56a13d62
        // receipt.events[3]?.data?.toString().substring(2,66)
        const summonId = "0x" + originBlockSummonedDataWithout0x?.substring(0, 64);
        console.log('summonId', summonId);

        // claim nft
        // claimSummon(bytes32 summonId, uint256 tokenId1, uint256 tokenId2 )
        console.log('SummonContract=' ,SummonContract.address);
        console.log('bezogiNFT.ownerOf(tokenId1)=' ,await bezogiNFT.ownerOf(tokenId1));
        await SummonContract.claimSummon(summonId,tokenId1,tokenId2);
        let totalSupplyNew = await bezogiNFT.totalSupply();
        let newNFTId = totalSupplyNew - 1;
        console.log('totalSupplyNew',totalSupplyNew);
        console.log('newNFTId',newNFTId);

        // 一个新的，一个旧的(并且需要已经summon过一次)
        let nft1 = newNFTId;// 4086
        let nft2 = 1;
        let nft1gen = 1;
        let nft2gen = 0;
        let nft1summonCount = await SummonContract.summonCount(nft1);// 新的nft，所以gen=1，summongCount=0
        let nft2summonCount = await SummonContract.summonCount(nft2);// 旧的nft，所以gen=0，summongCount=1
        let userAddress = owner.address;
        let mblkVal = 0;
        let nonce = 0;
        let pk = "0x61430aa22b93ae464088be2c563fdc32515f06b5cb9d427b206529bbac09826b";
        let adminaddress = "0x0a66D27b91bEC19dAAF6722680e6AdC9b7c064FF";
        console.log('nft1,nft1gen,nft1summonCount=',nft1,nft1gen,nft1summonCount);
        console.log('nft2,nft2gen,nft2summonCount=',nft2,nft2gen,nft2summonCount);
        let hash2 = getmessageHash(nft1, nft2, nft1gen, nft2gen, nft1summonCount, nft2summonCount, userAddress, mblkVal, nonce);
        console.log("prefixed=", hash2)
        let sign2 = signMessage(hash2, adminaddress, pk)
        // http://localhost:9093/bezogia/pl/webgl/signature?mblk_usd_val=0&token_1=4086&token_2=1&nonce=0&address=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
        // 0xf3c235284d360a85e93096defd7005858ea3dfbfb8367a98a49874b4dbfa678c2b4f4b6579add6f420c7886ec7335e6f3cfca80669a1a0d0d1557ffdcdafb8bf1b
        console.log('signature=' ,sign2.signature)

        // 正式环境的
        // currentStage=3
        // totalAllocated=31107314009408086269666309
        console.log('ido.totalAllocated.before=' ,await idoContract.totalAllocated());
        await idoContract.updateDataForDebug(3, "31107314009408086269666309");
        console.log('ido.totalAllocated.after=' ,await idoContract.totalAllocated());

        // 再次summon
        console.log('bezogiNFT.ownerOf(newNFTId).before.summon=' ,await bezogiNFT.ownerOf(newNFTId));
        const transaction2 = await SummonContract.bezogiSummon([nft1,nft2,nft1gen,nft2gen], 2, 0, 0, sign2.signature)
        console.log('bezogiNFT.ownerOf(newNFTId).after.summon=' ,await bezogiNFT.ownerOf(newNFTId));

        //const getGreet = await greeter.getGreeting();

      }).timeout(100000);
  });
// cd /Users/zhangy/Desktop/backup/01-github-zogilabs/24-Bezoge-SmartContracts
// 测试全部
// npx hardhat test
// 测试单个文件
// npx hardhat test ./test/summoning/testSummon.js