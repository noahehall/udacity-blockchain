import { Router } from 'express';
import { Block } from '../blockchain';

// mount on /submitStar
export const submitStarRouter = Router();

submitStarRouter.post('/', async (req, res) => {
  /*
  {
         "dec": "68° 52' 56.9",
         "ra": "16h 29m 1.0s",
         "story": "Testing the story 4"
     }
     */
  const { address, message, signature, star } = req.body;

  if (!address || !message || !signature || !star)
    return res.status(500).send('Check the Body Parameter!');

  try {
    const block = await req.blockchain.submitStar({ address, message, signature, star });

    return block instanceof Block
      ? res.status(200).json(block)
      : res.status(500).send('An error happened!');
  } catch (error) {
    return res.status(500).send(error);
  }
});
