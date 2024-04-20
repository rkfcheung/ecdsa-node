const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const AccountRepository = require("./domains/account/AccountRepository");
const BalanceRepository = require("./domains/balance/BalanceRepository");
const BalanceService = require("./domains/balance/BalanceService");

const accountRepository = new AccountRepository();
const balanceRepository = new BalanceRepository();
const balanceService = new BalanceService(accountRepository, balanceRepository);
const balances = Object.fromEntries(balanceService.balances);

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
