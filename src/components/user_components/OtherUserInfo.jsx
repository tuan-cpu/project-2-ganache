import { useState, useEffect } from "react";
import 'tw-elements';
import { db } from '../../common/utils/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import { NavLink } from 'react-router-dom';
import { motion } from "framer-motion";
import avatar from '../../common/assets/avatar.svg';
import { DataGrid } from '..';
import { donation_record_grid } from "../../common/utils/data";
import { calculateUserLevel } from '../../common/utils/level';
import { userTitle } from '../../common/utils/title';
import { useDataContext } from "../../controller/DataProvider";

const EventCard = ({ title, event, location, id, url, start, end }) => (
    <NavLink className="flex justify-center" to={`/event/users/detail/${id}`}>
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
                <div>
                    {Date.now() < start?.seconds * 1000 && <div className='text-xl text-orange-500'>Sự kiện chưa bắt đầu!</div>}
                    {Date.now() > start?.seconds * 1000 && Date.now() < end?.seconds * 1000 && <div className='text-xl text-red-500'>Sự kiện đang diễn ra!</div>}
                    {Date.now() > end?.seconds * 1000 && <div className='text-xl text-red-500'>Sự kiện đã kết thúc!</div>}
                </div>
            </div>
        </motion.div>
    </NavLink>
)

const OtherUserInfo = ({ id }) => {
    const { getEventTitle, getAnUser } = useDataContext();
    const [user, setUser] = useState();
    const [ownEvent, setOwnEvent] = useState([]);
    const [recordData, setRecordData] = useState([]);
    useEffect(() => {
        const getUserData = async(user_id) =>{
            let result = await getAnUser(user_id);
            setUser(result);
        }
        getUserData(id);
    }, [])
    const [totalDonation, setTotalDonation] = useState(0);
    useEffect(() => {
        const getTotal = () => {
            let value = 0;
            for (let i in user?.donation_detail) {
                value += user.donation_detail[i].amount;
            }
            return value;
        }
        const getData = async () => {
            let result = [];
            const q = query(collection(db, "events/users/database"), where("user_id", "==", id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                result.push({ id: doc.id, data: doc.data(), type: 'users' });
            });
            setOwnEvent(result);
        }
        const getRecordData = async () => {
            let data = []
            for (let i = 0; i < user.donation_detail.length; i++) {
                let title = await getEventTitle(user.donation_detail[i].event_id);
                data.push({ event_title: title, amount: user.donation_detail[i].amount, timestamp: user.donation_detail[i].timestamp.toDate().toLocaleString() })
            }
            setRecordData(data);
        }
        if (user) {
            getData();
            getRecordData();
            setTotalDonation(getTotal());
        }
    }, [user]);
    const { level } = calculateUserLevel(totalDonation);

    return (
        <div>
            {user !== undefined && (
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
                                    <p className="text-xl text-white">Cấp độ: {level}</p>
                                    <p className="text-xl text-white">Danh hiệu:
                                        <span style={{ color: userTitle[user.displayTitle].color }}> {userTitle[user.displayTitle].title}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="border-1 p-2 m-2 white-glassmorphism">
                            <p className="text-white text-gradient p-3 m-3 text-3xl">Lịch sử quyên góp</p>
                            <DataGrid data={recordData} grid={donation_record_grid} editing={false} deleting={false} />
                        </div>
                    </div>
                    <div className="gradient-bg-transactions grid grid-cols-1 justify-items-center items-center flex py-[20px] sm:px-[50px] lg:px-[100px] px-[20px]">
                        <h1 className="text-xl sm:text-3xl text-white text-gradient py-1">Sự kiện của người dùng này:</h1>
                        <div className="flex flex-wrap">
                            {ownEvent.map((event, index) =>
                                <EventCard id={event.id}
                                    title={event.data.title}
                                    event={event.data.event}
                                    location={(event.city || '') + " " + (event.state || '') + " VN"}
                                    key={event.id}
                                    url={event.data.image}
                                    start={event.data.start}
                                    end={event.data.end} />)}
                        </div>
                    </div>
                </div>
            )}</div>
    )
}

export default OtherUserInfo;