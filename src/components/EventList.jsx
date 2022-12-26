import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import dummyEvents from '../utils/dummyEvents';
import Filter from './Filter';
const EventCard = ({ title, event, location }) => (
    <NavLink className="flex justify-center" to='/detail'>
        <motion.div layout animate={{opacity:1}} initial={{opacity:0}} exit={{opacity:0}}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }} 
            className="rounded-lg shadow-lg white-glassmorphism max-w-sm">
            <a href="#!">
                <img className="rounded-t-lg" src="https://mdbootstrap.com/img/new/standard/nature/184.jpg" alt="" />
            </a>
            <div className="p-6">
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
const EventList = () => {
    const [events,setEvents] = useState(dummyEvents);
    const [filtered,setFiltered] = useState(dummyEvents);
    const [activeButton,setActiveButton] = useState("All");
    const [input,setInput] = useState({input:""});
    const handleSearchInput = (e) =>{
        setInput((prevState) => ({ ...prevState, input: e.target.value }));
    };
    useEffect(() => {
        const search_filtered = events.filter((event)=> event.title.includes(input.input))
        setFiltered(search_filtered)
    }, [input]);
    return (
        <div className="gradient-bg-transactions grid grid-cols-1 justify-items-center items-center flex py-[20px] sm:px-[50px] lg:px-[100px] px-[20px]">
            <div className="flex w-3/4 sm:w-1/2 gap-[2px]">
                <input
                    type="text"
                    className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Search..."
                    onChange={(e)=>handleSearchInput(e)}
                />
            </div>
            <div>
                <Filter events={events} setFiltered={setFiltered} activeButton={activeButton} setActiveButton={setActiveButton}/>
            </div>
            <motion.div layout className="grid sm:grid-cols-3 grid-cols-2 p-[20px] gap-[20px]">
                <AnimatePresence>
                    {filtered.map((event,index)=><EventCard title={event.title} event={event.event} location={event.location} key={event.id}/>)}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

export default EventList;