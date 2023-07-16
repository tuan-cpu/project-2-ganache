import React, { useState, useContext, createContext } from "react";
import { db } from "../common/utils/firebase.js";
import { collection, getDocs } from 'firebase/firestore';
import DataModel from "../model/DataModel.jsx";

const DataContext = createContext();
const dataInstance = new DataModel();

export const DataProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [candidate, setCandidate] = useState();
    const [orders, setOrders] = useState([]);
    const [savedAuctionItems, setSavedAuctionItems] = useState([]);
    const [savedMarketItems, setSavedMarketItems] = useState([]);
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
        let types = ['lifetime','limited','users']
        for(let i in types){
            let ref = collection(db,`events/${types[i]}/database`);
            let querySnapshot = await getDocs(ref);
                querySnapshot.forEach((doc) => {
                result.push({ 
                    id:doc.id, 
                    title: doc.data().title, 
                    event: doc.data().event,
                    tag: doc.data().tag, 
                    amount: doc.data().amount, 
                    user_id: doc.data().user_id, 
                    wallet: doc.data().wallet, 
                    image: doc.data().image,
                    start: doc.data()?.start,
                    end: doc.data()?.end, 
                    type: types[i]});
            });
        }
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
    const addDataGoogleSignIn = async ({email,provider,displayName,photoURL,uid})=>{
        await dataInstance.addDataGoogleSignIn({email,provider,displayName,photoURL,uid})
    };
    const addDataSignUp = async ({ firstname, lastname, email, uid }) =>{
        await dataInstance.addDataSignUp({ firstname, lastname, email, uid });
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
    const getEventTitle = async(id) =>{
        return await dataInstance.getEventTitle(id);
    }
    const uploadAvatar = async (id,file) =>{
        await dataInstance.deleteOldAvatar(id);
        const url = await dataInstance.uploadAvatar(id,file);
        await updateAvatar(id, url);
    }
    const updateEventImageRef = async(doc_id,url,type) =>{
        await dataInstance.updateEventImageRef(doc_id,url,type);
    }
    const uploadEventImages = async(id,file,type) =>{
        const url = await dataInstance.uploadEventImages(id,file);
        await updateEventImageRef(id,url,type);
    }
    const createOrder = async(data) =>{
        await dataInstance.createOrder(data);
    }
    const getAllOrder = async() =>{
        const result = await dataInstance.getAllOrder();
        setOrders(result);
    }
    const uploadMarketImages = async(id,file,type) =>{
        const result = await dataInstance.uploadMarketImages(id,file,type);
        return result;
    }
    const createNewMarketItem = async(data,type) => {
        return await dataInstance.createNewMarketItem(data,type);
    }
    const completeNewMarketItem = async(url,doc_id,type) =>{
        await dataInstance.completeNewMarketItem(url, doc_id, type);
    }
    const getAllMarketItems = async(type) => {
        let result = await dataInstance.getAllMarketItems(type);
        if(type === "auction") setSavedAuctionItems(result);
        else setSavedMarketItems(result);
    }
    const updateAuctionItem = async(id) => {
        await dataInstance.updateAuctionItem(id);
    }
    const getEvent = async(id,type) => { 
        return await dataInstance.getEvent(id,type);
    }
    const getUserAvatar = async(id) =>{
        return await dataInstance.getUserAvatar(id);
    }
    const likeEvent = async(event_id,type,user_id) => {
        await dataInstance.likeEvent(event_id,type,user_id);
    }
    const dislikeEvent = async(event_id,type,user_id) => {
        await dataInstance.dislikeEvent(event_id,type,user_id);
    }
    return (
        <DataContext.Provider value={{ 
            events, users, admins, getAllEvents, getAllUsers, userVerifyRequest, getAllUserVerifyRequest,
            createEventRequest, getAllCreateEventRequest , createWithdrawalRequest, candidate, getCandidateInfo, 
            getAllWithdrawalRequest, withdrawalRequests, addDataGoogleSignIn, addDataSignUp, createEvent,
            createVerifyInquiry, updateDisplayTitle, getAllEventsOfAnUser, uploadAvatar, createOrder, getAllOrder, orders, 
            uploadEventImages, uploadMarketImages, createNewMarketItem, completeNewMarketItem, getAllMarketItems,
            savedAuctionItems, savedMarketItems, updateAuctionItem, getEvent, getEventTitle, getUserAvatar, likeEvent, dislikeEvent
            }}>
            {children}
        </DataContext.Provider>
    )
}

export const useDataContext = () => useContext(DataContext);