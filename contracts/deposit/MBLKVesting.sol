// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;


import "@openzeppelin/contracts-upgradeable@4.9/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable@4.9/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable@4.9/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable@4.9/utils/cryptography/ECDSAUpgradeable.sol";
import "../accessControl/AccessProtectedUpgradable.sol";
import "../interfaces/IMBLK.sol";

contract MBLKVesting is OwnableUpgradeable,PausableUpgradeable,ReentrancyGuardUpgradeable,AccessProtectedUpgradable  {
    
    IMBLK public MBLK;

    mapping(address => bool) private authorizedSigners;
    
    mapping(uint256 => bool) public orders;

    bool private initialized;
    using ECDSAUpgradeable for bytes32;
    
    event DepositedFunds(address sender,uint256 amount_, uint256 order_);
    event CollectedFunds(address sender,uint256 amount_, uint256 order_);

    function init(address mblkAddress_) external initializer
    {
        require(!initialized);
        MBLK = IMBLK(mblkAddress_); 

        __Ownable_init();
        __Pausable_init();

        initialized = true; 
    }

    function updateSignerStatus(address signer, bool status) external onlyOwner {
        authorizedSigners[signer] = status; 
    }

    function isSigner(address signer) external view returns (bool) {
        return authorizedSigners[signer];
    }
   
    function DepositFunds(bytes memory signature_,uint256 amount_,uint256 order_) external whenNotPaused nonReentrant
    {   
        require(amount_ > 0, "Amount must be greater than zero");

        bytes32 msgHash = keccak256(abi.encodePacked(msg.sender,amount_,order_));

        bytes32 prefixedHash = msgHash.toEthSignedMessageHash();
        address msgSigner = recover(prefixedHash, signature_);
        require(authorizedSigners[msgSigner], "Invalid Signer");
        require(orders[order_] == false, "Record already exists");
        orders[order_] = true;

        MBLK.transferFrom(msg.sender,address(this),amount_);

        emit DepositedFunds(msg.sender,amount_,order_);
    }

    function CollectFunds(bytes memory signature_,uint256 amount_,uint256 order_) external whenNotPaused nonReentrant
    {   
        require(amount_ > 0, "Amount must be greater than zero");
        // Signature order must be different from deposit
        bytes32 msgHash = keccak256(abi.encodePacked(amount_,msg.sender,order_));

        bytes32 prefixedHash = msgHash.toEthSignedMessageHash();
        address msgSigner = recover(prefixedHash, signature_);
        require(authorizedSigners[msgSigner], "Invalid Signer");
        require(orders[order_] == false, "Record already exists");
        orders[order_] = true;
        
        MBLK.transfer(msg.sender, amount_);
        
        emit CollectedFunds(msg.sender,amount_,order_);
    }

    function AdminTransfer(address to, uint256 amount_) external onlyAdmin
    {
        MBLK.transfer(to, amount_);
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