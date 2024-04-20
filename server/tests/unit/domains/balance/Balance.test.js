const Balance = require("../../../../domains/balance/Balance");

describe("Balance", () => {
  it("should create a new Balance object with the given address and balance", () => {
    const address = "0x123abc";
    const balanceValue = 100;
    const balance = new Balance(address, balanceValue);

    expect(balance.address).toBe(address);
    expect(balance.balance).toBe(balanceValue);
  });
});
