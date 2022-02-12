const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');
 
const provider = new HDWalletProvider(
  'what ghost wet only box flush frown lion inhale demise radio atom',
  // remember to change this to your own phrase!
  'https://rinkeby.infura.io/v3/8849cb9cd47d469ab1d4913851c0889e'
  // remember to change this to your own endpoint!
);
 
const web3 = new Web3(provider);
 
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
 
  console.log('Attempting to deploy from account', accounts[0]);
 
  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });
 
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();