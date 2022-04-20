import { Router } from 'express';

// mount on /blocks
export const blocksRouter = Router();

blocksRouter.get('/:address', async (req, res) => {
  if (!req.params.address) return res.status(500).send('Block Not Found! Review the Parameters!');

  try {
    const stars = await req.blockchain.getStarsByWalletAddress(req.params.address);

    return stars ? res.status(200).json(stars) : res.status(404).send('Block Not Found!');
  } catch (error) {
    return res.status(500).send('An error happened!');
  }
});
