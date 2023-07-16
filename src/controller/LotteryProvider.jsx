import React from 'react';
import { ethers } from 'ethers';
import { lotteryContractAbi, lotteryContractAddress } from '../common/utils/constants';
import { useState } from 'react';
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
    return(
        <LotteryContext.Provider value={{ createCoupon }}>
            {children}
        </LotteryContext.Provider>
    )
}

export const useLotteryContext = () => React.useContext(LotteryContext);