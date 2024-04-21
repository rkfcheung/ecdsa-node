const { secp256k1 } = require("ethereum-cryptography/secp256k1");

class TransactionValidator {
  constructor(accountRepository) {
    this.accountRepository = accountRepository;
  }

  verify(transaction) {
    if (!transaction.isSigned()) {
      return false;
    }

    const sender = this.accountRepository.getAccount(transaction.from);
    const recipient = this.accountRepository.getAccount(transaction.to);
    if (sender === null || recipient === null) {
      return false;
    }

    return secp256k1.verify(
      transaction.signature,
      transaction.transactionHash,
      sender.getPublicKey()
    );
  }
}

module.exports = TransactionValidator;
