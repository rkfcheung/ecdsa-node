const Account = require("./Account");

class AccountRepository {
  constructor() {
    this.accounts = new Map();
    this.CAPACITY = 3;

    for (let i = 0; i < this.CAPACITY; i++) {
      const account = new Account();
      this.accounts.set(account.address, account);
      console.log(
        `Account ${
          account.address
        } created (${account.getPrivateKey()}, ${account.getPublicKey()}).`
      );
    }
  }

  getAccount(address) {
    return this.accounts.get(address) || null;
  }

  list() {
    return [...this.accounts.keys()];
  }
}

module.exports = AccountRepository;
