// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "hardhat/console.sol";

import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol";
import "../accessControl/AccessProtectedUpgradable.sol";
import "../interfaces/IMBLK.sol";

contract MiniGame is OwnableUpgradeable,PausableUpgradeable,ReentrancyGuardUpgradeable,AccessProtectedUpgradable  {
    
    uint256 public maxReferalLimit;
    IMBLK public MBLK;

    struct DistributionInfo {
       address[] addresses;
       uint256[] percentages;
    }

    mapping(address => bool) private authorizedSigners;
    mapping(uint256 => DistributionInfo) private distributionMapping;  

    bool private initialized;
    using ECDSAUpgradeable for bytes32;
    
    event DepositedFunds(address sender,uint256 amount_, uint256 remainingAmount,uint256 orderNumber_);
    event CollectedFunds(address sender,uint256 amount_, uint256 orderNumber_);

    function init(address mblkAddress_,uint256 maxReferalLimit_) external initializer
    {
        require(!initialized);

        MBLK = IMBLK(mblkAddress_); 
        maxReferalLimit = maxReferalLimit_;
        __Ownable_init();
        __Pausable_init();

        initialized = true; 
    }

    function addDistributionInfo(
        uint256 distributionID,
        address[] memory addresses,
        uint256[] memory percentages
    ) external onlyOwner {
        require(addresses.length == percentages.length, "Invalid input length");
    
        DistributionInfo storage info = distributionMapping[distributionID];
        
        for (uint256 i = 0; i < addresses.length; i++) {
            info.addresses.push(addresses[i]);
            info.percentages.push(percentages[i]);
        }
    }

    function getDistributionInfo(uint256 distributionID) public view returns (DistributionInfo memory) {
        return distributionMapping[distributionID];
    }

    function setMaxReferalLimit(uint256 maxReferalLimit_) external onlyAdmin {
        require(maxReferalLimit != 0, "TGE value must be non-zero");
        maxReferalLimit = maxReferalLimit_;
    }

    function getMaxReferalLimit() public view returns (uint256){
        return maxReferalLimit;
    }

    function updateSignerStatus(address signer, bool status) external onlyOwner {
        authorizedSigners[signer] = status; 
    }

    function isSigner(address signer) external view returns (bool) {
        return authorizedSigners[signer];
    }

    function transferFunds(uint256 amount_,uint256 distributionID_,address sender_) private {
        DistributionInfo memory info  = getDistributionInfo(distributionID_);

        for(uint256 i=0; i<info.addresses.length;i++){
            // console.log("Value of addresses:::",sender_,info.addresses[i]);
            console.log("Value of percentages:::",((amount_*(info.percentages[i]))/100));
            MBLK.transferFrom(sender_,info.addresses[i],((amount_*(info.percentages[i]))/100));
        }
    }

    function DepositFunds(bytes memory signature_,
                          uint256 amount_,
                          string memory referalID_,
                          address referralAddress_,
                          uint256 referralPercentage_,
                          uint64 distributionID_,
                          uint256 orderNumber_,
                          uint256 nonce_
                          ) external whenNotPaused nonReentrant
    {   
        require(amount_ > 0, "Amount must be greater than zero");
        require((referralPercentage_ <= maxReferalLimit), "Referral percentage must be less than or equal to 20%");
       
        bytes32 msgHash = keccak256(abi.encodePacked(msg.sender,amount_,referalID_,referralAddress_,referralPercentage_,distributionID_,orderNumber_,nonce_));
        bytes32 prefixedHash = msgHash.toEthSignedMessageHash();
        
        address msgSigner = recover(prefixedHash, signature_);
        
        console.log("Value of msgSigner",msgSigner);
        require(authorizedSigners[msgSigner], "Invalid Signer");

        uint256 referralAmount = ((amount_*referralPercentage_)/100);
        uint256 remainingAmount = (amount_-(referralAmount));
        // 出去邀请人的分红后，其他资金按照比率转移到不同钱包，distributionID_只是一个下标，所以是指定到了特定一组钱包，每个钱包都有不同的比率
        transferFunds(remainingAmount,distributionID_,msg.sender);
        emit DepositedFunds(msg.sender,amount_,remainingAmount,orderNumber_);
    }

    function CollectFunds(bytes memory signature_, uint256 amount_,uint256 orderNumber_ ,uint256 nonce_) external whenNotPaused nonReentrant
    {   
        require(amount_ > 0, "Amount must be greater than zero");
       
        bytes32 msgHash = keccak256(abi.encodePacked(msg.sender,amount_,orderNumber_,nonce_));
        bytes32 prefixedHash = msgHash.toEthSignedMessageHash();
        
        address msgSigner = recover(prefixedHash, signature_);
        
        console.log("Value of msgSigner",msgSigner);
        require(authorizedSigners[msgSigner], "Invalid Signer");

        MBLK.transfer(msg.sender, amount_);
        
        emit CollectedFunds(msg.sender,amount_, orderNumber_);
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

     function recover(bytes32 hash, bytes memory signature_) private pure returns(address) {
        return hash.recover(signature_);
    }

    }