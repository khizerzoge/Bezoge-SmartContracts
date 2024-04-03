const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('BezogeKeys', function () {
  let bezogeKeys;
  let admin;
  let user1;
  let user2;

  before(async () => {
    [admin, user1, user2] = await ethers.getSigners();
    const BezogeKeys = await ethers.getContractFactory('BezogeKeys');
    bezogeKeys = await BezogeKeys.deploy('Bezoge Keys', 'BZGK', 'https://example.com/tokens/');
    await bezogeKeys.deployed();
  });

  it('should mint NFTs to multiple addresses', async () => {
    const ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const amounts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const recipients = [admin.address, user1.address, user2.address, admin.address, user1.address, user2.address, admin.address, user1.address, user2.address, admin.address];

    await bezogeKeys.connect(admin).mintLoop(recipients, ids, amounts);

    for (let i = 0; i < recipients.length; i++) {
      const balance = await bezogeKeys.balanceOf(recipients[i], ids[i]);
      expect(balance).to.equal(amounts[i]);
    }
  });

  it("should mint tokens", async function() {
    // Mint 1 token to an address
    await bezogeKeys.mint(admin.address, 1, 1, "0x");

    // Check the balance of the address
    // const balance = await bezogeKeys.balanceOf("0x123", 1);
    // expect(balance).to.equal(1);

    // // Mint 2 tokens to the same address
    // await bezogeKeys.mint("0x123", 1, 2, "0x");

    // // Check the balance of the address
    // const newBalance = await bezogeKeys.balanceOf("0x123", 1);
    // expect(newBalance).to.equal(3);
  });
});