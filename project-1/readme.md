# project 1

- Your employer is trying to make a proof of concept on how a Blockchain application can be implemented in his company.

- He is an astronomy fan and because of that he spends most of his free time searching stars in the sky, that's why he wants to create a test application that allows him and his friends to register stars, and track the ownership of each.

## requirements

- The application will create a Genesis Block when we run the application.

- The user will request the application to send a message to be signed using a Wallet and in this way verify the ownership over the wallet address. The message format will be:

```sh
<WALLET_ADRESS>:${new Date().getTime().toString().slice(0,-3)}:starRegistry
```

- Once the user has the message they can use a Wallet (Electrum or Bitcoin Core for example) to sign the message.

- The user will try to submit the Star object for that. The submission will consist of: wallet address, message, signature and the star object with the star information. The Start information will be formed in this format:

```sh
"star": {
         "dec": "68° 52' 56.9",
         "ra": "16h 29m 1.0s",
         "story": "Testing the story 4"
     }

```

- The application will verify if the time elapsed from the request ownership (the time is contained in the message) and the time when you submit the star is less than 5 minutes.

- If everything is okay the star information will be stored in the block and added to the chain encoding the Star information.

- The application will allow us to retrieve the Star objects belong to an owner (wallet address). This information should be human readable so it shouldn't be encoded.

### block.js

```sh
What do I need to implement to construct my block?

# 1
block.js file. In the Block class we are going to implement the method: validate().

The validate() method will validate if the block has been tampered or not.

Been tampered means that someone from outside the application tried to change values in the block data as a consequence the hash of the block should be different.

        Steps:
            1. Return a new promise to allow the method be called asynchronous.
            2. Create an auxiliary variable and store the current hash of the block in it (this represent the block object)
            3. Recalculate the hash of the entire block (Use SHA256 from crypto-js library)
            4. Compare if the auxiliary hash value is different from the calculated one.
            5. Resolve true or false depending if it is valid or not.

# 2
block.js file. In the Block class we are going to implement the method: getBData().

Auxiliary Method to return the data stored in the body of the block but decoded.
        Steps:
            1. Use hex2ascii module to decode the data
            2. Because data is a javascript object use JSON.parse(string) to get the Javascript Object
            3. Resolve with the data and make sure that you don't need to return the data for the genesis block or Reject with an error.

```

### blockchain.js

What do I need to implement to construct my blockchain class?

```sh
# 1

blockchain.js file. In the Blockchain class we are going to implement the method: _addBlock(block).
        1. _addBlock(block) will add a block in the chain
        2. The method will return a Promise that will resolve with the block added or reject if an error happen during the execution.
        3. You will need to check for the height to assign the previousBlockHash, assign the timestamp and the correct height...
        4. At the end you need to create the block hash and push the block into the chain array. Don't forget to update the this.height class variable.
        5. Note: the symbol _ in the method name indicates in the javascript convention this method is a private method.

# 2

In the Blockchain class we are going to implement the method: requestMessageOwnershipVerification(address)

    1. The requestMessageOwnershipVerification(address) method will allow you to request a message that you will use to sign it with your Bitcoin Wallet (Electrum or Bitcoin Core)
    2. This is the first step before submit your Block.

    3. The method return a Promise that will resolve with the message to be signed

    <WALLET_ADDRESS>:${new Date().getTime().toString().slice(0,-3)}:starRegistry;

    You will need to replace <WALLET_ADDRESS> with the wallet address submitted by the requestor and the time in your message will allow you to validate the 5 minutes time window.

# 3

In the Blockchain class we are going to implement the method: submitStar(address, message, signature, star)

The submitStar(address, message, signature, star) method will allow users to register a new Block with the star object into the chain. This method will resolve with the Block added or reject with an error.
    Algorithm steps:
        1. Get the time from the message sent as a parameter example: parseInt(message.split(':')[1])
        2. Get the current time: let currentTime = parseInt(new Date().getTime().toString().slice(0, -3));
        3. Check if the time elapsed is less than 5 minutes (compare the time in the message and currentTime)
        4. Verify the message with wallet address and signature: bitcoinMessage.verify(message, address, signature)
        5. Create the block and add it to the chain
        6. Resolve with the block added.

# 4

In the Blockchain class we are going to implement the method: getBlockByHash(hash)

    1. This method will return a Promise that will resolve with the Block with the hash passed as a parameter.
    2. Search on the chain array for the block that has the hash for example investigate about filter in the array object in javascript.

# 5

In the Blockchain class we are going to implement the method: getStarsByWalletAddress (address)

    1. This method will return a Promise that will resolve with an array of Stars on the chain that belong to the owner with the wallet address passed in as parameter.
    2. This method will always return an array because a person can register more than one Star.

# 6

In the Blockchain class we are going to implement the method: validateChain()

This method will return a Promise that will resolve with the list of errors when validating the chain.
    Steps to validate:
        1. You should validate each block using validate() method from each of the blocks in the chain.
        2. Each Block should check the with the previousBlockHash to make sure the chain isn't broken.

```
