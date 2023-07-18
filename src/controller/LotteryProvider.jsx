import React from 'react';
import { ethers } from 'ethers';
import { lotteryContractAbi, lotteryContractAddress } from '../common/utils/constants';
import LotteryModel from '../model/LotteryModel';

export const LotteryContext = React.createContext();
const dataInstance = new LotteryModel();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const lotteryContract = new ethers.Contract(lotteryContractAddress, lotteryContractAbi, signer);
    return lotteryContract;
}

export const LotteryProvider = ({children}) =>{
    const lotteryContract = getEthereumContract();
    const createCoupon = async(uid) =>{
        return await dataInstance.createCoupon(lotteryContract, uid);
    }
    const addPrize = async(input_proportions,input_items,entry_value) =>{
        await dataInstance.addPrize(lotteryContract,input_proportions,input_items,entry_value);
    }
    const getPools = async() =>{
        return await dataInstance.getPools(lotteryContract);
    }
    const getCouponList = async() => {
        return await dataInstance.getCouponList(lotteryContract);
    }
    return(
        <LotteryContext.Provider value={{ createCoupon, addPrize, getCouponList, getPools }}>
            {children}
        </LotteryContext.Provider>
    )
}

export const useLotteryContext = () => React.useContext(LotteryContext);