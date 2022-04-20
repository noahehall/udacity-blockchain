/**
 *                          Blockchain Class
 *  The Blockchain class contain the basics functions to create your own private blockchain
 *  It uses libraries like `crypto-js` to create the hashes for each block and `bitcoinjs-message`
 *  to verify a message signature. The chain is stored in the array
 *  `this.chain = [];`. Of course each time you run the application the chain will be empty because and array
 *  isn't a persisten storage method.
 *
 */

// const SHA256 = require('crypto-js/sha256');
import SHA256 from 'crypto-js/sha256';
import bitcoinMessage from 'bitcoinjs-message';

import { Block } from './Block';

// five mins in seconds
const REQUIRED_TIME = 300;

export class Blockchain {
  chain: Block[];
  /**
   * Constructor of the class, you will need to setup your chain array and the height
   * of your chain (the length of your chain array).
   * Also everytime you create a Blockchain class you will need to initialized the chain creating
   * the Genesis Block.
   * The methods in this class will always return a Promise to allow client applications or
   * other backends to call asynchronous functions.
   */
  constructor() {
    this.chain = [];

    /**
     * This method will check for the height of the chain and if there isn't a Genesis Block it will create it.
     * You should use the `addBlock(block)` to create the Genesis Block
     * Passing as a data `{data: 'Genesis Block'}`
     */
    this._addBlock(new Block({ data: 'Genesis Block' }));
  }

  /**
   * Utility method that return a Promise that will resolve with the height of the chain
   */
  async getChainHeight() {
    return this.chain.length - 1;
  }

  getTime() {
    return parseInt(new Date().getTime().toString().slice(0, -3));
  }

  async getTopBlocksHash() {
    return this.chain[await this.getChainHeight()]?.hash ?? '';
  }

  /**
   * _addBlock(block) will store a block in the chain
   * @param {*} block
   * The method will return a Promise that will resolve with the block added
   * or reject if an error happen during the execution.
   * You will need to check for the height to assign the `previousBlockHash`,
   * assign the `timestamp` and the correct `height`...At the end you need to
   * create the `block hash` and push the block into the chain array. Don't for get
   * to update the `this.height`
   * Note: the symbol `_` in the method name indicates in the javascript convention
   * that this method is a private method.
   */
  async _addBlock(block) {
    try {
      block.height = (await this.getChainHeight()) + 1;
      block.time = this.getTime();
      block.previousBlockHash = await this.getTopBlocksHash();
      block.hash = await block.calculateHash();

      this.chain.push(block);

      return block;
    } catch (e) {
      console.info('\n\n error adding block', e);

      return e;
    }
  }

  /**
   * The requestMessageOwnershipVerification(address) method
   * will allow you  to request a message that you will use to
   * sign it with your Bitcoin Wallet (Electrum or Bitcoin Core)
   * This is the first step before submit your Block.
   * The method return a Promise that will resolve with the message to be signed
   * <WALLET_ADDRESS>:${new Date().getTime().toString().slice(0,-3)}:starRegistry
   * @param {*} address
   */
  async requestMessageOwnershipVerification(address) {
    return `${address}:${this.getTime()}:starRegistry`;
  }

  /**
   * The submitStar(address, message, signature, star) method
   * will allow users to register a new Block with the star object
   * into the chain. This method will resolve with the Block added or
   * reject with an error.
   * Algorithm steps:
   * 1. Get the time from the message sent as a parameter example: `parseInt(message.split(':')[1])`
   * 2. Get the current time: `let currentTime = this.getTime();`
   * 3. Check if the time elapsed is less than 5 minutes
   * 4. Veify the message with wallet address and signature: `bitcoinMessage.verify(message, address, signature)`
   * 5. Create the block and add it to the chain
   * 6. Resolve with the block added.
   * @param {*} address
   * @param {*} message
   * @param {*} signature
   * @param {*} star

   */
  async submitStar({ address, message, signature, star }) {
    try {
      const elapsedTime = this.getTime() - parseInt(message.split(':')[1]);
      if (elapsedTime > REQUIRED_TIME)
        return new Error('block must be submitted within 5 minutes of creation');

      const isValid = await bitcoinMessage.verify(message, address, signature);
      if (!isValid) return new Error('could not verify message');

      const block = new Block({ data: { address, message, signature, star } });
      return this._addBlock(block);
    } catch (e) {
      return e;
    }
  }

  /**
   * This method will return a Promise that will resolve with the Block
   *  with the hash passed as a parameter.
   * Search on the chain array for the block that has the hash.
   * @param {*} hash
   */
  async getBlockByHash(hash) {
    return this.chain.find(block => block.hash === hash);
  }

  /**
   * This method will return a Promise that will resolve with the Block object
   * with the height equal to the parameter `height`
   * @param {*} height
   */
  async getBlockByHeight(height) {
    return this.chain.find(block => block.height === height);
  }

  /**
   * This method will return a Promise that will resolve with an array of Stars objects existing in the chain
   * and are belongs to the owner with the wallet address passed as parameter.
   * Remember the star should be returned decoded.
   * @param {*} address
   */
  async getStarsByWalletAddress(address) {
    const stars: any = [];
    for (const block of this.chain) {
      if (block.height > 0) {
        const body = await block.getBData();
        if (body.data.address === address && !!body.data.star) stars.push(body.data.star);
      }
    }

    return stars;
  }

  /**
   * This method will return a Promise that will resolve with the list of errors when validating the chain.
   * Steps to validate:
   * 1. You should validate each block using `validateBlock`
   * 2. Each Block should check the with the previousBlockHash
   */
  async validateChain() {
    const errorLog: string[] = [];

    for (let i = 1; i < this.chain.length; i++) {
      const thisBlock: Block = this.chain[i];
      const prevBlock = this.chain[i - 1];

      if (thisBlock.hash !== (await thisBlock.calculateHash())) {
        errorLog.push(`invalid block hash: ${thisBlock.hash}`);
      }

      if (thisBlock.previousBlockHash !== prevBlock.hash)
        errorLog.push(`invalid link to previous block: ${thisBlock.hash}`);
    }

    return errorLog;
  }
}
