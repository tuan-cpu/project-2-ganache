import React, { useState, useContext, createContext } from "react";
import { db } from "../utils/firebase.js";
import { collection, getDocs, setDoc, doc, getDoc, query, where } from 'firebase/firestore';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [candidate, setCandidate] = useState();
    const getAllUsers = async () => {
        const refURL = "users";
        const ref = collection(db, refURL);
        const querySnapshot = await getDocs(ref);
        let Users = [];
        let Admins = [];
        querySnapshot.forEach((doc) => {
            if (doc.data().role === 'admin') Admins.push({ email: doc.data().email, first_name: doc.data().first_name, last_name: doc.data().last_name });
            else Users.push({ displayName: doc.data().displayName || doc.data().first_name + ' ' + doc.data().last_name, email: doc.data().email, provider: doc.data().provider, verified: doc.data().verified });
        });
        setUsers(Users);
        setAdmins(Admins);
    }
    const getCandidateInfo = async(id) =>{
        const ref = doc(db, "users", id);
        const docSnap = await getDoc(ref);
        let result = [];
        const q1 = query(collection(db, "lifetime events"), where("user_id", "==", id));
        const q2 = query(collection(db, "limited events"), where("user_id", "==", id));
        const q3 = query(collection(db, "users events"), where("user_id", "==", id));
        const querySnapshot1 = await getDocs(q1);
        querySnapshot1.forEach((doc) => {
            result.push({ id: doc.id, data: doc.data(), type: 'lifetime' });
        });
        const querySnapshot2 = await getDocs(q2);
        querySnapshot2.forEach((doc) => {
            result.push({ id: doc.id, data: doc.data(), type: 'limited' });
        });
        const querySnapshot3 = await getDocs(q3);
        querySnapshot3.forEach((doc) => {
            result.push({ id: doc.id, data: doc.data(), type: 'users' });
        });
        setCandidate({info:docSnap.data(), ownEvent: result})
    }
    const getAllEvents = async () => {
        let result = [];
        const ref_1 = collection(db, "lifetime events");
        const ref_2 = collection(db, "limited events");
        const ref_3 = collection(db, "users events");
        const querySnapshot1 = await getDocs(ref_1);
        querySnapshot1.forEach((doc) => {
            result.push({ id:doc.id, title: doc.data().title, event: doc.data().event,tag: doc.data().tag, amount: doc.data().amount, user_id: doc.data().user_id, wallet: doc.data().wallet, image: doc.data().image, type: 'lifetime' });
        });
        const querySnapshot2 = await getDocs(ref_2);
        querySnapshot2.forEach((doc) => {
            result.push({ id:doc.id, title: doc.data().title, event: doc.data().event,tag: doc.data().tag, amount: doc.data().amount, user_id: doc.data().user_id, wallet: doc.data().wallet, image: doc.data().image, type: 'limited' });
        });
        const querySnapshot3 = await getDocs(ref_3);
        querySnapshot3.forEach((doc) => {
            result.push({ id:doc.id, title: doc.data().title, event: doc.data().event,tag: doc.data().tag, amount: doc.data().amount, user_id: doc.data().user_id, wallet: doc.data().wallet, image:doc.data().image, type: 'users' });
        });
        setEvents(result);
    }
    const [userVerifyRequest,setUserVerifyRequest] = useState([]);
    const getAllUserVerifyRequest = async() =>{
        const refURL = 'inquiry/user_inquiry/user_verify_inquiry';
        const ref = collection(db,refURL);
        const querySnapshot = await getDocs(ref);
        let result = [];
        querySnapshot.forEach((doc)=>{
            result.push({id: doc.id, data: doc.data()});
        });
        setUserVerifyRequest(result);
    }
    const [createEventRequest,setCreateEventRequest] = useState([]);
    const getAllCreateEventRequest = async() =>{
        const refURL = 'inquiry/user_inquiry/create_event_inquiry';
        const ref = collection(db,refURL);
        const querySnapshot = await getDocs(ref);
        let result = [];
        querySnapshot.forEach((doc)=>{
            result.push({id: doc.id, data: doc.data()});
        });
        setCreateEventRequest(result);
    }
    const createWithdrawalRequest = async(data) =>{
        const refURL = 'inquiry/fund_inquiry/withdrawal_request';
        const ref = doc(collection(db,refURL));
        await setDoc(ref,data);
    }
    const [withdrawalRequests, setWithdrawalRequests] = useState([])
    const getAllWithdrawalRequest = async() =>{
        const refURL = 'inquiry/fund_inquiry/withdrawal_request';
        const ref = collection(db,refURL);
        const querySnapshot = await getDocs(ref);
        let result = [];
        querySnapshot.forEach((doc)=>{
            result.push({id: doc.id, data: doc.data()});
        });
        setWithdrawalRequests(result);
    }
    return (
        <DataContext.Provider value={{ 
            events, users, admins, getAllEvents, getAllUsers, userVerifyRequest, getAllUserVerifyRequest,
            createEventRequest, getAllCreateEventRequest , createWithdrawalRequest, candidate, getCandidateInfo, getAllWithdrawalRequest, withdrawalRequests
            }}>
            {children}
        </DataContext.Provider>
    )
}

export const useDataContext = () => useContext(DataContext);