import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter } from '../../components';
const EventCard = ({ title, event, location, id, url, start, end, type }) => (
    <NavLink className="flex justify-center" to={`detail/${id}`}>
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
                {type !== 'lifetime' ? (
                    <div>
                        {Date.now() < start?.seconds * 1000 && <div className='text-xl text-orange-500'>Sự kiện chưa bắt đầu!</div>}
                        {Date.now() > start?.seconds * 1000 && Date.now() < end?.seconds * 1000 && <div className='text-xl text-red-500'>Sự kiện đang diễn ra!</div>}
                        {Date.now() > end?.seconds * 1000 && <div className='text-xl text-red-500'>Sự kiện đã kết thúc!</div>}
                    </div>
                ) : <div className='text-xl text-red-500'>Sự kiện đang diễn ra!</div>}
            </div>
        </motion.div>
    </NavLink>
)
const EventList = ({ type, events }) => {
    const navigate = useNavigate();
    const [correspondEvents, setCorrespondEvents] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [activeButton, setActiveButton] = useState("All");
    useEffect(() => {
        let result = [];
        for (let i in events) {
            if (events[i].type === type) {
                result.push(events[i]);
            }
        }
        setCorrespondEvents(result);
        setFiltered(result);
    }, [type]);
    const handleSearchInput = (input)=>{
        setActiveButton("All");
        let result = [];
        if (input !== "") {
            result = correspondEvents.filter((event) => event.title.includes(input));
        } else {
            result = correspondEvents;
        }
        setFiltered(result);
    }
    return (
        <div className="gradient-bg-transactions grid grid-cols-1 justify-items-center items-center flex py-[20px] sm:px-[50px] lg:px-[100px] px-[20px]">
            <div className="flex w-3/4 sm:w-1/2 gap-[2px]">
                <input
                    type="text"
                    className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Tìm kiếm..."
                    onChange={(e) => handleSearchInput(e.target.value)}
                />
                <button
                    type="button"
                    className='border-[1px] p-2 border-[#3d4f7c] cursor-pointer hover:bg-[#2546bd]'
                    onClick={() => navigate('/create/' + type)}
                >
                    <p className="text-white text-base font-semibold">Tạo quỹ</p>
                </button>
            </div>
            <Filter events={correspondEvents} setFiltered={setFiltered} activeButton={activeButton} setActiveButton={setActiveButton} />
            <motion.div layout className="grid sm:grid-cols-3 grid-cols-2 p-[20px] gap-[20px]">
                <AnimatePresence>
                    {filtered.map((event, index) => <EventCard type={type} id={event.id} title={event.title} event={event.event} location={(event.city || '') + " " + (event.state || '') + " VN"} key={event.id} url={event.image} start={event.start} end={event.end} />)}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

export default EventList;