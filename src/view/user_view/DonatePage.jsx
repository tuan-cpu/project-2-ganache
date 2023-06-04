import { Navbar,Footer,DonateDetail } from "../../components";
const DonatePage = () =>{
    return(
        <div className="min-h-screen">
            <div className="gradient-bg-welcome"><Navbar/></div>
            <DonateDetail/>
            <Footer/>
        </div>
    )
}

export default DonatePage;