import { Router } from 'express';

// mount on /requestValidation
export const requestValidationRouter = Router();

requestValidationRouter.post('/', async (req, res) => {
  if (!req.body.address) return res.status(500).send('Check the Body Parameter!');

  const message = await req.blockchain.requestMessageOwnershipVerification(req.body.address);

  return message ? res.status(200).json(message) : res.status(500).send('An error happened!');
});
