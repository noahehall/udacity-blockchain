import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import { configureRoutes } from './routes';

/**
 * Require the Blockchain class. This allow us to have only one instance of the class.
 */
// const BlockChain = require('./src/blockchain.js');

const app = express();
const port = 8000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

configureRoutes(app).listen(port, () => {
  console.log(`project 1 Listening for port: ${port}`);
});
