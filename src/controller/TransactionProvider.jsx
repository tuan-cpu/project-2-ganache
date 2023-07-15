import React, { useState, useEffect } from "react";
import { ethers } from 'ethers';
import { transactionContractABI, transactionContractAddress } from '../common/utils/constants';
import { useContext } from "react";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(transactionContractAddress, transactionContractABI, signer);
    return transactionContract;
}
export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };
    const getAllTransactions = async () => {
        const transactionContract = getEthereumContract();
        try {
            if (!ethereum) return alert("Please install Metamask!");
            const availableTransactions = await transactionContract.getAllTransactions();
            const structuredTransactions = availableTransactions.map((transaction, i) => (
                {
                    addressTo: transaction.receiver,
                    addressFrom: transaction.sender,
                    timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                    message: transaction.message,
                    keyword: transaction.keyword,
                    amount: parseInt(transaction.amount._hex) / (10 ** 18)
                }
            ))
            setTransactions(structuredTransactions);
        } catch (error) {
            console.log(error);
        }
    }
    const sendTransaction = async (data, callback) => {
        try {
          if (!ethereum) return alert("Please install MetaMask!");
      
          const { addressTo, amount, keyword, message } = data;
          const transactionContract = getEthereumContract();
          const parsedAmount = ethers.utils.parseEther(amount);
      
          const gasLimit = await ethereum.request({
            method: 'eth_estimateGas',
            params: [{
              from: currentAccount,
              to: addressTo,
              value: parsedAmount._hex,
              data: transactionContract.address
            }]
          });
      
          // Set the gas limit to a higher value
          const higherGasLimit = gasLimit * 2; // You can adjust the multiplier as needed
          const gas = `0x${higherGasLimit.toString(16)}`;
      
          await ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
              from: currentAccount,
              to: addressTo,
              gas,
              value: parsedAmount._hex,
              data: transactionContract.address
            }]
          });
    
          const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
          setIsLoading(true);
          console.log(`Loading - ${transactionHash.hash}`);
          await transactionHash.wait();
          setIsLoading(false);
          console.log(`Success - ${transactionHash.hash}`);
          if(transactionHash) callback(data);
        } catch (error) {
          console.log(error);
        }
      };
    const checkIfWalletIsConnected = async () => {
        if (!ethereum) return alert("Please install Metamask!");
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length) {
            setCurrentAccount(accounts[0]);
            getAllTransactions();
        } else {
            console.log('No account found.');
        }
        console.log(accounts);
    }
    const checkIfTransactionsExist = async () => {
        try {
            const transactionContract = getEthereumContract();
            const transactionCount = await transactionContract.getTransactionCount();
            window.localStorage.setItem('transactionCount', transactionCount)
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }
    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask!");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }

    const createCoupon = async () => {
        const transactionContract = getEthereumContract();
        return await transactionContract.createCoupon();
    }
    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    }, []);
    return (
        <TransactionContext.Provider value={{
            connectWallet, currentAccount, formData,
            sendTransaction, handleChange, transactions,
            isLoading, setFormData, createCoupon
        }}>
            {children}
        </TransactionContext.Provider>
    )
}

export const useTransactionContext = () => useContext(TransactionContext);