import { Navbar,Footer,VerifyUser } from '../components';
const VerifyUserPage = () =>{
    return(
        <div>
            <div className='gradient-bg-welcome'><Navbar/></div>
            <VerifyUser/>
            <Footer/>
        </div>
    )
}

export default VerifyUserPage;