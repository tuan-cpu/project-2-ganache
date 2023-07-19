import React, { useState } from 'react';
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
    const [pools, setPools] = useState([]);
    const [couponList, setCouponList] = useState([]);
    const [newCoupon, setNewCoupon] = useState();
    const createCoupon = async(uid, pool_id, amount) =>{
        let result = await dataInstance.createCoupon(lotteryContract, uid, pool_id, amount);
        setNewCoupon({
            group: result.group,
            pool_id: result.pool_id
        })
    }
    const addPrize = async(input_proportions,input_items,entry_value) =>{
        await dataInstance.addPrize(lotteryContract,input_proportions,input_items,entry_value);
    }
    const getPools = async() =>{
        const result = await dataInstance.getPools(lotteryContract);
        setPools(result);
    }
    const getCouponList = async() => {
        let result = await dataInstance.getCouponList(lotteryContract);
        setCouponList(result);
    }
    return(
        <LotteryContext.Provider value={{ createCoupon, addPrize, getCouponList, getPools, pools, couponList, newCoupon }}>
            {children}
        </LotteryContext.Provider>
    )
}

export const useLotteryContext = () => React.useContext(LotteryContext);