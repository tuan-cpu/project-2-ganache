import React from 'react';
import { ethers } from 'ethers';
import { votingContractAbi, votingContractAddress } from '../common/utils/constants';
import { useState } from 'react';
import VotingModel from '../model/VotingModel';

export const VotingContext = React.createContext();
const dataInstance = new VotingModel();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const votingContract = new ethers.Contract(votingContractAddress, votingContractAbi, signer);
    return votingContract;
}

export const VotingProvider = ({children}) =>{
    const votingContract = getEthereumContract();
    const [votingEvents, setVotingEvents] = useState([]);
    const getRemainingTimeOfEvent = async (id) => {
        return await dataInstance.getRemainingTimeOfEvent(id,votingContract);
    }
    const getVotingStatusOfEvent = async (id) => {
        return await dataInstance.getVotingStatusOfEvent(id,votingContract);
    }
    const getAllVotingEvents = async () => {
        let result = await dataInstance.getAllVotingEvents(votingContract);
        setVotingEvents(result);
    }
    const vote = async (_candidateIndex, _eventIndex) => {
        await dataInstance.vote(_candidateIndex, _eventIndex,votingContract);
    }

    const addVotingEvent = async (_name, duration) => {
        await dataInstance.addVotingEvent(_name, duration,votingContract);
    }
    const addCandidate = async (_name, _userIndex, _eventIndex) => {
        await dataInstance.addCandidate(_name, _userIndex, _eventIndex,votingContract);
    }
    return(
        <VotingContext.Provider value={{ votingEvents, getAllVotingEvents, getRemainingTimeOfEvent, getVotingStatusOfEvent, vote, addCandidate, addVotingEvent }}>
            {children}
        </VotingContext.Provider>
    )
}

export const useVotingContext = () => React.useContext(VotingContext);