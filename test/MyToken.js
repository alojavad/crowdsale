//const { assert } = require("chai");
//const { artifacts} = require("truffle");


const MyToken = artifacts.require("MyToken");

contract("MyToken", accounts => {
  let myToken;

  beforeEach(async () => {
    myToken = await MyToken.new();
  });

  it("should have an initial balance of 10^18 for GOLD token", async () => {
    const balance = await myToken.balanceOf(accounts[0], 0);
    assert.equal(balance.toString(), "1000000000000000000", "Initial balance of GOLD token should be 10^18");
  });

  it("should mint a new token with balance of 10^9", async () => {
    await myToken.mint(accounts[0], 3, "1000000000", "");
    const balance = await myToken.balanceOf(accounts[0], 3);
    assert.equal(balance.toString(), "1000000000", "Minted token should have balance of 10^9");
  });

  it("should transfer tokens between accounts", async () => {
    const alice = accounts[1];
    const bob = accounts[2];
    await myToken.transferFrom(accounts[0], alice, 0, "500000000");
    await myToken.transferFrom(alice, bob, 0, "250000000");
    const aliceBalance = await myToken.balanceOf(alice, 0);
    const bobBalance = await myToken.balanceOf(bob, 0);
    assert.equal(aliceBalance.toString(), "500000000", "Alice should have 5*10^8 GOLD tokens");
    assert.equal(bobBalance.toString(), "250000000", "Bob should have 2.5*10^8 GOLD tokens");
  });

  it("should batch transfer tokens between accounts", async () => {
    const alice = accounts[1];
    const bob = accounts[2];
    const ids = [0, 1];
    const amounts = ["1000000000", "1000000000000000000"];
    await myToken.safeBatchTransferFrom(accounts[0], alice, ids, amounts, "");
    await myToken.safeBatchTransferFrom(alice, bob, ids, amounts, "");
    const aliceGoldBalance = await myToken.balanceOf(alice, 0);
    const aliceSilverBalance = await myToken.balanceOf(alice, 1);
    const bobGoldBalance = await myToken.balanceOf(bob, 0);
    const bobSilverBalance = await myToken.balanceOf(bob, 1);
    assert.equal(aliceGoldBalance.toString(), "1000000000", "Alice should have 10^9 GOLD tokens");
    assert.equal(aliceSilverBalance.toString(), "1000000000000000000", "Alice should have 10^18 SILVER tokens");
    assert.equal(bobGoldBalance.toString(), "1000000000", "Bob should have 10^9 GOLD tokens");
    assert.equal(bobSilverBalance.toString(), "1000000000000000000", "Bob should have 10^18 SILVER tokens");
  });
});