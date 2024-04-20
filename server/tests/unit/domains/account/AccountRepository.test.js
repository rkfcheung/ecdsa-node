const AccountRepository = require("../../../../domains/account/AccountRepository");

describe("AccountRepository", () => {
  let accountRepository;

  beforeEach(() => {
    accountRepository = new AccountRepository();
  });

  test("constructor should initialize accounts with capacity", () => {
    expect(accountRepository.accounts.size).toBe(accountRepository.CAPACITY);
  });

  test("getAccount should return correct account by address", () => {
    const address = accountRepository.list()[0];
    const account = accountRepository.getAccount(address);
    expect(account).toBeDefined();
    expect(account.address).toBe(address);
  });

  test("list should return an array of account addresses", () => {
    const addresses = accountRepository.list();
    expect(addresses).toHaveLength(accountRepository.CAPACITY);
    addresses.forEach((address) => {
      expect(accountRepository.getAccount(address)).toBeDefined();
    });
  });

  // Add more test cases as needed to cover other methods of AccountRepository
});
