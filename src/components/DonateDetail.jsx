import avatar from '../assets/avatar.svg';
import { db } from "../utils/firebase.js";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState, useContext } from 'react';
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import { AiFillPlayCircle } from 'react-icons/ai';
import { TransactionContext } from "../context/TransactionContext";
import { motion, AnimatePresence } from 'framer-motion';
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
    let { type,id } = useParams();
    const [detail, setDetail] = useState();
    const { connectWallet, currentAccount, formData, sendTransaction, handleChange, setFormData, user } = useContext(TransactionContext);
    const [sendFormShow, setSendFormShow] = useState(false);
    const handleSubmit = (e, formData) => {
        e.preventDefault();
        console.log(formData);
        if (!formData.addressTo || !formData.amount || !formData.keyword || !formData.message) return;
        sendTransaction().then(async ()=>{
            const docRef = doc(db, "events", id);
            try {
                const docSnap = await updateDoc(docRef,{
                    supporters: detail.supporters.push({
                        identity: user? user.displayName : "Anonymous",
                        amount: formData.amount + "ETH",
                        timestamp: Date.now()
                    }),
                    amount: detail.amount + formData.amount
                });
                if (docSnap.exists()) {
                    setDetail(docSnap.data());
                } else {
                    console.log("Document does not exist")
                }

            } catch (error) {
                console.log(error)
            }
        });
    }
    useEffect(() => {
        const getData = async () => {
            const refURL = type+" events";
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
            let result = daysDifference.toString() + "days ago";
            return result;
        };
        if (hoursDifference > 0) {
            let result = hoursDifference.toString() + "hours ago";
            return result;
        };
        if (minutesDifference > 0) {
            let result = minutesDifference.toString() + "minutes ago";
            return result;
        };;
        return "Recently"
    }
    return (
        <div>
            {detail === undefined ? <Loader /> :
                <div className="lg:px-[14px] xl:px-[60px] grid lg:grid-cols-3 grid-cols-1 gradient-bg-transactions gap-[10px]">
                    <div className="relative w-full lg:col-span-2">
                        <img src="https://images.justgiving.com/image/a28fdd3f-5d8f-413c-824c-cb00f23d381a.jpg?template=PagesUIFeatureImage" alt="true"
                            className="w-full " />
                    </div>
                    <div className="grid grid-cols-1">
                        <section className="flex justify-start lg:justify-center items-center text-left self-stretch flex-row w-full p-[18px]">
                            <figcaption>
                                <p className="text-red-500  text-3xl">£{detail.amount}</p>
                                <div className="text-slate-400">
                                    <div>raised</div>
                                    by
                                    <span className="font-bold"> {detail.supporters.length} supporters</span>
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
                                    <AiFillPlayCircle size={21} color="#fff" className="float-left" />
                                    <p className="text-white text-base font-semibold">Connect Wallet</p>
                                </button>) : (
                                <button
                                    type="button"
                                    onClick={() => setSendFormShow(true)}
                                    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer hover:bg-red-500">
                                    Give now
                                </button>)}
                            {sendFormShow ?
                                <motion.div layout animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }}
                                    className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                                    <AnimatePresence>
                                        <Input key='1' placeholder='Address To' value={detail.wallet} name='addressTo' type='text' handleChange={handleChange} disabled="disabled" />
                                        <Input key='2' placeholder='Amount(ETH)' name='amount' type='number' handleChange={handleChange} />
                                        <Input key='3' placeholder='Keyword(Gif)' name='keyword' type='text' handleChange={handleChange} />
                                        <Input key='4' placeholder='Enter Message' name='message' type='text' handleChange={handleChange} />
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                setFormData((prevState) => ({ ...prevState, addressTo: detail.wallet }));
                                                handleSubmit(e, formData);
                                            }}
                                            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer hover:bg-[#2546bd]">
                                            Send now
                                        </button>
                                    </AnimatePresence>
                                </motion.div> : ''}
                            <button
                                type="button"
                                onClick={() => { }}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer hover:bg-slate-400">
                                Share
                            </button>
                        </section>
                    </div>
                    <div className="lg:col-span-2 text-white">
                        <div className="inline-flex justify-center items-center w-full">
                            <hr className="mb-[20px] w-full h-px bg-gray-200 border-0 dark:bg-gray-700" />
                        </div>
                        <section className="max-w-[1240px] mx-auto">
                            <header className="font-semibold text-4xl pb-[20px]">Story</header>
                            <p>
                                <span className="text-slate-400">{detail.story}</span>
                            </p>
                            <h2 className="p-[20px] text-white font-medium text-center text-3xl">Share this story</h2>
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
                    </div>
                    <div className="text-white">
                        <div className="inline-flex justify-center items-center w-full">
                            <hr className="mb-[20px] w-full h-px bg-gray-200 border-0 dark:bg-gray-700" />
                        </div>
                        <section className="max-w-[1240px] mx-auto flex flex-col">
                            <header className="font-semibold text-4xl pb-[20px]">
                                Supporters
                                <span className="float-right">{detail.supporters.length}</span>
                            </header>
                            <ul>
                                {detail.supporters.map((item, index) => (
                                    <li className="list-none flex w-full max-h-[100px]" key={index}>
                                        <div className="py-[15px] mr-[10px] basis-9">
                                            <img src={avatar} alt="true" />
                                        </div>
                                        <section className="py-[15px] w-full flex flex-col">
                                            <h2 className="font-normal text-white">
                                                {item.identity}
                                                <span className="float-right text-slate-400">{CalcTimeDiff(item.timestamp)}</span>
                                            </h2>
                                            <p className="text-red-500  text-xl pb-[10px]">£{item.amount}</p>
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