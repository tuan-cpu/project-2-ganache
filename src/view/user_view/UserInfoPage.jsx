import { Navbar,Footer,UserInfo, OtherUserInfo } from '../../components';
import { useParams } from 'react-router-dom';
const UserInfoPage = () =>{
    const { id } = useParams();
    return(
        <div>
            <div className='gradient-bg-welcome'><Navbar/></div>
            { id ? <OtherUserInfo id={id}/>:<UserInfo/>}
            <Footer/>
        </div>
    )
}

export default UserInfoPage;