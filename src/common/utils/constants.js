import transactionAbi from '../../../build/contracts/Transactions.json';
import auctionAbi from '../../../build/contracts/Auction.json';
import votingAbi from '../../../build/contracts/Voting.json';
import lotteryAbi from '../../../build/contracts/Lottery.json';

export const transactionContractABI = transactionAbi.abi;
export const transactionContractAddress = '0x8171cd962440993796bA839eF172A89A1a780078';

export const auctionContractABI = auctionAbi.abi;
export const auctionContractAddress = '0xEbf51b8B0e367f936106A4E482f6357256ed6A31';

export const votingContractAbi = votingAbi.abi;
export const votingContractAddress = '0x3bA6e94Cf212e8f50116280D04e140758E7B427E';

export const lotteryContractAbi = lotteryAbi.abi;
export const lotteryContractAddress = '0xAb33D8C5FFC42570f15CB407E0683c79b229D11a';

export const middle_man = '0xB7A408065493132a8B692C6C53C6CA0f9d089962';