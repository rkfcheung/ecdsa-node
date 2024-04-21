const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const AccountRepository = require("./domains/account/AccountRepository");
const BalanceRepository = require("./domains/balance/BalanceRepository");
const BalanceService = require("./domains/balance/BalanceService");
const Transaction = require("./domains/transaction/Transaction");
const TransactionValidator = require("./domains/transaction/TransactionValidator");

const accountRepository = new AccountRepository();
const balanceRepository = new BalanceRepository();
const balanceService = new BalanceService(accountRepository, balanceRepository);
const transactionValidator = new TransactionValidator(accountRepository);

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balanceRepository.getBalance(address);
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature, transactionHash } = req.body;
  const transaction = new Transaction(sender, recipient, amount);
  transaction.signature = signature;
  transaction.transactionHash = transactionHash;
  const verified = transactionValidator.verify(transaction);
  console.log(transaction, "Verified:", verified);

  if (!verified) {
    res.status(401).send({ message: "Unverified transaction!" });
  } else if (balanceRepository.getBalance(sender) < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balanceService.transfer(sender, recipient, amount);
    res.send({ balance: balanceRepository.getBalance(sender) });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
