import { Navbar,Footer,EventList } from "../../components";
import { useParams } from "react-router-dom";
import { useDataContext } from "../../controller/DataProvider";
import { useEffect } from "react";
const EventPage = () =>{
    const { getAllEvents, events } = useDataContext();
    let { type } = useParams();
    useEffect(()=>{
        const getData = async() =>{
            await getAllEvents();
        };
        getData();
    },[])
    return(
        <div className="min-h-screen">
            <div className="gradient-bg-welcome"><Navbar/></div>
                {events.length !== 0 && <EventList type={type} events={events}/>}
            <Footer/>
        </div>
    )
}

export default EventPage;