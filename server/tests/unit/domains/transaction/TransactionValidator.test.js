const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const TransactionValidator = require("../../../../domains/transaction/TransactionValidator");

// Mock the AccountRepository
const mockAccountRepository = {
  getAccount: jest.fn(),
};

describe("TransactionValidator", () => {
  let transactionValidator;

  beforeEach(() => {
    jest.clearAllMocks();

    // Create a new instance of TransactionValidator before each test
    transactionValidator = new TransactionValidator(mockAccountRepository);
  });

  describe("verify", () => {
    it("should return true if the transaction is signed and valid", () => {
      // Arrange: Create a transaction with signature and transaction hash
      const privateKey =
        "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";
      const messageHash =
        "a33321f98e4ff1c283c76998f14f57447545d339b3db534c6d886decb4209f28";
      const transaction = {
        from: "0x123",
        to: "0x456",
        isSigned: jest.fn(() => true),
        signature: secp256k1.sign(messageHash, privateKey),
        transactionHash: messageHash,
      };

      // Mock the getAccount method to return a sender with a valid public key
      mockAccountRepository.getAccount.mockReturnValue({
        getPublicKey: jest.fn(() => secp256k1.getPublicKey(privateKey)),
      });

      // Act: Call the verify method
      const result = transactionValidator.verify(transaction);

      // Assert: Verify that the result is true
      expect(result).toBe(true);
      // Verify that the getAccount method was called with the correct sender address
      expect(mockAccountRepository.getAccount).toHaveBeenCalledWith("0x123");
    });

    it("should return false if the transaction is not signed", () => {
      // Arrange: Create a transaction without signature and transaction hash
      const transaction = {
        from: "0x123",
        to: "0x456",
        isSigned: jest.fn(() => false),
      };

      // Act: Call the verify method
      const result = transactionValidator.verify(transaction);

      // Assert: Verify that the result is false
      expect(result).toBe(false);
      // Verify that the getAccount method was not called
      expect(mockAccountRepository.getAccount).not.toHaveBeenCalled();
    });

    it("should return false if the sender or recipient account does not exist", () => {
      // Arrange: Create a transaction with valid signature and transaction hash
      const transaction = {
        from: "nonExistentSender",
        to: "0x456",
        isSigned: jest.fn(() => true),
        signature: "sampleSignature",
        transactionHash: "sampleTransactionHash",
      };

      // Mock the getAccount method to return null for sender
      mockAccountRepository.getAccount.mockReturnValueOnce(null);
      // Mock the getAccount method to return a recipient with a valid public key
      mockAccountRepository.getAccount.mockReturnValueOnce({
        getPublicKey: jest.fn(() => "sampleRecipientPublicKey"),
      });

      // Act: Call the verify method
      const result = transactionValidator.verify(transaction);

      // Assert: Verify that the result is false
      expect(result).toBe(false);
      // Verify that the getAccount method was called with the correct sender address
      expect(mockAccountRepository.getAccount).toHaveBeenCalledWith(
        "nonExistentSender"
      );
      // Verify that the getAccount method was called with the correct recipient address
      expect(mockAccountRepository.getAccount).toHaveBeenCalledWith("0x456");
    });
  });
});
