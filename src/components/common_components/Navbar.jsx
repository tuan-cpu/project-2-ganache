import { MdKeyboardArrowDown } from 'react-icons/md';
import { AiOutlineMenu } from 'react-icons/ai';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../utils/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import { useStateContext } from '../../controller/ContextProvider';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import avatar from '../assets/avatar.svg';
import { useAuthContext } from '../../controller/AuthProvider';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <TooltipComponent content={title} position="BottomCenter">
        <button
            type="button"
            onClick={() => customFunc()}
            style={{ color }}
            className="relative text-xl rounded-full p-3 hover:bg-light-gray"
        >
            <span
                style={{ background: dotColor }}
                className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
            />
            {icon}
        </button>
    </TooltipComponent>
);
const Navbar = () => {
    const navigate = useNavigate();
    const { user, setUser } = useAuthContext();
    let authToken = sessionStorage.getItem('Auth Token');
    let email = sessionStorage.getItem('Email');
    let provider = sessionStorage.getItem('Provider');
    useEffect(() => {
        const getData = async () => {
            const q = query(collection(db, "users"), where("email", "==", email), where("provider", "==", provider));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                if (doc.data().provider === "Google") {
                    setUser({ displayName: doc.data().displayName, id: doc.id, donation_detail: doc.data().donation_detail, email: email, provider: provider, role: doc.data().role, verified: doc.data().verified, avatar: doc.data().avatar || '', displayTitle: doc.data().displayTitle || 0 });
                }
                if (doc.data().provider === "Self") {
                    setUser({ displayName: doc.data().last_name + " " + doc.data().first_name, id: doc.id, donation_detail: doc.data().donation_detail, email: email, provider: provider, role: doc.data().role, verified: doc.data().verified, avatar: doc.data().avatar || '', displayTitle: doc.data().displayTitle || 0 });
                }
            });
        }
        if (email && provider) {
            getData();
        }
    }, [email, provider]);
    const handleActiveMenu = () => setActiveMenu(!activeMenu);
    const { currentColor, activeMenu, setActiveMenu, screenSize, setScreenSize } = useStateContext();
    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
    
        window.addEventListener('resize', handleResize);
    
        handleResize();
    
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    
      useEffect(() => {
        if (screenSize <= 900) {
          setActiveMenu(false);
        } else {
          setActiveMenu(true);
        }
      }, [screenSize]);
    return (
        <nav className='flex justify-between p-2 md:ml-6 md:mr-6 relative'>
            <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
            {!authToken?<NavButton title="Log in" customFunc={()=> navigate('/login')} color={currentColor} icon={"Log in"}/>:
            <TooltipComponent content="Profile" position="BottomCenter">
                <div
                    className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
                    onClick={() => navigate('/user_profile')}
                >
                    <img
                        className="rounded-full w-8 h-8"
                        src={user.avatar? user.avatar: avatar}
                        alt="user-profile"
                    />
                    <p>
                        <span className="text-gray-400 text-14">Hi,</span>{' '}
                        <span className="text-gray-400 font-bold ml-1 text-14">
                            {user['displayName']}
                        </span>
                    </p>
                    <MdKeyboardArrowDown className="text-gray-400 text-14" />
                </div>
            </TooltipComponent>}
        </nav>
    )
}

export default Navbar;