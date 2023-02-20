import avatar from '../assets/avatar.svg';
import { db } from "../utils/firebase.js";
import { doc, getDoc, updateDoc, Timestamp, collection, query, where, getDocs } from 'firebase/firestore';
import { useEffect, useState, useContext } from 'react';
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import { AiFillPlayCircle } from 'react-icons/ai';
import { TransactionContext } from "../context/TransactionContext";
import { motion, AnimatePresence } from 'framer-motion';
import Transactions from './Transactions';
const Input = ({ placeholder, name, type, value, handleChange, disabled }) => (
    <input
        placeholder={placeholder}
        type={type}
        name={name}
        step='0.0001'
        onChange={(e) => handleChange(e, name)}
        value={value}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
        disabled={disabled}
    />
)
const DonateDetail = () => {
    let { type, id } = useParams();
    const [detail, setDetail] = useState();
    const { connectWallet, currentAccount, formData, sendTransaction, handleChange, setFormData, user } = useContext(TransactionContext);
    const [sendFormShow, setSendFormShow] = useState(false);
    let email = sessionStorage.getItem('Email');
    let provider = sessionStorage.getItem('Provider');
    useEffect(() => {
        const submit = () => {
            if (!formData.addressTo || !formData.amount || !formData.keyword || !formData.message) return;
            sendTransaction();
            const docRef = doc(db, type+" events", id);
            let array = [];
            for(let i in detail.supporters){
                if(detail.supporters[i].email === email && detail.supporters[i].provider === provider){
                    detail.supporters[i].timestamp = Timestamp.now();
                    detail.supporters[i].amount = (parseFloat(detail.supporters[i].amount) + parseFloat(formData.amount)).toString();
                    array = detail.supporters;
                    break;
                }
            }
            if(array.toString() === [].toString()) array = [...detail.supporters,{
                identity: user['displayName'] ? user['displayName'] : "Anonymous",
                email: email? email: null,
                provider: provider? provider:null,
                amount: formData.amount,
                timestamp: Timestamp.now()
            }]
            const data = {
                supporters: array,
                amount: parseFloat(detail.amount)  + parseFloat(formData.amount) 
            }
            updateDoc(docRef,data);
            updateUserInfo();
        }
        const updateUserInfo = async()=>{
            const q = query(collection(db, "users"), where("email", "==", email),where("provider","==",provider));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((document) => {
                // doc.data() is never undefined for query doc snapshots
                const docRef = doc(db,"users",document.id);
                const data = {
                    donation_detail:[...document.data().donation_detail,{
                        event_id:id,
                        event_type: type,
                        event_tag: detail.tag,
                        amount: parseFloat(formData.amount),
                        timestamp: Timestamp.now()
                    }]
                }
                updateDoc(docRef,data);
            });
        }
        submit();
    }, [formData]);
    useEffect(() => {
        const getData = async () => {
            const refURL = type + " events";
            const docRef = doc(db, refURL, id);
            try {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setDetail(docSnap.data());
                } else {
                    console.log("Document does not exist")
                }

            } catch (error) {
                console.log(error)
            }
        }
        getData();
    }, []);
    const CalcTimeDiff = (timestamp) => {
        const date = timestamp.toDate();
        let difference = Date.now() - date.getTime();

        let daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);

        let hoursDifference = Math.floor(difference / 1000 / 60 / 60);

        let minutesDifference = Math.floor(difference / 1000 / 60);

        if (daysDifference > 0) {
            let result = daysDifference.toString() + " ngày trước";
            return result;
        };
        if (hoursDifference > 0) {
            let result = hoursDifference.toString() + " giờ trước";
            return result;
        };
        if (minutesDifference > 0) {
            let result = minutesDifference.toString() + " phút trước";
            return result;
        };;
        return "Vừa xong"
    }

    return (
        <div>
            {detail === undefined ? <Loader /> :
                <div className="lg:px-[14px] xl:px-[60px] grid lg:grid-cols-3 grid-cols-1 gradient-bg-transactions gap-[10px]">
                    <div className="relative w-full lg:col-span-2">
                        <img alt="true" src={detail.image}
                            className="w-full " />
                    </div>
                    <div className="grid grid-cols-1">
                        <section className="flex justify-start lg:justify-center items-center text-left self-stretch flex-row w-full p-[18px]">
                            <figcaption>
                                <p className="text-red-500  text-3xl">{detail.amount} ETH</p>
                                <div className="text-slate-400"> 
                                    <div>gây</div>
                                    bởi
                                    <span className="font-bold"> {detail.supporters.length} người ủng hộ</span>
                                </div>
                            </figcaption>
                        </section>
                        <section className="flex p-[18px] items-center flex-col">
                            {!currentAccount ? (
                                <button
                                    type="button"
                                    onClick={connectWallet}
                                    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer hover:bg-[#2546bd]"
                                >
                                    <AiFillPlayCircle size={25} color="#fff" className="float-left" />
                                    <p className="text-white text-base font-semibold">Kết nối ví</p>
                                </button>) : (
                                <button
                                    type="button"
                                    onClick={() => setSendFormShow(true)}
                                    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer hover:bg-red-500">
                                    Quyên góp
                                </button>)}
                            {sendFormShow ?
                                <motion.div layout animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }}
                                    className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                                    <AnimatePresence>
                                        <Input key='1' placeholder='Address To' value={detail.wallet} name='addressTo' type='text' handleChange={handleChange} disabled="disabled" />
                                        <Input key='2' placeholder='Số lượng(ETH)' name='amount' type='number' handleChange={handleChange} />
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                setFormData((prevState) => ({ ...prevState, addressTo: detail.wallet }));
                                                setFormData((prevState) => ({ ...prevState, keyword: detail.tag }));
                                                setFormData((prevState) => ({ ...prevState, message: id }));
                                            }}
                                            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer hover:bg-[#2546bd]">
                                            Gửi
                                        </button>
                                    </AnimatePresence>
                                </motion.div> : ''}
                            <button
                                type="button"
                                onClick={() => { }}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer hover:bg-slate-400">
                                Chia sẻ
                            </button>
                        </section>
                    </div>
                    <div className="lg:col-span-2 text-white">
                        <div className="inline-flex justify-center items-center w-full">
                            <hr className="mb-[20px] w-full h-px bg-gray-200 border-0 dark:bg-gray-700" />
                        </div>
                        <section className="max-w-[1240px] mx-auto">
                            <header className="font-semibold text-4xl pb-[20px]">Bối cảnh</header>
                            <p>
                                <span className="text-slate-400">{detail.story}</span>
                            </p>
                            <h2 className="p-[20px] text-white font-medium text-center text-3xl">Chia sẻ</h2>
                            <div className="flex items-center">
                                <button
                                    type="button"
                                    onClick={() => { }}
                                    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer hover:bg-blue-600">
                                    Facebook
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { }}
                                    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer hover:bg-blue-400">
                                    Twitter
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { }}
                                    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer hover:bg-gray-400">
                                    Gmail
                                </button>
                            </div>
                        </section>
                        <Transactions message={id}/>
                    </div>
                    <div className="text-white">
                        <div className="inline-flex justify-center items-center w-full">
                            <hr className="mb-[20px] w-full h-px bg-gray-200 border-0 dark:bg-gray-700" />
                        </div>
                        <section className="max-w-[1240px] mx-auto flex flex-col">
                            <header className="font-semibold text-4xl pb-[20px]">
                                Người ủng hộ
                                <span className="float-right">{detail.supporters.length}</span>
                            </header>
                            <ul>
                                {detail.supporters.sort(function(a,b){return parseFloat(b.amount) - parseFloat(a.amount)}).map((item, index) => (
                                    <li className="list-none flex w-full max-h-[100px]" key={index}>
                                        <div className="py-[15px] mr-[10px] basis-9">
                                            <img src={avatar} alt="true" />
                                        </div>
                                        <section className="py-[15px] w-full flex flex-col">
                                            <h2 className="font-normal text-white">
                                                {item.identity}
                                                <span className="float-right text-slate-400">{CalcTimeDiff(item.timestamp)}</span>
                                            </h2>
                                            <p className="text-red-500  text-xl pb-[10px]">{item.amount} ETH</p>
                                            <div className="inline-flex justify-center items-center w-full">
                                                <hr className="mb-[20px] w-full h-px bg-gray-200 border-0 dark:bg-gray-700" />
                                            </div>
                                        </section>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </div>}
        </div>
    )
}

export default DonateDetail;