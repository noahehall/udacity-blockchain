import Web3 from 'web3';
import TX from '@ethereumjs/tx';

const ganacheGuiRpcPort = 7545;
const ganacheCliRpcPort = 8545;
const ganacheEndpoint = `http://localhost:${ganacheGuiRpcPort}`;

const api = new Web3(ganacheEndpoint);

const stuff: { [x: string]: any } = {};

stuff.addr1 = '0x3362185fdf8E7B947B378BEABd879C0D9E345cd3';
stuff.addr1PrivKey = '8443d26bcb3a83948bf2a2ca6a30199c20c5ac0acb2274ff0b845d86e894a661';
stuff.addr1KeyHex = api.utils.toHex(stuff.addr1PrivKey);
stuff.addr1Balance = await api.eth.getBalance(stuff.addr1);

stuff.addr2 = '0xa61C06F0CFC65c370E16Aca8f4C3Db261F0083cb';
stuff.addr2Balance = await api.eth.getBalance(stuff.addr2);

console.table(stuff);

const rawTx = {
  nonce: 0,
  to: stuff.addr1,
  gasPrice: 1e8,
  gasLimit: 3e5,
  value: 1,
  data: '',
};

const tx = new TX.Transaction(rawTx);

console.table(rawTx);
console.info(tx);
