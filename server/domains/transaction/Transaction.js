class Transaction {
  constructor(from, to, value) {
    this.from = from;
    this.to = to;
    this.value = value;
    this.signature = null;
    this.transactionHash = null;
  }

  isSigned() {
    return this.signature !== null && this.transactionHash !== null;
  }
}

module.exports = Transaction;
