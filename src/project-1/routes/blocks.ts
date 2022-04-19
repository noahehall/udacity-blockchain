import { Router } from 'express';

// mount on /blocks
export const blocksRouter = Router();

blocksRouter.get('/', async (req, res) => {
  /*
  this.app.get("/blocks/:address", async (req, res) => {
            if(req.params.address) {
                const address = req.params.address;
                try {
                    let stars = await this.blockchain.getStarsByWalletAddress(address);
                    if(stars){
                        return res.status(200).json(stars);
                    } else {
                        return res.status(404).send("Block Not Found!");
                    }
                } catch (error) {
                    return res.status(500).send("An error happened!");
                }
            } else {
                return res.status(500).send("Block Not Found! Review the Parameters!");
            }

        });
            */
  res.status(200).send('blocksRouter todo');
});
