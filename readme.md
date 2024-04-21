## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions

For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4

### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder
2. Run `npm install` to install all the depedencies
3. Run `node index` to start the server

The application should connect to the default server port (3042) automatically!

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.

### Solution

- [signed-tx.js](server/scripts/signed-tx.js)
- [Transfer.jsx](client/src/Transfer.jsx)
- [TransactionValidator.js](server/domains/transaction/TransactionValidator.js)

1. Sender signs the transaction with the Private Key.
2. Server verify the signed transaction with the Public Key of Sender.

```text
Transaction {
  from: '0xe1f3805c387e01ff22ccd2dad71e6a7ff4593854',
  to: '0x14c1f1afdda8010926e331d6560f2405618769cd',
  value: 1,
  signature: 'bbad816ef07cdfafd20446d5d1ed445ba697632ebe4c524c68324d510b22737f4f7bf600d1bd4fd7859cd0e9edf9cf9d81ac54d31f62516b924094f142d042fb',
  transactionHash: '0a99d0b6540a624e639aeed3097bdb3753cfb5ce874be4ee95a28091ae398750'
} Verified: true
Transaction from 0xe1f3805c387e01ff22ccd2dad71e6a7ff4593854 to 0x14c1f1afdda8010926e331d6560f2405618769cd done.
```
