import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import { configureRoutes } from './routes';
import { Blockchain } from './blockchain';

const app = express();
const port = 8000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const blockchain = new Blockchain();
app.use((req, res, next) => {
  req.blockchain = blockchain;

  next();
});

configureRoutes(app).listen(port, () => {
  console.log(`project 1 Listening for port: ${port}`);
});
