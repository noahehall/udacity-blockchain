/**
 *                          Block class
 *  The Block class is a main component into any Blockchain platform,
 *  it will store the data and act as a dataset for your application.
 *  The class will expose a method to validate the data... The body of
 *  the block will contain an Object that contain the data to be stored,
 *  the data should be stored encoded.
 *  All the exposed methods should return a Promise to allow all the methods
 *  run asynchronous.
 */
import SHA256 from 'crypto-js/sha256';
import web3 from 'web3';

const { utils } = web3;

export class Block {
  hash: string;
  height: number;
  body: string;
  time: number;
  previousBlockHash: string;
  // Constructor - argument data will be the object containing the transaction data
  constructor(data) {
    this.hash = ''; // Hash of the block
    this.height = 0; // Block Height (consecutive number of each block)
    this.body = utils.toHex(JSON.stringify(data));
    this.time = 0; // Timestamp for the Block creation
    this.previousBlockHash = ''; // Reference to the previous Block Hash
  }

  /**
   *  validate() method will validate if the block has been tampered or not.
   *  Been tampered means that someone from outside the application tried to change
   *  values in the block data as a consecuence the hash of the block should be different.
   *  Steps:
   *  1. Return a new promise to allow the method be called asynchronous.
   *  2. Save the in auxiliary variable the current hash of the block (`this` represent the block object)
   *  3. Recalculate the hash of the entire block (Use SHA256 from crypto-js library)
   *  4. Compare if the auxiliary hash value is different from the calculated one.
   *  5. Resolve true or false depending if it is valid or not.
   *  Note: to access the class values inside a Promise code you need to create an auxiliary value `let self = this;`
   */
  async validate() {
    return this.hash === (await this.calculateHash());
  }

  async calculateHash() {
    const { height, body, time, previousBlockHash } = this;

    return SHA256(JSON.stringify({ height, body, time, previousBlockHash })).toString();
  }

  /**
   *  Auxiliary Method to return the block body (decoding the data)
   *  Steps:
   *
   *  1. Use hex2ascii module to decode the data
   *  2. Because data is a javascript object use JSON.parse(string) to get the Javascript Object
   *  3. Resolve with the data and make sure that you don't need to return the data for the `genesis block`
   *     or Reject with an error.
   */
  async getBData() {
    if (this.height === 0) return false;

    return JSON.parse(utils.hexToUtf8(this.body));
  }
}
