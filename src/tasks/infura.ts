import Web3 from 'web3';

const url = 'https://mainnet.infura.io/v3/e2731feb01324697b960dd1494aaf940';

const api = new Web3(url);

const randomAddress = '0x00000000219ab540356cBB839Cbe05303d7705Fa';

const stuff: { [x: string]: any } = {};
stuff.balanceInWei = await api.eth.getBalance(randomAddress);
stuff.balanceInEither = await api.utils.fromWei(stuff.balanceInWei, 'ether');
stuff.transactionAccount = await api.eth.getTransactionCount(randomAddress);

console.table(stuff);
