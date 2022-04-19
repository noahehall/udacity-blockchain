import { Router } from 'express';

// mount on /requestValidation
export const requestValidationRouter = Router();

requestValidationRouter.get('/', async (req, res) => {
  /*
  this.app.post("/requestValidationRouter", async (req, res) => {
            if(req.body.address) {
                const address = req.body.address;
                const message = await this.blockchain.requestMessageOwnershipVerification(address);
                if(message){
                    return res.status(200).json(message);
                } else {
                    return res.status(500).send("An error happened!");
                }
            } else {
                return res.status(500).send("Check the Body Parameter!");
            }
        });
            */
  res.status(200).send('requestValidationRouter todo');
});
