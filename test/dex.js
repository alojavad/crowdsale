const Web3 = require('web3');
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR-PROJECT-ID');
const uniswapFactoryABI = require('./uniswapFactoryABI.json');
const uniswapPairABI = require('./uniswapPairABI.json');

const uniswapFactoryAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';

const uniswapFactory = new web3.eth.Contract(uniswapFactoryABI, uniswapFactoryAddress);
const tokenAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);

const tokenSymbol = await tokenContract.methods.symbol().call();
const tokenName = await tokenContract.methods.name().call();
const tokenDecimals = await tokenContract.methods.decimals().call();
const pairAddress = await uniswapFactory.methods.getPair(tokenAddress, '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2').call();
const pairContract = new web3.eth.Contract(uniswapPairABI, pairAddress);

const token0Address = await pairContract.methods.token0().call();
const token1Address = await pairContract.methods.token1().call();

const reserve0 = await pairContract.methods.reserve0().call();
const reserve1 = await pairContract.methods.reserve1().call();
const privateKey = 'YOUR-PRIVATE-KEY';

const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);

const amountIn = web3.utils.toWei('1', 'ether');

const path = [tokenAddress, '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'];

const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

const uniswapRouterAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
const uniswapRouterContract = new web3.eth.Contract(uniswapRouterABI, uniswapRouterAddress);

const tx = {
  from: account.address,
  to: uniswapRouterAddress,
  value: '0',
  gas: 300000,
  gasPrice: '10000000000',
  nonce: await web3.eth.getTransactionCount(account.address),
  data: uniswapRouterContract.methods.swapExactTokensForETH(
    amountIn,
    '0',
    path,
    account.address,
    deadline,
  ).encodeABI(),
};

const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
