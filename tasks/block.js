// @see https://github.com/udacity/nd1309_practice_block
// @see https://learn.udacity.com/nanodegrees/nd1309/parts/cd0596/lessons/617d5b50-cf56-4528-b601-5d3d44549206/concepts/a6304d3b-7f5d-4399-87ea-762aaf0ef826

/**
 * Import crypto-js/SHA256 library
 */
import crypto from "crypto-js";

const { SHA256 } = crypto;

/**
 * Class with a constructor for block
 */
class Block {
  constructor(data) {
    this.id = 0;
    this.nonce = 144444;
    this.body = data;
    this.hash = "";
  }

  /**
   * Step 1. Implement `generateHash()`
   * method that return the `self` block with the hash.
   *
   * Create a Promise that resolve with `self` after you create
   * the hash of the object and assigned to the hash property `self.hash = ...`
   */
  //
  generateHash = async () => {
    //Implement your code here
    if (this.hash) delete this.hash;

    this.hash = SHA256(JSON.stringify(this));

    return this;
  };
}

// link-at-top/app.js
/**
 * Importing the Block class
 */
//

/**
 * Creating a block object
 */
const block = new Block("Test Block");

// Generating the block hash
block
  .generateHash()
  .then((result) => {
    console.log(`Block Hash: ${result.hash}`);
    console.log(`Block: ${JSON.stringify(result)}`);
  })
  .catch((error) => {
    console.log(error);
  });

/**
 * Step 3: Run the application in node.js
 *
 */

// From the terminal: cd into Project folder
// From the terminal: Run node app.js to run the code
