import React from 'react';
import { ethers } from 'ethers';
import { auctionContractABI, auctionContractAddress } from '../common/utils/constants';
import { useState } from 'react';

export const AuctionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const auctionContract = new ethers.Contract(auctionContractAddress, auctionContractABI, signer);
    return auctionContract;
}

export const AuctionProvider = ({children}) =>{
    const [allItems, setAllItems] = useState([]);
    const addItem = async(_itemID, auctionEndTime) =>{
        try{
            if (!ethereum) return alert("Please install Metamask!");
            const auctionContract = getEthereumContract();
            const txHash = await auctionContract.addItem(_itemID, auctionEndTime);
            console.log(`Loading - ${txHash.hash}`);
            await txHash.wait();
            console.log(`Success - ${txHash.hash}`);
        }catch (error) {
            console.log(error);
        }
    }
    const bid = async(_id, amount) =>{
        try {
            if (!ethereum) return alert("Please install Metamask!");
            const auctionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);
            const txHash = await auctionContract.bid(_id, {value: parsedAmount});
            console.log(`Loading - ${txHash.hash}`);
            await txHash.wait();
            console.log(`Success - ${txHash.hash}`);
        } catch (error) {
            console.log(error)
        }
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