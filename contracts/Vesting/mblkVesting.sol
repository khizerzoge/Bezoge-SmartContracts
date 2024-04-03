// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "hardhat/console.sol";

import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "../accessControl/AccessProtectedUpgradable.sol";
import "../IDO/MBLKIDOV2.sol"; 
import "../interfaces/IMBLK.sol";

contract MBLKVesting is OwnableUpgradeable,PausableUpgradeable,ReentrancyGuardUpgradeable,AccessProtectedUpgradable  {
    
    uint256 private mintedAmount; //keeps count of how much is released
    mapping(address => uint256) private claimedAmount; // how much a specific user has claimed
    mapping(address => uint256) private claimDays; // for how many days a specific user has claimed
    mapping(address => bool) private TGEclaimed; // check if user has claimed or not
    mapping(address => uint256) private claimAmountAfterTGE; // Allocation Amount left after TGE 
    // mapping(address => uint256) private lastClaimed; // timestamp of when user last claimed
    mapping(address => uint256) private privateSaleMapping; //privateSale Mapping for private 
 
    uint64 private privateCliff; 
    uint64 private publicCliff;
    uint64 private TGE;
    uint64 private oneDay = 86400;
    bool private initialized;

    MBLKIDOV2 public mblkIdo;
    IMBLK public MBLK;

    event MBLKReleased(address indexed userAddress, uint256 claimedAmount,uint256 timestamp,string claimType);

    function init(address mblkAddress_,address mblkidoAddress_,uint64 TGE_, uint64 privateCliff_,uint64 publicCliff_) external initializer
    {
        require(!initialized);

        mblkIdo = MBLKIDOV2(mblkidoAddress_);
        MBLK = IMBLK(mblkAddress_); 
        privateCliff = privateCliff_ ; 
        publicCliff = publicCliff_;
        TGE = TGE_;

        __Ownable_init();
        __Pausable_init();

        initialized = true; 
    }

    function getTGE() public view returns (uint64){
        return TGE;
    }

    function getPublicCliff() public view returns (uint64){
        return publicCliff;
    }

    function getPrivateCliff() public view returns (uint64){
        return privateCliff;
    }

    function setTGE(uint64 TGE_) external onlyAdmin {
        TGE = TGE_;
    }

    function setPrivateSaleMapping(address userAddress_,uint256 Amount_) external onlyAdmin {
        privateSaleMapping[userAddress_] = Amount_;
    }

    function getPrivateSaleMapping(address userAddress_) public view returns (uint256){
        return privateSaleMapping[userAddress_];
    }

    function setprivateCliff(uint64 privateCliff_) external onlyAdmin {
        privateCliff = privateCliff_;
    }

    function setpublicCliff(uint64 publicCliff_) external onlyAdmin { 
        publicCliff = publicCliff_;
    }

    function getAllocatedMBLK() private view returns (uint256){
        return mblkIdo.userAllocation(msg.sender);
    }

    function validateTGE(address sender_) public view{
        require(block.timestamp >= TGE,"TGE has not started yet");
        require((TGEclaimed[sender_] == false),"TGE already claimed");
    }

    function claimTGE(address sender_,uint256  type_) public whenNotPaused (){
        
        uint256 userAllocation;
        uint256 mintAmount;
        uint256 afterTGE;

        validateTGE(sender_);

        if(type_ == 1){
            userAllocation = privateSaleMapping[sender_];
            mintAmount = (userAllocation*5)/100;
            privateSaleMapping[sender_] -= mintAmount;
        }else{
            userAllocation = getAllocatedMBLK();
            mintAmount = (userAllocation*10)/100;
        }

        MBLK.mint(sender_,mintAmount);
        mintedAmount += mintedAmount;
        claimedAmount[sender_] += mintedAmount;
        TGEclaimed[sender_] = true;
        
        if(type_ == 1){
            afterTGE = privateSaleMapping[sender_];
        }else{
            afterTGE = getAllocatedMBLK();
        }

        claimAmountAfterTGE[sender_] = afterTGE;
        emit MBLKReleased(msg.sender,mintedAmount,block.timestamp,"TGE");
    }

    function calculateDays(uint64 type_) private view returns(uint256){
        if(type_ == 1){
          return(block.timestamp-privateCliff)/oneDay;
        }
        else{
          return (block.timestamp-publicCliff)/oneDay;
        }
    }

    function calculateMintAmount(uint256 balance_,uint64 type_) private pure returns(uint256){
       if(type_ == 1){
            return ((balance_ * 100)/720);
       }
       else{
           return ((balance_ * 100)/360);
       }
    }

    function claimPublicSale() external whenNotPaused nonReentrant(){
        require(block.timestamp >= publicCliff,"public cliff period has not started yet");
        require((block.timestamp-(publicCliff+oneDay) > oneDay),"Can't claim twice on the same day");

        uint256 userAllocation; 
        uint256 mintAmount;
        uint256 currentDays;
        uint256 daysDifference = calculateDays(0);

        currentDays = daysDifference-claimDays[msg.sender];

        if(TGEclaimed[msg.sender] == false){
            claimTGE(msg.sender,0);
            userAllocation = claimAmountAfterTGE[msg.sender];
            mintAmount =  (calculateMintAmount(userAllocation,0)*currentDays)/100; 
        }
        else{
            userAllocation = claimAmountAfterTGE[msg.sender];
            mintAmount =  (calculateMintAmount(userAllocation,0)*currentDays)/100; 
        }

        MBLK.mint(msg.sender, mintAmount);
        mintedAmount += mintAmount;
        claimedAmount[msg.sender] += mintAmount;
        // lastClaimed[msg.sender] = block.timestamp;
        claimDays[msg.sender] = daysDifference;
        emit MBLKReleased(msg.sender,mintedAmount,block.timestamp,"PublicClaim");
    }

    function claimPrivateSale() external whenNotPaused nonReentrant(){
        require(block.timestamp >= privateCliff,"private cliff period has not started yet");

        uint256 userAllocation; 
        uint256 mintAmount;
        uint256 currentDays;

        uint256 notClaimedDays = calculateDays(1);
        currentDays = notClaimedDays-claimDays[msg.sender];
        
        if(TGEclaimed[msg.sender] == false){
            claimTGE(msg.sender,1);
            userAllocation = claimAmountAfterTGE[msg.sender];
            mintAmount = (calculateMintAmount(userAllocation,1)*currentDays)/100; 
        }else{
            userAllocation = claimAmountAfterTGE[msg.sender];
            notClaimedDays = calculateDays(1);
            mintAmount = (calculateMintAmount(userAllocation,1)*currentDays)/100; 
        }

        MBLK.mint(msg.sender, mintAmount);
        mintedAmount += mintAmount;
        claimedAmount[msg.sender] += mintAmount;
        claimDays[msg.sender] = notClaimedDays;
        emit MBLKReleased(msg.sender,mintedAmount,block.timestamp,"PrivateClaim");
    }

    function getTotalClaimed() external view returns(uint256){
        return claimedAmount[msg.sender];
    }

    function renounceOwnership() public view override onlyOwner {
        revert("can't renounceOwnership here");
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    }