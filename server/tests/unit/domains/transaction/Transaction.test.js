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

  describe("isSigned", () => {
    it("should return true when both signature and transactionHash are set", () => {
      // Arrange: Create a new transaction with signature and transactionHash
      const transaction = new Transaction("0x123", "0x456", 100);
      transaction.signature = "sampleSignature";
      transaction.transactionHash = "sampleTransactionHash";

      // Act: Call the isSigned method
      const result = transaction.isSigned();

      // Assert: Verify that the method returns true
      expect(result).toBe(true);
    });

    it("should return false when signature or transactionHash is not set", () => {
      // Arrange: Create a new transaction without signature and transactionHash
      const transaction = new Transaction("0x123", "0x456", 100);

      // Assert: Verify that the method returns false
      expect(transaction.isSigned()).toBe(false);

      transaction.signature = "sampleSignature";
      expect(transaction.isSigned()).toBe(false);

      transaction.signature = null;
      transaction.transactionHash = "sampleTransactionHash";
      expect(transaction.isSigned()).toBe(false);
    });
  });
});
