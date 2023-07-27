import { collection, addDoc, query, where, getDoc, getDocs, setDoc, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, storage } from "../common/utils/firebase";
import { deleteObject, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

class DataModel {
    async addDataGoogleSignIn({ email, provider, displayName, photoURL, uid }) {
        const docRef = doc(collection(db, 'users'), uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            await setDoc(docRef, {
                provider: provider,
                email: email,
                displayName: displayName,
                donation_detail: [],
                role: 'user',
                avatar: photoURL,
                verified: false,
                displayTitle: 1
            })
        }
    }

    async addDataSignUp({ firstname, lastname, email, uid }) {
        const docRef = doc(collection(db, "users"), uid);
        await setDoc(docRef, {
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
    async getAnUser(user_id){
        const docRef = doc(db, 'users', user_id);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) return docSnap.data();
    }
    async getCandidateInfo(id) {
        const ref = doc(db, "users", id);
        const docSnap = await getDoc(ref);
        let result = [];
        const q = query(collection(db, "users events"), where("user_id", "==", id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
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
    async getAllOtherRequest() {
        const refURL = 'inquiry/other_inquiry/database';
        const ref = collection(db, refURL);
        const querySnapshot = await getDocs(ref);
        let result = [];
        querySnapshot.forEach((doc) => {
            result.push({ id: doc.id, data: doc.data() });
        });
        return result;
    }
    async createWithdrawalRequest(data,event_id) {
        const refURL = 'inquiry/fund_inquiry/withdrawal_request';
        const ref = doc(collection(db, refURL),event_id);
        const docSnap = await getDoc(ref);
        if(!docSnap.exists()){
            console.log('Setting document...');
            await setDoc(ref, data);
        }else{
            console.log('Document already exists...');
            throw new Error('Bạn đã yêu cầu rút tiền rồi!');
        }
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
    async acceptEventRequest(data) {
        const ref = doc(collection(db, 'events/users/database'));
        await setDoc(ref, data);
    }
    async updateUserRequestStatus(inquiry, doc_id, status, rejected) {
        const docRef = doc(db, `inquiry/user_inquiry/${inquiry}`, doc_id);
        await updateDoc(docRef, {
            status: status,
            rejected: rejected
        })
    }
    async rejectEventRequest(user_id, event_name) {
        const ref = doc(collection(db, 'notifications'), user_id);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            await updateDoc(ref, {
                notifications: arrayUnion(`Sự kiện: "${event_name}" của bạn đã bị từ chối, hãy xem xét lại sự kiện!`)
            })
        } else {
            await setDoc(ref, {
                notifications: [`Sự kiện: "${event_name}" của bạn đã bị từ chối, hãy xem xét lại sự kiện!`]
            })
        }
    }
    async acceptWithdrawalRequest(user_id){
        const ref = doc(collection(db, 'notifications'), user_id);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            await updateDoc(ref, {
                notifications: arrayUnion('Yêu cầu xác rút tiền của bạn đã được thực hiện, vui lòng kiểm tra tài khoản!')
            })
        } else {
            await setDoc(ref, {
                notifications: ['Yêu cầu xác rút tiền của bạn đã được thực hiện, vui lòng kiểm tra tài khoản!']
            })
        }        
    }
    async updateWithdrawalRequest(doc_id){
        const docRef = doc(db, 'inquiry/fund_inquiry/withdrawal_request', doc_id);
        await updateDoc(docRef, {
            status: true
        })
    }
    async getUserNotifications(user_id) {
        const ref = doc(collection(db, 'notifications'), user_id);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) return docSnap.data().notifications;
        else return [];
    }
    async createUserVerifyInquiry(data) {
        const ref = doc(collection(db, 'inquiry/user_inquiry/user_verify_inquiry'));
        await setDoc(ref, data);
    }
    async acceptVerifyRequest(user_id) {
        const docRef = doc(db, 'users', user_id);
        await updateDoc(docRef, {
            verified: true
        })
    }
    async rejectVerifyRequest(user_id) {
        const ref = doc(collection(db, 'notifications'), user_id);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            await updateDoc(ref, {
                notifications: arrayUnion('Yêu cầu xác thực người dùng của bạn đã bị từ chối, hãy xem xét lại sự kiện!')
            })
        } else {
            await setDoc(ref, {
                notifications: ['Yêu cầu xác thực người dùng của bạn đã bị từ chối, hãy xem xét lại sự kiện!']
            })
        }
    }
    async createOtherInquiry(data){
        const ref = doc(collection(db,'inquiry/other_inquiry/database'));
        await setDoc(ref, data);
    }
    async updateOtherRequestStatus(doc_id) {
        const docRef = doc(db, 'inquiry/other_inquiry/database', doc_id);
        await updateDoc(docRef, {
            status: true,
        })
    }
    async respondInquiry(response,user_id){
        const ref = doc(collection(db, 'notifications'), user_id);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            await updateDoc(ref, {
                notifications: arrayUnion(response)
            })
        } else {
            await setDoc(ref, {
                notifications: [response]
            })
        }    
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
    async deleteOldAvatar(doc_id) {
        const storageRef = ref(storage, `avatarImages/${doc_id}`);
        try {
            await deleteObject(storageRef);
        } catch (error) {
            console.log(error);
        }
    }
    async uploadAvatar(doc_id, file) {
        const storageRef = ref(storage, `avatarImages/${doc_id}`);
        await uploadBytesResumable(storageRef, file);
        return await getDownloadURL(storageRef);
    }
    async uploadMarketImages(id, file, type) {
        const storageRef = ref(storage, `marketImages/${type}/${id}/${file.name}`);
        await uploadBytesResumable(storageRef, file);
        return await getDownloadURL(storageRef);
    }
    async createNewMarketItem(data, type) {
        const counterRef = doc(db, 'items', type);
        const counterSnapshot = await getDoc(counterRef);
        const counter = counterSnapshot.data().counter;
        await updateDoc(counterRef, {
            counter: counter + 1
        })
        const ref = collection(db, `items/${type}/database`);
        const docRef = doc(ref, counter.toString());
        await setDoc(docRef, data)
        return counter;
    }
    async completeNewMarketItem(url, doc_id, type) {    
        const ref = collection(db, `items/${type}/database`)
        const docRef = doc(ref, doc_id);
        await updateDoc(docRef, {
            image: url
        })
    }
    async getAllMarketItems(type) {
        const ref = collection(db, `items/${type}/database`);
        const querySnapshot = await getDocs(ref);
        let result = [];
        querySnapshot.forEach((doc) => {
            result.push({ id: parseInt(doc.id), data: doc.data() });
        });
        return result;
    }
    async updateAuctionItem(doc_id) {
        const docRef = doc(collection(db, 'items/auction/database'), doc_id);
        await updateDoc(docRef, {
            available: false
        })
    }
    async uploadEventImages(doc_id, file) {
        const storageRef = ref(storage, `eventImages/${doc_id}/${file.name}`);
        await uploadBytesResumable(storageRef, file);
        return await getDownloadURL(storageRef);
    }
    async updateEventImageRef(doc_id, url, type) {
        const docRef = doc(db, `events/${type}/database`, doc_id);
        await updateDoc(docRef, {
            images_ref: arrayUnion(url)
        })
    }
    async getAllEventsOfAnUser(id) {
        let result = [];
        const q = query(collection(db, 'events/users/database'), where("user_id", "==", id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            result.push({ id: doc.id, data: doc.data() });
        });
        return result;
    }
    async getEventTitle(id) {
        let types = ['lifetime', 'limited', 'users'];
        for (let i in types) {
            let docRef = doc(db, `events/${types[i]}/database`, id);
            let docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data().title;
            }
        }
    }
    async getUserAvatar(id) {
        const docRef = doc(db, 'users', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) return docSnap.data().avatar;
    }
    async createOrder(data) {
        const ref = doc(collection(db, 'order'));
        await setDoc(ref, data);
    }
    async getAllOrder() {
        const refURL = 'order';
        const ref = collection(db, refURL);
        const querySnapshot = await getDocs(ref);
        let result = [];
        querySnapshot.forEach((doc) => {
            result.push({ id: doc.id, data: doc.data() });
        });
        return result;
    }
    async getEvent(id, type) {
        const docRef = doc(db, `events/${type}/database`, id);
        try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                console.log("Document does not exist")
            }

        } catch (error) {
            console.log(error)
        }
    }
    async likeEvent(event_id, type, user_id) {
        const docRef = doc(db, `events/${type}/database`, event_id);
        await updateDoc(docRef, {
            liked_user_id: arrayUnion(user_id)
        })
    }
    async dislikeEvent(event_id, type, user_id) {
        const docRef = doc(db, `events/${type}/database`, event_id);
        await updateDoc(docRef, {
            liked_user_id: arrayRemove(user_id)
        })
    }
}

export default DataModel;