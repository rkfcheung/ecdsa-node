const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const uint8ArrayToHex = require("../../utils");

class Account {
  constructor() {
    this.privateKey = secp256k1.utils.randomPrivateKey();
    this.publicKey = secp256k1.getPublicKey(this.privateKey);
    this.address = "0x" + uint8ArrayToHex(this.publicKey.slice(1), -20);
  }

  getPrivateKey() {
    return uint8ArrayToHex(this.privateKey);
  }

  getPublicKey() {
    return uint8ArrayToHex(this.publicKey);
  }
}

module.exports = Account;
