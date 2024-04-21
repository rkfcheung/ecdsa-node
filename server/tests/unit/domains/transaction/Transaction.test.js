const Transaction = require("../../../../domains/transaction/Transaction");

describe("Transaction", () => {
  test("should create a transaction with correct properties", () => {
    // Create a new transaction instance
    const transaction = new Transaction("0x123", "0x456", 100);

    // Check if the properties are set correctly
    expect(transaction.from).toBe("0x123");
    expect(transaction.to).toBe("0x456");
    expect(transaction.value).toBe(100);
  });
});
