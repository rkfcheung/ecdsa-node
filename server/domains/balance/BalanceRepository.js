const Balance = require("./Balance");

class BalanceRepository {
  constructor() {
    this.balances = new Map();
  }

  getBalance(address) {
    return this.balances.get(address) || 0;
  }

  updateBalance(address, balance) {
    if (balance < 0) {
      console.warn(
        `Failed to update the balance, please check the value at ${balance}!`
      );

      return;
    }

    this.balances.set(address, balance);
  }
}

module.exports = BalanceRepository;
