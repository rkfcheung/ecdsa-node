const Account = require("./Account");

class AccountRepository {
  constructor() {
    this.accounts = new Map();
    this.CAPACITY = 3;

    for (let i = 0; i < this.CAPACITY; i++) {
      const account = new Account();
      this.accounts.set(account.address, account);
    }
  }

  getAccount(address) {
    return this.accounts.get(address);
  }

  list() {
    return [...this.accounts.keys()];
  }
}

module.exports = AccountRepository;
