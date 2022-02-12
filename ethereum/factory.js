import web3 from "./web3";
import CamapignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(JSON.parse(CamapignFactory.interface), '0x97EB996587DB19173F80f13bADBE8dE260FFcb88');

export default instance;