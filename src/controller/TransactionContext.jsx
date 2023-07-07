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
    const [votingEvents, setVotingEvents] = useState([]);
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
            if (!ethereum) return alert("Please install Metamask!");
            const { addressTo, amount, keyword, message } = data;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);
            await ethereum.request({
                method: 'eth_estimateGas',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    value: parsedAmount._hex,
                    data: transactionContract.address
                }]
            })
                .then((gasLimit) => {
                    // Set the gas limit to a higher value
                    const higherGasLimit = gasLimit * 2; // You can adjust the multiplier as needed
                    const gas = `0x${higherGasLimit.toString(16)}`;

                    // Send the transaction with the updated gas limit
                    ethereum.request({
                        method: 'eth_sendTransaction',
                        params: [{
                            from: currentAccount,
                            to: addressTo,
                            gas,
                            value: parsedAmount._hex,
                            data: transactionContract.address
                        }]
                    });
                })
                .catch((error) => {
                    // Handle the error
                    console.error('Error estimating gas limit:', error);
                });
            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);
            callback();
        } catch (error) {
            console.log(error);
        }
    }
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
    const getAllCandidatesOfEvent = (_eventIndex, _availableCandidates) => {
        let results = [];
        const structuredCandidates = _availableCandidates.map((candidate, index) => (
            {
                name: candidate.name,
                _userIndex: candidate._userIndex,
                _eventIndex: candidate._eventIndex,
                voteCount: candidate.voteCount,
                _candidateIndex: index
            }
        ))
        for (const element of structuredCandidates) {
            if (parseInt(element._eventIndex, 16) === parseInt(_eventIndex, 16)) results.push(element);
        }
        return results;
    }
    const getRemainingTimeOfEvent = async (id) => {
        const transactionContract = getEthereumContract();
        return await transactionContract.getRemainingTimeOfEvent(id);
    }
    const getVotingStatusOfEvent = async (id) => {
        const transactionContract = getEthereumContract();
        return await transactionContract.getVotingStatusOfEvent(id);
    }
    const getAllVotingEvents = async () => {
        const transactionContract = getEthereumContract();
        try {
            const availableVotingEvents = await transactionContract.getAllEvents();
            const availableCandidates = await transactionContract.getAllCandidates();
            const structuredEvents = availableVotingEvents.map((event, index) => {
                const candidates = getAllCandidatesOfEvent(event.id, availableCandidates);
                return (
                    {
                        name: event.name,
                        votingStart: event.votingStart,
                        votingEnd: event.votingEnd,
                        id: index,
                        candidates: candidates
                    }
                )
            })
            setVotingEvents(structuredEvents);
        } catch (error) {
            console.log(error);
        }
    }
    const vote = async (_candidateIndex, _eventIndex) => {
        try {
            if (!ethereum) return alert("Please install Metamask!");
            const transactionContract = getEthereumContract();
            const txHash = await transactionContract.vote(_candidateIndex, _eventIndex);
            setIsLoading(true);
            console.log(`Loading - ${txHash.hash}`);
            await txHash.wait();
            setIsLoading(false);
            console.log(`Success - ${txHash.hash}`);
        } catch (error) {
            console.log(error);
        }
    }

    const addVotingEvent = async (_name, duration) => {
        try {
            if (!ethereum) return alert("Please install Metamask!");
            const transactionContract = getEthereumContract();
            const txHash = await transactionContract.addEvent(_name, duration);
            setIsLoading(true);
            console.log(`Loading - ${txHash.hash}`);
            await txHash.wait();
            setIsLoading(false);
            console.log(`Success - ${txHash.hash}`);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }
    const addCandidate = async (_name, _userIndex, _eventIndex) => {
        try {
            if (!ethereum) return alert("Please install Metamask!");
            const transactionContract = getEthereumContract();
            const txHash = await transactionContract.addCandidate(_name, _userIndex, _eventIndex);
            setIsLoading(true);
            console.log(`Loading - ${txHash.hash}`);
            await txHash.wait();
            setIsLoading(false);
            console.log(`Success - ${txHash.hash}`);
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
            isLoading, setFormData,
            getAllVotingEvents, votingEvents, getRemainingTimeOfEvent, getVotingStatusOfEvent,
            addVotingEvent, addCandidate, vote, createCoupon
        }}>
            {children}
        </TransactionContext.Provider>
    )
}

export const useTransactionContext = () => useContext(TransactionContext);