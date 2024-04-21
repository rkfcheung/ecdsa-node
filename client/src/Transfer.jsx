import { useState } from "react";
import server from "./server";
import { bytesToHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";
import { secp256k1 } from "ethereum-cryptography/secp256k1";

BigInt.prototype["toJSON"] = function () {
  return this.toString();
};

function Transfer({ address, setBalance }) {
  const [privateKey, setPrivateKey] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const tx = {
        from: address,
        to: recipient,
        value: parseInt(sendAmount),
      };
      const serializedTransaction = JSON.stringify(tx);
      const transactionHash = keccak256(
        new TextEncoder().encode(serializedTransaction)
      );
      const signature = secp256k1.sign(transactionHash, privateKey);

      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        signature: signature.toCompactHex(),
        transactionHash: bytesToHex(transactionHash),
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Private Key
        <input
          placeholder="Type a private key"
          value={privateKey}
          onChange={setValue(setPrivateKey)}
        ></input>
      </label>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
