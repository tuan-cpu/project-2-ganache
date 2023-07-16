import transactionAbi from '../../../build/contracts/Transactions.json';
import auctionAbi from '../../../build/contracts/Auction.json';
import votingAbi from '../../../build/contracts/Voting.json';
import lotteryAbi from '../../../build/contracts/Lottery.json';

export const transactionContractABI = transactionAbi.abi;
export const transactionContractAddress = '0x9c58AE873eaD0792a9aA9BED9bf56BbB13E15d3E';

export const auctionContractABI = auctionAbi.abi;
export const auctionContractAddress = '0x9967406E4ba99d652E442942454c549a17fFb5A8';

export const votingContractAbi = votingAbi.abi;
export const votingContractAddress = '0x94374f4531E089f36E312b0B405D0Bce40f59Ad1';

export const lotteryContractAbi = lotteryAbi.abi;
export const lotteryContractAddress = '0x3F9D52baD00a64347dc5a0F95123F0F278aD1981';

export const middle_man = '0xB7A408065493132a8B692C6C53C6CA0f9d089962';