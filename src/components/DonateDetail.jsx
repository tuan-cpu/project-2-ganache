import avatar from '../assets/avatar.svg';
import { db } from "../utils/firebase.js";
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Loader from './Loader';
import { useParams } from 'react-router-dom';
const DonateDetail = () => {
    let { id } = useParams();
    const [detail, setDetail] = useState();
    useEffect(() => {
        const getData = async () => {
            const docRef = doc(db, "events", id);
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

        if(daysDifference > 0){
            let result = daysDifference.toString() + "days ago";
            console.log(result);
            return result;
        };
        if(hoursDifference > 0){
            let result = hoursDifference.toString() + "hours ago";
            console.log(result);
            return result;
        };
        if(minutesDifference > 0){
            let result = minutesDifference.toString() + "minutes ago";
            console.log(result);
            return result;
        };;
        return "Recently"
    }
    useEffect(() => {
        if (detail !== undefined)
            console.log(detail);
    }, [detail]);
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
                            <button
                                type="button"
                                onClick={() => { }}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer hover:bg-red-500">
                                Give now
                            </button>
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