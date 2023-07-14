import React from 'react';
import { ethers } from 'ethers';
import { auctionContractABI, auctionContractAddress } from '../common/utils/constants';
import { useState } from 'react';
import AuctionModel from '../model/AuctionModel';

export const AuctionContext = React.createContext();
const dataInstance = new AuctionModel();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const auctionContract = new ethers.Contract(auctionContractAddress, auctionContractABI, signer);
    return auctionContract;
}

export const AuctionProvider = ({children}) =>{
    const [allItems, setAllItems] = useState([]);
    const auctionContract = getEthereumContract();
    const addItem = async(_itemID, auctionEndTime) =>{
        await dataInstance.addItem(_itemID,auctionEndTime, auctionContract);
    }
    const bid = async(_id, amount) =>{
        await dataInstance.bid(_id,amount, auctionContract);
    }
    const getAllItems = async() =>{
        const auctionContract = getEthereumContract();
        const result = await auctionContract.getAllItems();
        setAllItems(result);
    }
    return(
        <AuctionContext.Provider value={{ addItem, bid, getAllItems, allItems }}>
            {children}
        </AuctionContext.Provider>
    )
}

export const useAuctionContext = () => React.useContext(AuctionContext);