import { Router } from 'express';

// mount on /block
export const blockRouter = Router();

blockRouter.get('/height/:height', async (req, res) => {
  /*
  if(req.params.height) {
                const height = parseInt(req.params.height);
                let block = await this.blockchain.getBlockByHeight(height);
                if(block){
                    return res.status(200).json(block);
                } else {
                    return res.status(404).send("Block Not Found!");
                }
            } else {
                return res.status(404).send("Block Not Found! Review the Parameters!");
            }
            */
  res.status(200).send('blockrouter todo');
});

blockRouter.get('/hash/:hash', async (req, res) => {
  // this.app.get('/block/hash/:hash', async (req, res) => {
  //   if (req.params.hash) {
  //     const hash = req.params.hash;
  //     let block = await this.blockchain.getBlockByHash(hash);
  //     if (block) {
  //       return res.status(200).json(block);
  //     } else {
  //       return res.status(404).send('Block Not Found!');
  //     }
  //   } else {
  //     return res.status(404).send('Block Not Found! Review the Parameters!');
  //   }
  // });

  res.status(200).send('blockrouter todo');
});
