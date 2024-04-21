const { keccak256 } = require("ethereum-cryptography/keccak");
const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = secp256k1.utils.randomPrivateKey();
console.log("Private Key:", toHex(privateKey));

const publicKey = secp256k1.getPublicKey(privateKey);
console.log("Public Key:", toHex(publicKey));

function getAddress(publicKey) {
  return keccak256(publicKey.slice(1)).slice(-20);
}
const address = getAddress(publicKey);
console.log("Address:", toHex(address));

console.log("Random Address:", randomAddress());

function randomAddress() {
  const priKey = secp256k1.utils.randomPrivateKey();
  const pubKey = secp256k1.getPublicKey(priKey);
  const addr = "0x" + toHex(getAddress(pubKey));

  console.log("Private Key:", toHex(privateKey), "; Address:", addr);

  return addr;
}
