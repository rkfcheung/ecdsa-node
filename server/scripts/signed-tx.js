const { bytesToHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const Account = require("../domains/account/Account");
const Transaction = require("../domains/transaction/Transaction");

// Step 1: Create sender and recipient accounts
const sender = new Account();
const recipient = new Account();

console.log("Sender Address:", sender.address);
console.log("Recipient Address:", recipient.address);

// Step 2: Create a transaction object
const value = 10;
const tx = new Transaction(sender.address, recipient.address, value);

// Step 3: Sign the transaction
const serializedTransaction = JSON.stringify(tx);
console.log("Serialized Transaction:", serializedTransaction);

const transactionHash = keccak256(
  new TextEncoder().encode(serializedTransaction)
);
console.log("Transaction Hash:", bytesToHex(transactionHash));

const signature = secp256k1.sign(transactionHash, sender.getPrivateKey());

// Step 4: Serialize the signed transaction
const signedTransaction = {
  ...tx,
  signature: signature,
  transactionHash: transactionHash,
};
console.log("Signed Transaction:", signedTransaction);

// Step 5: Verify the signed transaction
const isSigned = secp256k1.verify(
  signature,
  signedTransaction.transactionHash,
  sender.getPublicKey()
);
console.log("Is Signed:", isSigned);
