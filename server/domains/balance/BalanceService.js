class BalanceService {
  constructor(accountRepository, balanceRepository) {
    this.accountRepository = accountRepository;
    this.balanceRepository = balanceRepository;

    this.accountRepository.list().forEach((address) => {
      const balance = 50 + Math.floor(Math.random() * 3) * 25;
      this.balanceRepository.updateBalance(address, balance);
      console.log(`Account ${address} balance initilised to ${balance}.`);
    });
  }

  transfer(fromAddress, toAddress, amount) {
    const fromBalance = this.balanceRepository.getBalance(fromAddress);
    if (fromBalance < amount || fromAddress === toAddress) {
      console.warn(
        `Failed to execute the transfer, please check the balance at ${fromAddress} and payment details!`
      );

      return;
    }

    const toBalance = this.balanceRepository.getBalance(toAddress);
    this.balanceRepository.updateBalance(fromAddress, fromBalance - amount);
    this.balanceRepository.updateBalance(toAddress, toBalance + amount);
    console.log(`Transaction from ${fromAddress} to ${toAddress} done.`);
  }
}

module.exports = BalanceService;
