import Web3 from 'web3';

const url = 'https://mainnet.infura.io/v3/e2731feb01324697b960dd1494aaf940';

const api = new Web3(url);

const randomAddress = '0x00000000219ab540356cBB839Cbe05303d7705Fa';

const balance = await api.eth.getBalance(randomAddress);

console.info('\n\n account balance', balance);
