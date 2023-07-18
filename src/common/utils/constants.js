import transactionAbi from '../../../build/contracts/Transactions.json';
import auctionAbi from '../../../build/contracts/Auction.json';
import votingAbi from '../../../build/contracts/Voting.json';
import lotteryAbi from '../../../build/contracts/Lottery.json';

export const transactionContractABI = transactionAbi.abi;
export const transactionContractAddress = '0x7f3216705892f4B898661152bd7289F12e73A51A';

export const auctionContractABI = auctionAbi.abi;
export const auctionContractAddress = '0x5Ac9e478620c6BEc0742242bcff809BBE76AB553';

export const votingContractAbi = votingAbi.abi;
export const votingContractAddress = '0xC669DF3cF657740BA69CE6757d1ecd9469bB8916';

export const lotteryContractAbi = lotteryAbi.abi;
export const lotteryContractAddress = '0xa816Cd696A00a2B63AE72aee0F0C992F23AD6fe9';

export const middle_man = '0xB7A408065493132a8B692C6C53C6CA0f9d089962';