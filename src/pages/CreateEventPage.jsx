import { Navbar,Footer,CreateEvent } from "../components";
const CreateEventPage = () =>{
    return(
        <div className="min-h-screen">
            <div className="gradient-bg-welcome"><Navbar/></div>
            <CreateEvent/>
            <Footer/>
        </div>
    )
}
export default CreateEventPage;