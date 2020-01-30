/*##########################
##     CONFIGURATION      ##
##########################*/

//  -- Step 1: Set up the appropriate configuration
const Web3 = require("web3")
const EthereumTransaction = require("ethereumjs-tx").Transaction;
const web3 = new Web3('HTTP://127.0.0.1:7545')

// -- Step 2: Set the sending and receiving addresses for the transaction.
const sendingAddress = "0xb5015bC487f638318E74E4C1Cb56de09094B3E0E"
const receivingAddress = "0x7DA38BFc9Dc68E4295704213CdB61d3eCA4F439E"

// -- Step 3: Check the balances of each address
web3.eth.getBalance(sendingAddress).then(console.log)
web3.eth.getBalance(receivingAddress).then(console.log)

/*##########################
##  CREATE A TRANSACTION  ##
##########################*/

// -- Step 4: Set up the transaction using the transaction constiables as shown
const rawTransaction = {
    nonce: 5,
    to: receivingAddress,
    gasPrice: 20000000,
    gasLimit: 30000,
    value: 1000000000000000000,
    data: "0x7f7465737432000000000000000000000000000000000000000000000000000000600057"
};

// -- Step 5: View the raw transaction
//rawTransaction

// -- Step 6: Check the new account balances (they should be the same)
web3.eth.getBalance(sendingAddress).then(console.log)
web3.eth.getBalance(receivingAddress).then(console.log)

// Note: They haven't changed because they need to be signed...

/*##########################
##  Sign the Transaction  ##
##########################*/

// -- Step 7: Sign the transaction with the Hex value of the private key of the sender
const privateKeySender = '7a23a62cd82728933b05027c1c7012ca69eb8ecd16b260611825d897447bdc41';
const privateKeySenderHex = Buffer.from(privateKeySender,"hex");
const transaction = new EthereumTransaction(rawTransaction);


console.log("Transaction",transaction)
transaction.sign(privateKeySenderHex)

/*#########################################
##  Send the transaction to the network  ##
#########################################*/

// -- Step 8: Send the serialized signed transaction to the Ethereum network.
const serializedTransaction = transaction.serialize();
// web3.eth.sendSignedTransaction(serializedTransaction);
web3.eth.sendSignedTransaction(serializedTransaction, function(err, hash) {
    if (!err) {
        console.log(hash); // "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385"
        console.log("SENDING ADDRESS UPDATED BALANCE")
        web3.eth.getBalance(sendingAddress).then(console.log)
    } else {
        console.log(err)
    }
});



