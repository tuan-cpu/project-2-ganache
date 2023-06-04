import React, { useState, useContext, createContext } from "react";
import { db } from "../common/utils/firebase.js";
import { collection, getDocs, setDoc, doc, getDoc, query, where } from 'firebase/firestore';
import DataModel from "../model/DataModel.jsx";

const DataContext = createContext();
const dataInstance = new DataModel();

export const DataProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [candidate, setCandidate] = useState();
    const getAllUsers = async () => {
        const { Users, Admins } = await dataInstance.getAllUser();
        setUsers(Users);
        setAdmins(Admins);
    }
    const getCandidateInfo = async(id) =>{
        const { result, docSnap } = await dataInstance.getCandidateInfo(id);
        setCandidate({info:docSnap.data(), ownEvent: result})
    }
    const getAllEvents = async () => {
        let result = [];
        const ref_1 = collection(db, "lifetime events");
        const ref_2 = collection(db, "limited events");
        const ref_3 = collection(db, "users events");
        const querySnapshot1 = await getDocs(ref_1);
        querySnapshot1.forEach((doc) => {
            result.push({ id:doc.id, title: doc.data().title, event: doc.data().event,tag: doc.data().tag, amount: doc.data().amount, user_id: doc.data().user_id, wallet: doc.data().wallet, image: doc.data().image, type: 'lifetime'});
        });
        const querySnapshot2 = await getDocs(ref_2);
        querySnapshot2.forEach((doc) => {
            result.push({ id:doc.id, title: doc.data().title, event: doc.data().event,tag: doc.data().tag, amount: doc.data().amount, user_id: doc.data().user_id, wallet: doc.data().wallet, image: doc.data().image, type: 'limited', start: doc.data().start, end: doc.data().end });
        });
        const querySnapshot3 = await getDocs(ref_3);
        querySnapshot3.forEach((doc) => {
            result.push({ id:doc.id, title: doc.data().title, event: doc.data().event,tag: doc.data().tag, amount: doc.data().amount, user_id: doc.data().user_id, wallet: doc.data().wallet, image:doc.data().image, type: 'users', start: doc.data().start, end: doc.data().end });
        });
        setEvents(result);
    }
    const [userVerifyRequest,setUserVerifyRequest] = useState([]);
    const getAllUserVerifyRequest = async() =>{
        const result = await dataInstance.getAllUserVerifyRequest();
        setUserVerifyRequest(result);
    }
    const [createEventRequest,setCreateEventRequest] = useState([]);
    const getAllCreateEventRequest = async() =>{
        const result = await dataInstance.getAllCreateEventRequest();
        setCreateEventRequest(result);
    }
    const createWithdrawalRequest = async(data) =>{
        await dataInstance.createWithdrawalRequest(data);
    }
    const [withdrawalRequests, setWithdrawalRequests] = useState([])
    const getAllWithdrawalRequest = async() =>{
        const result = await dataInstance.getAllWithdrawalRequest();
        setWithdrawalRequests(result);
    }
    const addDataGoogleSignIn = async ({email,provider,displayName,photoURL})=>{
        await dataInstance.addDataGoogleSignIn({email,provider,displayName,photoURL})
    };
    const addDataSignUp = async ({ firstname, lastname, email }) =>{
        await dataInstance.addDataSignUp({ firstname, lastname, email });
    }
    const createEvent = async(data) =>{
        await dataInstance.createEventRequest(data);
    }
    const createVerifyInquiry = async(data)=>{
        await dataInstance.createUserInquiry(data);
    }
    const updateDisplayTitle = async(doc_id, displayTitle)=>{
        await dataInstance.updateDisplayTitle(doc_id, displayTitle);
        window.location.reload();
    }
    const updateAvatar = async(doc_id, avatar)=>{
        await dataInstance.updateAvatar(doc_id, avatar);
        window.location.reload();
    }
    const getAllEventsOfAnUser = async(id) =>{
        return await dataInstance.getAllEventsOfAnUser(id);
    }
    const uploadAvatar = async (id,file) =>{
        await dataInstance.deleteOldAvatar(id);
        const url = await dataInstance.uploadAvatar(id,file);
        await updateAvatar(id, url);
    }
    return (
        <DataContext.Provider value={{ 
            events, users, admins, getAllEvents, getAllUsers, userVerifyRequest, getAllUserVerifyRequest,
            createEventRequest, getAllCreateEventRequest , createWithdrawalRequest, candidate, getCandidateInfo, 
            getAllWithdrawalRequest, withdrawalRequests, addDataGoogleSignIn, addDataSignUp, createEvent,
            createVerifyInquiry, updateDisplayTitle, getAllEventsOfAnUser, uploadAvatar
            }}>
            {children}
        </DataContext.Provider>
    )
}

export const useDataContext = () => useContext(DataContext);