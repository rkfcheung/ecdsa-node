const AccountRepository = require("../../../../domains/account/AccountRepository");
const BalanceRepository = require("../../../../domains/balance/BalanceRepository");
const BalanceService = require("../../../../domains/balance/BalanceService");

describe("BalanceService", () => {
  let accountRepository;
  let balanceRepository;
  let balanceService;

  beforeEach(() => {
    spy = jest.spyOn(console, "log").mockImplementation(() => {});

    accountRepository = new AccountRepository();
    balanceRepository = new BalanceRepository();
    balanceService = new BalanceService(accountRepository, balanceRepository);

    // Mocking the list method of accountRepository
    accountRepository.list = jest
      .fn()
      .mockReturnValue(["0x123", "0x456", "0x789"]);
  });

  afterEach(() => {
    spy.mockRestore();
  });

  describe("transfer", () => {
    it("should execute a valid transfer", () => {
      balanceRepository.updateBalance("0x123", 100);
      balanceRepository.updateBalance("0x456", 50);

      balanceService.transfer("0x123", "0x456", 30);

      expect(balanceRepository.getBalance("0x123")).toBe(70);
      expect(balanceRepository.getBalance("0x456")).toBe(80);
    });

    it("should not execute a transfer if the fromAddress is the same as the toAddress", () => {
      balanceRepository.updateBalance("0x123", 100);

      const consoleWarnSpy = jest
        .spyOn(console, "warn")
        .mockImplementation(() => {});

      balanceService.transfer("0x123", "0x123", 30);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "Failed to execute the transfer, please check the balance at 0x123 and payment details!"
      );
      expect(balanceRepository.getBalance("0x123")).toBe(100);

      consoleWarnSpy.mockRestore();
    });

    it("should not execute a transfer if the fromAddress has insufficient balance", () => {
      balanceRepository.updateBalance("0x123", 100);
      balanceRepository.updateBalance("0x456", 50);

      const consoleWarnSpy = jest
        .spyOn(console, "warn")
        .mockImplementation(() => {});

      balanceService.transfer("0x456", "0x123", 70);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "Failed to execute the transfer, please check the balance at 0x456 and payment details!"
      );
      expect(balanceRepository.getBalance("0x123")).toBe(100);
      expect(balanceRepository.getBalance("0x456")).toBe(50);

      consoleWarnSpy.mockRestore();
    });
  });
});
