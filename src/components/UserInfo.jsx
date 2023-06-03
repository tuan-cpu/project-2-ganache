import { useState, useEffect } from "react";
import 'tw-elements';
import { AiOutlineCamera } from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router-dom';
import { MdOutlineVerifiedUser } from 'react-icons/md';
import { motion } from "framer-motion";
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useStateContext } from "../context/ContextProvider";
import { DataGrid } from '../components';
import { donation_record_grid } from "../utils/data";
import { calculateUserLevel } from '../utils/level';
import { getPossibleTitle, userTitle } from '../utils/title';
import { FiSettings } from 'react-icons/fi';
import PieChart from "./charts/Pie";
import { useAuthContext } from "../context/AuthProvider";
import { useDataContext } from "../context/DataProvider";


const EventCard = ({ title, event, location, id, url, type }) => (
    <NavLink className="flex justify-center" to={`/event/${type}/detail/${id}`}>
        <motion.div layout animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }}
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
        </motion.div>
    </NavLink>
)

const UserInfo = () => {
    const navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        if (!authToken) {
            navigate('/login')
        }
    }, []);
    const { user } = useAuthContext();
    const { updateDisplayTitle, getAllEventsOfAnUser, updateAvatar } = useDataContext();
    const { currentColor } = useStateContext();
    const [ownEvent, setOwnEvent] = useState([]);
    const [recordData, setRecordData] = useState([]);
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
    const pieChartData = [
        { x: 'Giáo dục', y: getValue("Giáo dục"), text: getValue("Giáo dục") },
        { x: "Y tế", y: getValue("Y tế"), text: getValue("Y tế") },
        { x: "Cộng đồng", y: getValue("Cộng đồng"), text: getValue("Cộng đồng") },
        { x: "Môi trường", y: getValue("Môi trường"), text: getValue("Môi trường") },
        { x: "Tài chính", y: getValue("Tài chính"), text: getValue("Tài chính") },
        { x: "Nhân đạo", y: getValue("Nhân đạo"), text: getValue("Nhân đạo") },
        { x: "Cuộc sống", y: getValue("Cuộc sống"), text: getValue("Cuộc sống") },
        { x: "Thể thao", y: getValue("Thể thao"), text: getValue("Thể thao") }
    ];

    useEffect(() => {
        const getData = async () => {
            const result = await getAllEventsOfAnUser(user.id);
            setOwnEvent(result);
        }
        getData();
        let data = []
        for (let i = 0; i < user.donation_detail.length; i++) {
            data.push({ event_id: user.donation_detail[i].event_id, amount: user.donation_detail[i].amount, timestamp: user.donation_detail[i].timestamp.toDate().toLocaleString() })
        }
        setRecordData(data);
    }, [user]);
    const totalDonation = getTotal();
    const { level, next_exp, current_exp } = calculateUserLevel(totalDonation);
    const titleInfo = {
        numberOfDonationTime: user.donation_detail.length,
        donationAmount: totalDonation || 0,
        level: level || 0
    }
    const [selectTitle, setSelectTitle] = useState(false);
    const [file, setFile] = useState("");

    return (
        <div className="flex flex-col">
            <div className="grid lg:grid-cols-2 grid-cols-1">
                <div className="gradient-bg-transactions md:p-20 py-12 px-4">
                    <h1 className="text-xl sm:text-3xl text-white text-gradient py-1">Thông tin người dùng</h1>
                    <div className="border-1 p-2 m-2 white-glassmorphism">
                        <div className="flex items-center gap-[10px]">
                            <div>
                                {user.avatar !== '' ?
                                    <img src={user.avatar} alt="user_avatar" className="rounded-full m-3" />
                                    :
                                    (
                                        <div onClick={() => { }} className="m-3 cursor-pointer border-1 p-3 rounded-full hover:bg-slate-400">
                                            <AiOutlineCamera color="#fff" size={30} />
                                        </div>
                                    )}
                            </div>
                            <div>
                                <p className="text-white text-3xl">{user.displayName}</p>
                                <p className="text-gray-500">{user.email}</p>
                            </div>
                        </div>
                        <div className="border-t-1 flex flex-wrap m-3 p-3 mb-0 pb-0 justify-between items-center">
                            <div>
                                <p className="text-xl text-white">Cấp độ: {level || 0}
                                    <span> / Exp: {Math.floor(current_exp)}/{Math.floor(next_exp)}</span>
                                </p>
                                {user.role !== 'admin' && <>
                                    <p className="text-xl text-white">Danh hiệu:
                                        <span style={{ color: userTitle[user.displayTitle].color }}> {userTitle[user.displayTitle].title}</span>
                                    </p>
                                    <div className="cursor-pointer flex items-center gap-[10px]">
                                        <FiSettings size={21} color="#fff" onClick={() => setSelectTitle((prev) => !prev)} />
                                        {selectTitle ? (
                                            <select id="title"
                                                onChange={(e) => {
                                                    updateDisplayTitle(user.id, parseInt(e.target.value, 10));
                                                }}
                                                className="mt-[10px] bg-gray-50 border border-white text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option selected disabled>Đổi danh hiệu hiển thị</option>
                                                {getPossibleTitle(titleInfo).map((title) => <option key={title.id} value={title.id}>{title.title}</option>)}
                                            </select>
                                        ) : ''}
                                    </div></>}
                            </div>
                            {user.role !== 'admin' &&
                                <div>
                                    <TooltipComponent content="Xác thực thông tin" position="Top">
                                        {user.verified ? <MdOutlineVerifiedUser fontSize={30} color="#13de3c" /> :
                                            <button
                                                type="button"
                                                className="text-xl hover:drop-shadow-xl p-3 hover:bg-light-gray text-white"
                                                style={{ background: currentColor, borderRadius: "10%" }}
                                                onClick={() => navigate('/verifyUser')}
                                            >
                                                Xác thực
                                            </button>}
                                    </TooltipComponent>
                                </div>}
                        </div>
                    </div>
                    <div className="border-1 p-2 m-2 white-glassmorphism">
                        <p className="text-white text-gradient p-3 m-3 text-3xl">Lịch sử quyên góp</p>
                        <DataGrid data={recordData} grid={donation_record_grid} editing={false} deleting={false} />
                    </div>
                </div>
                <div className="text-white gradient-bg-transactions md:p-20 py-12 px-4 flex flex-col justify-center items-center">
                    <h1 className="text-xl sm:text-3xl text-white text-gradient py-1">Tổng quyên góp:</h1>
                    <p className="text-xl">{totalDonation} ETH</p>
                    <PieChart id="chart-pie" data={pieChartData} legendVisibility height="full" />
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