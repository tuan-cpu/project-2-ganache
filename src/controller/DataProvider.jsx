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
    const [savedLotteryItems, setSavedLotteryItems] = useState([]);
    const getAllUsers = async () => {
        const { Users, Admins } = await dataInstance.getAllUser();
        setUsers(Users);
        setAdmins(Admins);
    }
    const getCandidateInfo = async (id) => {
        const { result, docSnap } = await dataInstance.getCandidateInfo(id);
        setCandidate({ info: docSnap.data(), ownEvent: result })
    }
    const getAllEvents = async () => {
        let result = [];
        let types = ['lifetime', 'limited', 'users']
        for (let i in types) {
            let ref = collection(db, `events/${types[i]}/database`);
            let querySnapshot = await getDocs(ref);
            querySnapshot.forEach((doc) => {
                result.push({
                    id: doc.id,
                    title: doc.data().title,
                    event: doc.data().event,
                    tag: doc.data().tag,
                    amount: doc.data().amount,
                    user_id: doc.data().user_id,
                    wallet: doc.data().wallet,
                    image: doc.data().image,
                    start: doc.data()?.start,
                    end: doc.data()?.end,
                    type: types[i]
                });
            });
        }
        setEvents(result);
    }
    const [userVerifyRequest, setUserVerifyRequest] = useState([]);
    const getAllUserVerifyRequest = async () => {
        const result = await dataInstance.getAllUserVerifyRequest();
        setUserVerifyRequest(result);
    }
    const [createEventRequest, setCreateEventRequest] = useState([]);
    const getAllCreateEventRequest = async () => {
        const result = await dataInstance.getAllCreateEventRequest();
        setCreateEventRequest(result);
    }
    const createWithdrawalRequest = async (data, event_id) => {
        await dataInstance.createWithdrawalRequest(data, event_id);
    }
    const [withdrawalRequests, setWithdrawalRequests] = useState([])
    const getAllWithdrawalRequest = async () => {
        const result = await dataInstance.getAllWithdrawalRequest();
        setWithdrawalRequests(result);
    }
    const addDataGoogleSignIn = async ({ email, provider, displayName, photoURL, uid }) => {
        await dataInstance.addDataGoogleSignIn({ email, provider, displayName, photoURL, uid })
    };
    const addDataSignUp = async ({ firstname, lastname, email, uid }) => {
        await dataInstance.addDataSignUp({ firstname, lastname, email, uid });
    }
    const createEvent = async (data) => {
        await dataInstance.createEventRequest(data);
    }
    const acceptEventRequest = async (data) => {
        await dataInstance.acceptEventRequest(data);
    }
    const updateRequestStatus = async (inquiry, doc_id, status, rejected) => {
        await dataInstance.updateRequestStatus(inquiry, doc_id, status, rejected);
    }
    const rejectEventRequest = async (user_id, event_name) => {
        await dataInstance.rejectEventRequest(user_id, event_name);
    }
    const acceptVerifyRequest = async (user_id) => {
        await dataInstance.acceptVerifyRequest(user_id);
    }
    const rejectVerifyRequest = async (user_id) => {
        await dataInstance.rejectVerifyRequest(user_id);
    }
    const acceptWithdrawalRequest = async (user_id) =>{
        await dataInstance.acceptWithdrawalRequest(user_id);
    }
    const updateWithdrawalRequest = async (doc_id) => {
        await dataInstance.updateWithdrawalRequest(doc_id);
    }
    const [notifications, setNotifications] = useState([]);
    const getUserNotifications = async (user_id) => {
        const result = await dataInstance.getUserNotifications(user_id);
        setNotifications(result);
    }
    const createUserVerifyInquiry = async (data) => {
        await dataInstance.createUserVerifyInquiry(data);
    }
    const updateDisplayTitle = async (doc_id, displayTitle) => {
        await dataInstance.updateDisplayTitle(doc_id, displayTitle);
        window.location.reload();
    }
    const updateAvatar = async (doc_id, avatar) => {
        await dataInstance.updateAvatar(doc_id, avatar);
        window.location.reload();
    }
    const getAllEventsOfAnUser = async (id) => {
        return await dataInstance.getAllEventsOfAnUser(id);
    }
    const getEventTitle = async (id) => {
        return await dataInstance.getEventTitle(id);
    }
    const uploadAvatar = async (id, file) => {
        await dataInstance.deleteOldAvatar(id);
        const url = await dataInstance.uploadAvatar(id, file);
        await updateAvatar(id, url);
    }
    const updateEventImageRef = async (doc_id, url, type) => {
        await dataInstance.updateEventImageRef(doc_id, url, type);
    }
    const uploadEventImages = async (id, file, type) => {
        const url = await dataInstance.uploadEventImages(id, file);
        await updateEventImageRef(id, url, type);
    }
    const createOrder = async (data) => {
        await dataInstance.createOrder(data);
    }
    const getAllOrder = async () => {
        const result = await dataInstance.getAllOrder();
        setOrders(result);
    }
    const uploadMarketImages = async (id, file, type) => {
        const result = await dataInstance.uploadMarketImages(id, file, type);
        return result;
    }
    const createNewMarketItem = async (data, type) => {
        return await dataInstance.createNewMarketItem(data, type);
    }
    const completeNewMarketItem = async (url, doc_id, type) => {
        await dataInstance.completeNewMarketItem(url, doc_id, type);
    }
    const getAllMarketItems = async (type) => {
        let result = await dataInstance.getAllMarketItems(type);
        if (type === "auction") setSavedAuctionItems(result);
        if (type === "market") setSavedMarketItems(result);
        if (type === "lottery") setSavedLotteryItems(result);
    }
    const updateAuctionItem = async (id) => {
        await dataInstance.updateAuctionItem(id);
    }
    const getEvent = async (id, type) => {
        return await dataInstance.getEvent(id, type);
    }
    const getUserAvatar = async (id) => {
        return await dataInstance.getUserAvatar(id);
    }
    const likeEvent = async (event_id, type, user_id) => {
        await dataInstance.likeEvent(event_id, type, user_id);
    }
    const dislikeEvent = async (event_id, type, user_id) => {
        await dataInstance.dislikeEvent(event_id, type, user_id);
    }
    return (
        <DataContext.Provider value={{
            events, users, admins, getAllEvents, getAllUsers, userVerifyRequest, getAllUserVerifyRequest,
            createEventRequest, getAllCreateEventRequest, createWithdrawalRequest, candidate, getCandidateInfo,
            getAllWithdrawalRequest, withdrawalRequests, addDataGoogleSignIn, addDataSignUp, createEvent,
            createUserVerifyInquiry, updateDisplayTitle, getAllEventsOfAnUser, uploadAvatar, createOrder, getAllOrder, orders,
            uploadEventImages, uploadMarketImages, createNewMarketItem, completeNewMarketItem, getAllMarketItems,
            savedAuctionItems, savedMarketItems, savedLotteryItems, acceptEventRequest, updateRequestStatus, rejectEventRequest,
            updateAuctionItem, getEvent, getEventTitle, getUserAvatar, likeEvent, dislikeEvent, notifications, getUserNotifications,
            acceptVerifyRequest, rejectVerifyRequest, acceptWithdrawalRequest, updateWithdrawalRequest
        }}>
            {children}
        </DataContext.Provider>
    )
}

export const useDataContext = () => useContext(DataContext);