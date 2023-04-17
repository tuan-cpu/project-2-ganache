import React, { useState, useContext, createContext } from "react";
import { db } from "../utils/firebase.js";
import { collection, getDocs } from 'firebase/firestore';

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
            if (doc.data().role === 'admin') Admins.push({ id: doc.id, data: doc.data() });
            else Users.push({ id: doc.id, data: doc.data() });
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
            result.push({ id: doc.id, data: doc.data(), type: 'lifetime' });
        });
        const querySnapshot2 = await getDocs(ref_2);
        querySnapshot2.forEach((doc) => {
            result.push({ id: doc.id, data: doc.data(), type: 'limited' });
        });
        const querySnapshot3 = await getDocs(ref_3);
        querySnapshot3.forEach((doc) => {
            result.push({ id: doc.id, data: doc.data(), type: 'users' });
        });
        setEvents(result);
    }
    return (
        <DataContext.Provider value={{ events, users, admins, getAllEvents, getAllUsers }}>
            {children}
        </DataContext.Provider>
    )
}

export const useDataContext = () => useContext(DataContext);