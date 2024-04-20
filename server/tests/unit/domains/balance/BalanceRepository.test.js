const BalanceRepository = require("../../../../domains/balance/BalanceRepository");

describe("BalanceRepository", () => {
  let balanceRepository;

  beforeEach(() => {
    balanceRepository = new BalanceRepository();
  });

  describe("getBalance", () => {
    it("should return 0 for non-existent address", () => {
      expect(balanceRepository.getBalance("0x123")).toBe(0);
    });

    it("should return the balance for an existing address", () => {
      balanceRepository.updateBalance("0x456", 100);
      expect(balanceRepository.getBalance("0x456")).toBe(100);
    });
  });

  describe("updateBalance", () => {
    it("should update the balance for a valid address", () => {
      balanceRepository.updateBalance("0x789", 50);
      expect(balanceRepository.getBalance("0x789")).toBe(50);
    });

    it("should not update the balance for a negative value", () => {
      const consoleWarnSpy = jest
        .spyOn(console, "warn")
        .mockImplementation(() => {});

      balanceRepository.updateBalance("0xabc", -10);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "Failed to update the balance, please check the value at -10!"
      );
      expect(balanceRepository.getBalance("0xabc")).toBe(0);

      consoleWarnSpy.mockRestore();
    });
  });
});
