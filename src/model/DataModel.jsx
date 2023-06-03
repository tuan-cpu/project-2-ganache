import { collection, addDoc, getCountFromServer, query, where, getDoc, getDocs, setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

class DataModel {
    async addDataGoogleSignIn({ email, provider, displayName, photoURL }) {
        const coll = collection(db, "users");
        const query_ = query(coll, where('email', '==', email), where('provider', '==', provider));
        const snapshot = await getCountFromServer(query_);
        if (snapshot.data().count === 0) await addDoc(collection(db, "users"), {
            provider: provider,
            email: email,
            displayName: displayName,
            donation_detail: [],
            role: 'user',
            avatar: photoURL,
            verified: false,
            displayTitle: 1
        });
    }

    async addDataSignUp({ firstname, lastname, email }) {
        await addDoc(collection(db, "users"), {
            email: email,
            first_name: firstname,
            last_name: lastname,
            provider: "Self",
            donation_detail: [],
            role: 'user',
            verified: false,
            avatar: '',
            displayTitle: 1

        })
    }

    async getAllUser() {
        const refURL = "users";
        const ref = collection(db, refURL);
        let querySnapshot = await getDocs(ref);
        let Users = [];
        let Admins = [];
        querySnapshot.forEach((doc) => {
            if (doc.data().role === 'admin') Admins.push({ email: doc.data().email, first_name: doc.data().first_name, last_name: doc.data().last_name });
            else Users.push({ displayName: doc.data().displayName || doc.data().first_name + ' ' + doc.data().last_name, email: doc.data().email, provider: doc.data().provider, verified: doc.data().verified });
        });
        return { Users, Admins };
    }
    async getCandidateInfo(id) {
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
        return { result, docSnap };
    }
    async getAllUserVerifyRequest() {
        const refURL = 'inquiry/user_inquiry/user_verify_inquiry';
        const ref = collection(db, refURL);
        const querySnapshot = await getDocs(ref);
        let result = [];
        querySnapshot.forEach((doc) => {
            result.push({ id: doc.id, data: doc.data() });
        });
        return result;
    }
    async getAllCreateEventRequest() {
        const refURL = 'inquiry/user_inquiry/create_event_inquiry';
        const ref = collection(db, refURL);
        const querySnapshot = await getDocs(ref);
        let result = [];
        querySnapshot.forEach((doc) => {
            result.push({ id: doc.id, data: doc.data() });
        });
        return result;
    }
    async createWithdrawalRequest(data) {
        const refURL = 'inquiry/fund_inquiry/withdrawal_request';
        const ref = doc(collection(db, refURL));
        await setDoc(ref, data);
    }
    async getAllWithdrawalRequest() {
        const refURL = 'inquiry/fund_inquiry/withdrawal_request';
        const ref = collection(db, refURL);
        const querySnapshot = await getDocs(ref);
        let result = [];
        querySnapshot.forEach((doc) => {
            result.push({ id: doc.id, data: doc.data() });
        });
        return result;
    }
    async createEventRequest(data) {
        const ref = doc(collection(db, 'inquiry/user_inquiry/create_event_inquiry'));
        await setDoc(ref, data);
    }
    async createUserInquiry(data) {
        const ref = doc(collection(db, 'inquiry/user_inquiry/user_verify_inquiry'));
        await setDoc(ref, data);
    }
    async updateDisplayTitle(doc_id, displayTitle) {
        const docRef = doc(db, 'users', doc_id);
        await updateDoc(docRef, {
            displayTitle: displayTitle
        })
    }
    async updateAvatar(doc_id, avatar) {
        const docRef = doc(db, 'users', doc_id);
        await updateDoc(docRef, {
            avatar: avatar
        })
    }
    async getAllEventsOfAnUser(id) {
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
        return result;
    }
}

export default DataModel;