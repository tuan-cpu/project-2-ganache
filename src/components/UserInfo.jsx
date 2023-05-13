import { useContext, useState, useEffect } from "react";
import { TransactionContext } from "../context/TransactionContext";
import 'tw-elements';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { db } from '../utils/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import { NavLink, useNavigate } from 'react-router-dom';
import { MdOutlineVerifiedUser } from 'react-icons/md';
import { motion } from "framer-motion";
import avatar from '../assets/avatar.svg';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useStateContext } from "../context/ContextProvider";
import { DataGrid } from '../components';
import { donation_record_grid } from "../utils/data";

ChartJS.register(ArcElement, Tooltip, Legend);
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
    const { user } = useContext(TransactionContext);
    const { currentColor } = useStateContext();
    const [ownEvent, setOwnEvent] = useState([]);
    const [recordData,setRecordData] = useState([]);
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
        let data = []
        for(let i = 0; i< user.donation_detail.length; i++){
            data.push({event_id: user.donation_detail[i].event_id, amount: user.donation_detail[i].amount, timestamp: user.donation_detail[i].timestamp.toDate().toLocaleString()})
        }
        console.log(data);
        setRecordData(data);
    }, [user]);

    return (
        <div className="flex flex-col">
            <div className="grid lg:grid-cols-2 grid-cols-1">
                <div className="gradient-bg-transactions md:p-20 py-12 px-4">
                    <h1 className="text-xl sm:text-3xl text-white text-gradient py-1">Thông tin người dùng</h1>
                    <div className="border-1 p-2 m-2 white-glassmorphism">
                        <div className="flex items-center gap-[10px]">
                            <div>
                                <img src={user.avatar ? user.avatar : avatar} alt="user_avatar" className="rounded-full m-3" />
                            </div>
                            <div>
                                <p className="text-white text-3xl">{user.displayName}</p>
                                <p className="text-gray-500">{user.email}</p>
                            </div>
                        </div>
                        <div className="border-t-1 flex flex-wrap m-3 p-3 mb-0 pb-0 justify-between items-center">
                            <div>
                                <p className="text-xl text-white">Cấp độ: 1</p>
                                <p className="text-xl text-white">Danh hiệu: <span className="text-amber-300"> Tân binh gây quỹ</span></p>
                            </div>
                            <div>
                                <TooltipComponent content="Xác thực thông tin" position="Top">
                                    {user.verified? <MdOutlineVerifiedUser fontSize={30} color="#13de3c" /> :
                                    <button
                                        type="button"
                                        className="text-xl hover:drop-shadow-xl p-3 hover:bg-light-gray text-white"
                                        style={{ background: currentColor, borderRadius: "10%"}}
                                        onClick={()=>navigate('/verifyUser')}
                                    >
                                        Xác thực
                                    </button>}
                                </TooltipComponent>
                            </div>
                        </div>
                    </div>
                    <div className="border-1 p-2 m-2 white-glassmorphism">
                        <p className="text-white text-gradient p-3 m-3 text-3xl">Lịch sử quyên góp</p>
                        <DataGrid data={recordData} grid={donation_record_grid} editing={false} deleting={false}/>
                    </div>
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