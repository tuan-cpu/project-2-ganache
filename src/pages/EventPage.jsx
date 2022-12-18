import { Navbar,Footer,EventList } from "../components";
const EventPage = () =>{
    return(
        <div className="min-h-screen">
            <div className="gradient-bg-welcome"><Navbar/></div>
            <EventList/>
            <Footer/>
        </div>
    )
}

export default EventPage;