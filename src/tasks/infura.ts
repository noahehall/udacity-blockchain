import Web3 from 'web3';
import batAbi from './batAbi';

const url = 'https://mainnet.infura.io/v3/e2731feb01324697b960dd1494aaf940';

const api = new Web3(url);

// nodeAddress
const nodeAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';

// contract address: etherscan > erc20 token > contract address somehwere on the screen
const etherAddress = 0xdac17f958d2ee523a2206206994597c13d831ec7;
// check ethers contract: https://etherscan.io/address/0xdac17f958d2ee523a2206206994597c13d831ec7#code

const stuff: { [x: string]: any } = {};

stuff.balanceInWei = await api.eth.getBalance(nodeAddress);
stuff.balanceInEither = await api.utils.fromWei(stuff.balanceInWei, 'ether');
stuff.transactionAccount = await api.eth.getTransactionCount(nodeAddress);
stuff.accounts = await api.eth.getAccounts();

// doesnt seem to work
// const batContract = new api.eth.Contract(batAbi);
// batContract.methods.poop
// const name = await contract.methods.name();
// contract.methods.name().call((err, result) => {
//   console.log(result);
// });
// contract.methods.symbol().call((err, result) => {
//   console.log(result);
// });
// contract.methods.totalSupply().call((err, result) => {
//   console.log(result);
// });
console.table(stuff);
