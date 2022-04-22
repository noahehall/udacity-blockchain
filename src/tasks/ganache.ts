import Web3 from 'web3';

const ganacheGuiRpcPort = 7545;
const ganacheCliRpcPort = 8545;
const ganacheEndpoint = `http://localhost:${ganacheGuiRpcPort}`;

const api = new Web3(ganacheEndpoint);
const nodeAddress = '0x3362185fdf8E7B947B378BEABd879C0D9E345cd3';

const stuff: { [x: string]: any } = {};

stuff.balanceInWei = await api.eth.getBalance(nodeAddress);
stuff.balanceInEither = await api.utils.fromWei(stuff.balanceInWei, 'ether');
stuff.transactionAccount = await api.eth.getTransactionCount(nodeAddress);
stuff.accounts = (await api.eth.getAccounts()).length;

console.table(stuff);
