import React, { useState, useContext, createContext } from "react";
import { db } from "../utils/firebase.js";
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const getAllUsers = async () => {
        const refURL = "users";
        const ref = collection(db, refURL);
        const querySnapshot = await getDocs(ref);
        let Users = [];
        let Admins = [];
        querySnapshot.forEach((doc) => {
            if (doc.data().role === 'admin') Admins.push({ email: doc.data().email, first_name: doc.data().first_name, last_name: doc.data().last_name, provider: doc.data().provider });
            else Users.push({ displayName: doc.data().displayName, email: doc.data().email, provider: doc.data().provider, verified: doc.data().verified });
        });
        setUsers(Users);
        setAdmins(Admins);
    }
    const getAllEvents = async () => {
        let result = [];
        const ref_1 = collection(db, "lifetime events");
        const ref_2 = collection(db, "limited events");
        const ref_3 = collection(db, "users events");
        const querySnapshot1 = await getDocs(ref_1);
        querySnapshot1.forEach((doc) => {
            result.push({ id:doc.id, title: doc.data().title, event: doc.data().event, amount: doc.data().amount, user_id: doc.data().user_id, wallet: doc.data().wallet, image: doc.data().image, type: 'lifetime' });
        });
        const querySnapshot2 = await getDocs(ref_2);
        querySnapshot2.forEach((doc) => {
            result.push({ id:doc.id, title: doc.data().title, event: doc.data().event, amount: doc.data().amount, user_id: doc.data().user_id, wallet: doc.data().wallet, image: doc.data().image, type: 'limited' });
        });
        const querySnapshot3 = await getDocs(ref_3);
        querySnapshot3.forEach((doc) => {
            result.push({ id:doc.id, title: doc.data().title, event: doc.data().event, amount: doc.data().amount, user_id: doc.data().user_id, wallet: doc.data().wallet, image:doc.data().image, type: 'users' });
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
    return (
        <DataContext.Provider value={{ 
            events, users, admins, getAllEvents, getAllUsers, userVerifyRequest, getAllUserVerifyRequest,
            createEventRequest, getAllCreateEventRequest , createWithdrawalRequest
            }}>
            {children}
        </DataContext.Provider>
    )
}

export const useDataContext = () => useContext(DataContext);