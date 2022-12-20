import { NavLink } from 'react-router-dom';
const EventCard = ({ title, event, location }) => (
    <NavLink class="flex justify-center" to='/detail'>
        <div class="rounded-lg shadow-lg white-glassmorphism max-w-sm">
            <a href="#!">
                <img class="rounded-t-lg" src="https://mdbootstrap.com/img/new/standard/nature/184.jpg" alt="" />
            </a>
            <div class="p-6">
                <p className="text-left text-white font-medium text-base text-xl overflow-hidden text-ellipsis whitespace-nowrap">
                    {title}
                </p>
                <div className="flex flex-col">
                    <div className="flex flex-row">
                        <img src="https://www.jg-cdn.com/assets/jg-search-ui/988987ebcc319df493bc0d13321b356a.svg" alt="" />
                        <p className="text-gray-300 text-base pl-[10px] truncate">{event}</p>
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
const EventList = () => {
    return (
        <div className="gradient-bg-transactions grid grid-cols-1 justify-items-center items-center flex py-[20px] sm:px-[50px] lg:px-[100px] px-[20px]">
            <div className="flex w-3/4 sm:w-1/2 gap-[2px]">
                <input
                    type="text"
                    className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Search..."
                />
                <button className="px-4 text-white white-glassmorphism rounded">
                    Search
                </button>
            </div>
            <div className="grid sm:grid-cols-3 grid-cols-2 p-[20px] gap-[20px]">
                <EventCard title="test test test test test test test test test test test" event="event" location="VN" />
                <EventCard title="test test test test test test test test" event="event" location="VN" />
                <EventCard title="test1111111111" event="event" location="VN" />
            </div>
        </div>
    )
}

export default EventList;