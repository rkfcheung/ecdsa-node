const Balance = require("./Balance");

class BalanceRepository {
  constructor() {
    this.balances = new Map();
  }

  getBalance(address) {
    return this.balances.get(address) || 0;
  }

  transfer(fromAddress, toAddress, amount) {
    const fromBalance = this.getBalance(fromAddress);
    if (fromBalance < amount || fromAddress === toAddress) {
      console.warn(
        `Failed to execute the transfer, please check the balance at ${fromAddress} and payment details!`
      );

      return;
    }

    this.balances.set(fromAddress, fromBalance - amount);
    this.balances.set(toAddress, this.getBalance(toAddress) + amount);
  }
}

module.exports = BalanceRepository;
