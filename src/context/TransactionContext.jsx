import React, { useState, useEffect } from "react";
import { ethers } from 'ethers';
import { contractABI, contractAddress, votingABI, votingAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    const votingContract = new ethers.Contract(votingAddress, votingABI, signer);
    return { transactionContract, votingContract };
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
    const [signInFormData, setSignInFormData] = useState({ email: "", password: "" });
    const [signUpFormData, setSignUpFormData] = useState({ firstname: "", lastname: "", email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);
    const [votingEvents, setVotingEvents] = useState([]);
    const [user, setUser] = useState({ displayName: '', id: '', donation_detail: [], email: '', provider: '', role: '', verified: false });
    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };
    const handleSignIn = (e, name) => {
        setSignInFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };
    const handleSignUp = (e, name) => {
        setSignUpFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };
    const { transactionContract, votingContract } = getEthereumContract();
    const getAllTransactions = async () => {
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
    const getAllCandidatesOfEvent = async (id) => {
        return await votingContract.getAllCandidatesOfEvent(id);
    }
    const getRemainingTimeOfEvent = async (id) => {
        return await votingContract.getRemainingTimeOfEvent(id);
    }
    const getVotingStatusOfEvent = async (id) => {
        return await votingContract.getVotingStatusOfEvent(id);
    }
    const getAllVotingEvents = async () => {
        try {
            const availableVotingEvents = await votingContract.getAllEvents();
            const structuredEvents = availableVotingEvents.map((event, index) => {
                const candidates = getAllCandidatesOfEvent(event.id);
                return (
                    {
                        name: event.name,
                        votingStart: event.votingStart,
                        votingEnd: event.votingEnd,
                        id: event.id,
                        candidates: candidates
                    }
                )
            })
            setVotingEvents(structuredEvents);
        } catch (error) {
            console.log(error);
        }
    }
    const addEvent = async (_name, votingStart, votingEnd) => {
        return await votingContract.addEvent(_name, votingStart, votingEnd);
    }
    const addCandidateToEvent = async (_name, _eventIndex) => {
        return await votingContract.addCandidateToEvent(_name, _eventIndex);
    }
    const vote = async (_candidateIndex, _eventIndex) => {
        return await votingContract.vote(_candidateIndex, _eventIndex);
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

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask!");
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: "0x5208",
                    value: parsedAmount._hex,
                }]
            });
            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);
            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());
            window.reload();
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }
    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    }, []);
    return (
        <TransactionContext.Provider value={{
            connectWallet, currentAccount, formData,
            sendTransaction, handleChange, transactions,
            isLoading, signInFormData, signUpFormData,
            handleSignUp, handleSignIn, setFormData, user, setUser,
            getAllVotingEvents, votingEvents, getRemainingTimeOfEvent, getVotingStatusOfEvent,
            addEvent, addCandidateToEvent, vote
        }}>
            {children}
        </TransactionContext.Provider>
    )
}