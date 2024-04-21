const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");

function toAddress(value) {
  return "0x" + toHex(keccak256(value.slice(1)).slice(-20));
}

module.exports = toAddress;
