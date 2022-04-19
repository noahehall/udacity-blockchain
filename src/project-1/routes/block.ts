import { Router } from 'express';

import { Block } from '../blockchain';

// mount on /block
export const blockRouter = Router();

blockRouter.get('/height/:height', async (req, res) => {
  const height: number = parseInt(req.params.height ?? -1);

  if (height < 0) return res.status(404).send('Block Not Found! Review the Parameters!');

  const block: Block = await req.blockchain.getBlockByHeight(height);

  return block ? res.status(200).json(block) : res.status(404).send('Block Not Found!');
});

blockRouter.get('/hash/:hash', async (req, res) => {
  if (!req.params.hash) return res.status(404).send('Block Not Found! Review the Parameters!');

  const block: Block = await req.blockchain.getBlockByHash(req.params.hash);

  return block ? res.status(200).json(block) : res.status(404).send('Block Not Found!');
});
