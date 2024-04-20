const { keccak256 } = require("ethereum-cryptography/keccak");
const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

class Account {
  constructor() {
    this.privateKey = secp256k1.utils.randomPrivateKey();
    this.publicKey = secp256k1.getPublicKey(this.privateKey);
    this.address = "0x" + toHex(keccak256(this.publicKey.slice(1)).slice(-20));
  }
}

module.exports = Account;
