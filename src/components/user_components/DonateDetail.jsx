import { db } from "../../common/utils/firebase.js";
import { doc, updateDoc, Timestamp, collection, query, where, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Loader from '../common_components/Loader';
import { useParams, useNavigate } from 'react-router-dom';
import { AiFillPlayCircle, AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { useTransactionContext } from '../../controller/TransactionContext';
import { useDataContext } from '../../controller/DataProvider';
import { useAuthContext } from '../../controller/AuthProvider';
import { motion, AnimatePresence } from 'framer-motion';
import Transactions from '../common_components/Transactions';
import { middle_man } from '../../common/utils/constants';
import { Slideshow } from '..';
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
    const navigate = useNavigate();
    const { createWithdrawalRequest, uploadEventImages, getEvent, getUserAvatar, likeEvent, dislikeEvent } = useDataContext();
    const { user } = useAuthContext();
    const [detail, setDetail] = useState();
    const { connectWallet, currentAccount, formData, sendTransaction, handleChange, setFormData } = useTransactionContext();
    const [sendFormShow, setSendFormShow] = useState(false);
    const [file, setFile] = useState("");
    const [confirm, setConfirm] = useState(false);
    const [supporters, setSupporters] = useState([]);
    const [likeStatus, setLikeStatus] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    useEffect(() => {
        if (file && confirm) {
            uploadEventImages(id, file, type + " events");
        };
    }, [file, confirm])
    let email = sessionStorage.getItem('Email');
    let provider = sessionStorage.getItem('Provider');
    useEffect(() => {
        const uploadData = async (data) => {
            const docRef = doc(db, `events/${type}/database`, id);
            let array = [];
            for (let i in detail.supporters) {
                if (detail.supporters[i].user_id == user.id) {
                    detail.supporters[i].timestamp = Timestamp.now();
                    detail.supporters[i].amount = (parseFloat(detail.supporters[i].amount) + parseFloat(data.amount)).toString();
                    array = detail.supporters;
                    break;
                }
            }
            if (array.toString() === [].toString()) array = [...detail.supporters, {
                identity: user.displayName ? user.displayName : "Anonymous",
                user_id: user.id ? user.id : null,
                provider: provider ? provider : null,
                amount: data.amount,
                timestamp: Timestamp.now()
            }]
            const uploadedData = {
                supporters: array,
                amount: parseFloat(detail.amount) + parseFloat(data.amount)
            }
            await updateDoc(docRef, uploadedData);
            await updateUserInfo();
        }
        const submit = () => {
            if (!formData.addressTo || !formData.amount || !formData.keyword || !formData.message) return;
            sendTransaction(formData, uploadData);
        }
        const updateUserInfo = async () => {
            const q = query(collection(db, "users"), where("email", "==", email), where("provider", "==", provider));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((document) => {
                // doc.data() is never undefined for query doc snapshots
                const docRef = doc(db, "users", document.id);
                const data = {
                    donation_detail: [...document.data().donation_detail, {
                        event_id: id,
                        event_type: type,
                        event_tag: detail.tag,
                        amount: parseFloat(formData.amount),
                        timestamp: Timestamp.now()
                    }]
                }
                updateDoc(docRef, data);
            });
        }
        submit();
    }, [formData]);
    useEffect(() => {
        const getData = async () => {
            let result = await getEvent(id, type);
            if (result) setDetail(result);
        }
        getData();
    }, []);
    const [timeLeft, setTimeLeft] = useState({});
    const [images, setImages] = useState([]);
    useEffect(() => {
        const imagesRef = () => {
            let result = [];
            if (detail) {
                result.push(detail.image);
                for (let i in detail.images_ref) {
                    result.push(detail.images_ref[i]);
                }
                setImages(result);
            }
        }
        imagesRef();
        const supportersRef = async () => {
            let result = [];
            if (detail) {
                for (let i in detail.supporters) {
                    let avatar = await getUserAvatar(detail.supporters[i].user_id);
                    result.push({
                        amount: detail.supporters[i].amount,
                        identity: detail.supporters[i].identity,
                        provider: detail.supporters[i].provider,
                        timestamp: detail.supporters[i].timestamp,
                        user_id: detail.supporters[i].user_id,
                        avatar: avatar
                    })
                }
            }
            setSupporters(result);
        }
        supportersRef();
        if (detail?.liked_user_id.includes(user.id)) setLikeStatus(true);
        if (detail?.liked_user_id) setLikeCount(detail.liked_user_id.length);
    }, [detail])
    useEffect(() => {
        const calculateTimeLeft = (timestamp) => {
            const date = timestamp?.toDate();
            let difference = date?.getTime() - Date.now();

            let timeLeft = {};

            if (difference > 0) {
                timeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                };
            }
            return timeLeft;
        }
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft(detail?.end) || 0);
        }, 1000);
        return () => clearTimeout(timer);
    });
    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <span>
                {timeLeft[interval]} {interval}{" "}
            </span>
        );
    });
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
                        <Slideshow images={images} interval={3000} />
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
                        <div className='p-[18px] pb-0 flex flex-row'>
                            {user.id ? (
                                <>
                                    {likeStatus ?
                                        <button
                                            type="button"
                                            onClick={() => {
                                                dislikeEvent(id, type, user.id);
                                                setLikeStatus(false);
                                                setLikeCount(likeCount - 1);
                                            }}
                                            className="text-white w-full border-[1px] border-[#3d4f7c] rounded-full cursor-pointer hover:bg-red-500 flex justify-center items-center">
                                            <AiOutlineDislike size={25} />
                                            Dislike
                                        </button> :
                                        <button
                                            type="button"
                                            onClick={() => {
                                                likeEvent(id, type, user.id);
                                                setLikeStatus(true);
                                                setLikeCount(likeCount + 1);
                                            }}
                                            className="text-white w-full border-[1px] border-[#3d4f7c] rounded-full cursor-pointer hover:bg-sky-500 flex justify-center items-center">
                                            <AiOutlineLike size={25} />
                                            Like
                                        </button>}
                                </>
                            ) : ''}
                            <div className="text-white w-full border-[1px] border-[#3d4f7c] rounded-full flex justify-center items-center">
                                Số lượt thích: {likeCount}
                            </div>
                        </div>
                        <section className="flex p-[18px] pt-0 items-center flex-col">
                            {!currentAccount ? (
                                <button
                                    type="button"
                                    onClick={connectWallet}
                                    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer hover:bg-[#2546bd]"
                                >
                                    <AiFillPlayCircle size={25} color="#fff" className="float-left" />
                                    <p className="text-white text-base font-semibold">Kết nối ví</p>
                                </button>) : (
                                <>
                                    {user.id !== detail.user_id ? (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (!timerComponents.length && type != 'lifetime') alert("Sự kiện đã kết thúc!");
                                                else setSendFormShow(true)
                                            }}
                                            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer hover:bg-red-500">
                                            Quyên góp
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            disabled={timerComponents.length ? true : false}
                                            onClick={() => createWithdrawalRequest({
                                                event_id: id,
                                                user_id: user.id,
                                                wallet: detail.wallet
                                            })}
                                            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer hover:bg-red-500">
                                            Rút tiền
                                        </button>
                                    )}
                                </>)}
                            {sendFormShow ?
                                <motion.div layout animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }}
                                    className="p-5 sm:w-96 w-full flex flex-col justify-start items-center">
                                    <AnimatePresence>
                                        <Input key='2' placeholder='Số lượng(ETH)' name='amount' type='number' handleChange={handleChange} className='border-white' />
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                setFormData((prevState) => ({ ...prevState, addressTo: middle_man }));
                                                setFormData((prevState) => ({ ...prevState, keyword: detail.tag }));
                                                setFormData((prevState) => ({ ...prevState, message: id }));
                                            }}
                                            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer hover:bg-[#2546bd]">
                                            Gửi
                                        </button>
                                    </AnimatePresence>
                                </motion.div> : ''}
                            {((type == 'lifetime' || type === 'limited') && user?.role == 'admin') || (user.id === detail.user_id) ? (
                                <div className='w-full'>
                                    <button
                                        type="button"
                                        htmlFor='image'
                                        className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer hover:bg-slate-400">
                                        Tải minh chứng
                                    </button>
                                    <input type="file" name="image" id="image" onChange={(e) => {
                                        setFile(e.target.files[0]);
                                        setConfirm(true);
                                    }} hidden accept="" />
                                </div>
                            ) : <></>}
                        </section>
                        {type != 'lifetime' ?
                            <section>
                                <figcaption>
                                    {Date.now() < detail.start.seconds * 1000 ? (
                                        <div className='ml-4 p-4'>
                                            <p className="text-red-500 text-3xl">Sự kiện chưa bắt đầu</p>
                                        </div>
                                    ) : (
                                        <div className='ml-4 p-4'>
                                            <p className="text-white  text-3xl">Thời gian gây quỹ</p>
                                            <div className="text-slate-400">
                                                <div>còn</div>
                                                <span className="font-bold">
                                                    {timerComponents.length ? timerComponents :
                                                        <div className='flex flex-col'>
                                                            <p>Hết giờ!</p>
                                                        </div>}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </figcaption>
                            </section> : <></>}
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
                        <Transactions message={id} />
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
                                {supporters.sort(function (a, b) { return parseFloat(b.amount) - parseFloat(a.amount) }).map((item, index) => {
                                    return (
                                        <li className="list-none flex w-full max-h-[100px]" key={index}>
                                            <div className="py-[15px] mr-[10px] basis-9">
                                                <img src={item.avatar} alt="true" className='rounded-full w-8 h-8' />
                                            </div>
                                            <section className="py-[15px] w-full flex flex-col">
                                                <h2 className="font-normal text-white hover:text-sky-500 cursor-pointer" onClick={() => navigate(`/user_profile/${item.user_id}`)}>
                                                    {item.identity}
                                                    <span className="float-right text-slate-400">{CalcTimeDiff(item.timestamp)}</span>
                                                </h2>
                                                <p className="text-red-500  text-xl pb-[10px]">{item.amount} ETH</p>
                                                <div className="inline-flex justify-center items-center w-full">
                                                    <hr className="mb-[20px] w-full h-px bg-gray-200 border-0 dark:bg-gray-700" />
                                                </div>
                                            </section>
                                        </li>
                                    )
                                })}
                            </ul>
                        </section>
                    </div>
                </div>}
        </div>
    )
}

export default DonateDetail;