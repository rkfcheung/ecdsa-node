const BalanceRepository = require("../../../../domains/balance/BalanceRepository");

describe("BalanceRepository", () => {
  let balanceRepository;

  beforeEach(() => {
    balanceRepository = new BalanceRepository();
  });

  test("getBalance should return 0 for non-existent address", () => {
    const address = "0x123";
    expect(balanceRepository.getBalance(address)).toBe(0);
  });

  test("transfer should update balances correctly", () => {
    const fromAddress = "0x456";
    const toAddress = "0x789";
    const amount = 100;

    balanceRepository.balances.set(fromAddress, 200);
    balanceRepository.transfer(fromAddress, toAddress, amount);

    expect(balanceRepository.getBalance(fromAddress)).toBe(100); // 200 - 100 = 100
    expect(balanceRepository.getBalance(toAddress)).toBe(100); // 0 + 100 = 100
  });

  test("transfer should not update balances if insufficient balance", () => {
    const fromAddress = "0xabc";
    const toAddress = "0xdef";
    const amount = 200;

    balanceRepository.balances.set(fromAddress, 100);
    balanceRepository.transfer(toAddress, fromAddress, amount);

    expect(balanceRepository.getBalance(fromAddress)).toBe(100); // Should remain unchanged
    expect(balanceRepository.getBalance(toAddress)).toBe(0); // Should remain unchanged
  });

  test("transfer should ignore transfer if sender and receiver addresses are the same", () => {
    const address = "0x123";
    const amount = 100;

    // Set initial balance for the address
    balanceRepository.balances.set(address, 200);

    // Attempt transfer with sender and receiver addresses being the same
    balanceRepository.transfer(address, address, amount);

    // Expect balance to remain unchanged
    expect(balanceRepository.getBalance(address)).toBe(200); // Balance should remain unchanged
  });
});
