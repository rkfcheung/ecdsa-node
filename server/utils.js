const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");

function uint8ArrayToHex(value, start) {
  return toHex(keccak256(value.slice(1)).slice(start));
}

module.exports = uint8ArrayToHex;
