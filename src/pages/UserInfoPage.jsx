import { Navbar,Footer,UserInfo } from '../components';
const UserInfoPage = () =>{
    return(
        <div>
            <div className='gradient-bg-welcome'><Navbar/></div>
            <UserInfo/>
            <Footer/>
        </div>
    )
}

export default UserInfoPage;