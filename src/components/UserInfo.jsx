import { useContext, useState, useEffect } from "react";
import { TransactionContext } from "../context/TransactionContext";
import 'tw-elements';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { db } from '../utils/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import { NavLink } from 'react-router-dom';
import { MdOutlineVerifiedUser } from 'react-icons/md';

ChartJS.register(ArcElement, Tooltip, Legend);
const EventCard = ({ title, event, location, id, url, type }) => (
    <NavLink className="flex justify-center" to={`/event/${type}/detail/${id}`}>
        <div layout animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="rounded-lg shadow-lg white-glassmorphism max-w-sm">
            <img className="rounded-t-lg" src={url} alt="" />
            <div className="p-4">
                <p className="text-left text-white font-medium text-base text-xl">
                    {title}
                </p>
                <div className="flex flex-col">
                    <div className="flex flex-row">
                        <img src="https://www.jg-cdn.com/assets/jg-search-ui/988987ebcc319df493bc0d13321b356a.svg" alt="" />
                        <p className="text-gray-300 text-base pl-[10px]">{event}</p>
                    </div>
                    <div className="flex flex-row">
                        <img src="https://www.jg-cdn.com/assets/jg-search-ui/8d82fa9eea94e107d937a1dbf0a2ee8d.svg" alt="" />
                        <p className="text-gray-300 text-base pl-[10px]">{location}</p>
                    </div>
                </div>
            </div>
        </div>
    </NavLink>
)

const UserInfo = () => {
    const { user } = useContext(TransactionContext);
    const [ownEvent, setOwnEvent] = useState([]);
    const getValue = (tag) => {
        let value = 0;
        for (let i in user.donation_detail) {
            if (user.donation_detail[i].event_tag === tag) value += user.donation_detail[i].amount;
        }
        return value;
    }
    const getTotal = () => {
        let value = 0;
        for (let i in user.donation_detail) {
            value += user.donation_detail[i].amount;
        }
        return value;
    }
    const dataDoughnut = {
        labels: ["Giáo dục", "Y tế", "Cộng đồng", "Môi trường", "Tài chính", "Nhân đạo", "Cuộc sống", "Thể thao"],
        datasets: [
            {
                label: "Tổng tiền quyên góp(ETH)",
                data: [getValue("Giáo dục"), getValue("Y tế"),
                getValue("Cộng đồng"), getValue("Môi trường"),
                getValue("Tài chính"), getValue("Nhân đạo"),
                getValue("Cuộc sống"), getValue("Thể thao")],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)',
                    'rgb(148, 163, 184)',
                    'rgb(163, 230, 53)'
                ],
                hoverOffset: 4,
            },
        ],
    };
    useEffect(() => {
        const getData = async () => {
            let result = [];
            const q1 = query(collection(db, "lifetime events"), where("user_id", "==", user.id));
            const q2 = query(collection(db, "limited events"), where("user_id", "==", user.id));
            const q3 = query(collection(db, "users events"), where("user_id", "==", user.id));
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
            setOwnEvent(result);
        }
        getData();
    }, [user]);
    return (
        <div className="flex flex-col">
            <div className="grid lg:grid-cols-2 grid-cols-1">
                <div className="gradient-bg-transactions md:p-20 py-12 px-4">
                    <h1 className="text-xl sm:text-3xl text-white text-gradient py-1">Thông tin người dùng</h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">Tên người dùng: {user.displayName}</p>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">Email: {user.email}</p>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">Loại tài khoản: {user.provider}</p>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">Xác thực người dùng:
                    {user.verified?<MdOutlineVerifiedUser fontSize={17} color="#13de3c"/>:
                    <NavLink to={'/verifyUser'}>Ấn vào đây để xác thực người dùng</NavLink>}
                    </p>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">Lịch sử quyên góp:</p>
                    <ul>
                        {user.donation_detail.map((item, index) => {
                            return (
                                <div key={index}>
                                    <p className="md:space-x-1 space-y-1 md:space-y-0 mb-4">
                                        <button className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#multiCollapse${index}`}
                                            aria-expanded="false"
                                            aria-controls={`multiCollapse${index}`}>{item.event_id}</button>
                                    </p>
                                    <div className="collapse multi-collapse pb-2.5" id={`multiCollapse${index}`}>
                                        <div className="block p-6 rounded-lg shadow-lg bg-white">
                                            <p>Số lượng: {item.amount} ETH</p>
                                            <p>Thời gian ủng hộ: {Date(item.timestamp.toDate().getTime())}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </ul>
                </div>
                <div className="text-white gradient-bg-transactions md:p-20 py-12 px-4 flex flex-col justify-center items-center">
                    <h1 className="text-xl sm:text-3xl text-white text-gradient py-1">Tổng quyên góp:</h1>
                    <p className="text-xl">{getTotal()} ETH</p>
                    <Doughnut data={dataDoughnut} redraw={true} />
                </div>
            </div>
            <div className="gradient-bg-transactions grid grid-cols-1 justify-items-center items-center flex py-[20px] sm:px-[50px] lg:px-[100px] px-[20px]">
                <h1 className="text-xl sm:text-3xl text-white text-gradient py-1">Sự kiện của bạn:</h1>
                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 p-[20px] gap-[20px]">
                    {ownEvent.map((event, index) => <EventCard id={event.id} type={event.type} title={event.data.title} event={event.data.event} location={event.data.city + " " + event.data.state + " VN"} key={event.id} url={event.data.image} />)}
                </div>
            </div>
        </div>
    )
}

export default UserInfo;