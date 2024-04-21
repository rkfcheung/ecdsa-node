const { bytesToHex } = require("ethereum-cryptography/utils");
const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const toAddress = require("../../utils");

class Account {
  constructor() {
    this.privateKey = secp256k1.utils.randomPrivateKey();
    this.publicKey = secp256k1.getPublicKey(this.privateKey);
    this.address = toAddress(this.publicKey);
  }

  getPrivateKey() {
    return bytesToHex(this.privateKey);
  }

  getPublicKey() {
    return bytesToHex(this.publicKey);
  }
}

module.exports = Account;
