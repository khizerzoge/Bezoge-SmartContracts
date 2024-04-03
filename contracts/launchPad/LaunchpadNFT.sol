//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "erc721a/contracts/extensions/ERC721AQueryable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./ILaunchpadNFT.sol";
import "./AccessProtected.sol";


contract LaunchpadNFT is ERC721AQueryable, ILaunchpadNFT, AccessProtected {
    using Strings for uint256;

    string public baseURI;
    
    uint256 public LAUNCH_MAX_SUPPLY;    // max launch supply
    uint256 public LAUNCH_SUPPLY;        // current launch supply

    address public LAUNCHPAD;

    modifier onlyLaunchpad() {
        require(LAUNCHPAD != address(0), "Launchpad address must set");
        require(msg.sender == LAUNCHPAD, "Must be called by launchpad");
        _;
    }

    constructor(string memory name_, string memory symbol_, string memory baseURI_, address launchPad_, uint256 launchMaxSupply_) 
        ERC721A(name_, symbol_) {

        baseURI = baseURI_;
        LAUNCHPAD = launchPad_;
        LAUNCH_MAX_SUPPLY = launchMaxSupply_;
    }

    function _baseURI() internal view virtual override returns (string memory){
        return baseURI;
    }

    function setBaseURI(string memory _newURI) external onlyOwner {
        baseURI = _newURI;
    }

    function updateLaunchSupply(uint256 maxSupply_) external onlyOwner {
        require(maxSupply_ > 0, "Max supply should be greater than zero");
        LAUNCH_MAX_SUPPLY = maxSupply_;
    }

    function updateLaunchPadAddress(address launchPad_) external onlyOwner {
        require(launchPad_ != address(0), "Launchpad address can not be zero");
        LAUNCHPAD = launchPad_;
    }

    function getMaxLaunchpadSupply() view public override returns (uint256) {
        return LAUNCH_MAX_SUPPLY;
    }

    function getLaunchpadSupply() view public override returns (uint256) {
        return LAUNCH_SUPPLY;
    }

    function mintTo(address to, uint quantity) external override onlyLaunchpad {
        require(to != address(0), "Can't mint to empty address");
        require(quantity > 0, "Quantity must greater than zero");
        require(LAUNCH_SUPPLY + quantity <= LAUNCH_MAX_SUPPLY, "Max supply reached");

        _safeMint(to, quantity);
        LAUNCH_SUPPLY += quantity;
    }

    function ownerMintTo(address to,uint256 quantity) external onlyAdmin  {
        _mint(to, quantity);
    }

    function burn(uint256[] memory tokenIds) external {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            uint256 tokenId = tokenIds[i];
            address owner = ownerOf(tokenId);
            require(msg.sender == owner, string(abi.encodePacked(tokenId.toString()," is not your NFT")));
            _burn(tokenId);
        }
    }
}