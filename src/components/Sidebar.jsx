import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SiEthereum } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { links, links_admin } from '../utils/data';
import { useStateContext } from '../context/ContextProvider';
import { TransactionContext } from '../context/TransactionContext';

const Sidebar = () => {
    const { activeMenu, setActiveMenu, screenSize, currentColor } = useStateContext();
    const { user } = useContext(TransactionContext);
    const [chosenLink,setChosenLink] = useState([]);
    useEffect(() => {
        if(user && user['role'] === 'admin') setChosenLink(links_admin);
        else setChosenLink(links);
    }, [user]);
    const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2';
    const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2 text-md text-gray-700'
    const handleCloseSidebar = () => {
        if (activeMenu && screenSize <= 900) {
            setActiveMenu(false)
        }
    }
    let authToken = sessionStorage.getItem('Auth Token');
    return (
        <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'>
            {activeMenu && (
                <>
                    <div className='flex justify-between items-center'>
                        <Link to='/' onClick={() => handleCloseSidebar()} className='items-center gap-3 mt-3 flex text-xl ml-3 font-extrabold tracking-tight dark:text-white text-slate-900'>
                            <SiEthereum /><span>Token Giving</span>
                        </Link>
                        <TooltipComponent content='Menu' position='BottomCenter'>
                            <button type='button' onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} className='text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden'>
                                <MdOutlineCancel />
                            </button>
                        </TooltipComponent>
                    </div>
                    <div className='mt-10'>
                        {chosenLink.map((item) => (
                            <div key={item.title}>
                                <p className='text-gray-400 m-3 mt-4 uppercase'>{item.title}</p>
                                {item.links.map((link) => (
                                    <NavLink to={`${link.link}`} key={link.name} onClick={() => handleCloseSidebar()}
                                        style={({ isActive }) => ({ backgroundColor: isActive ? currentColor : '' })}
                                        className={({ isActive }) => isActive ? activeLink : normalLink}>
                                        {link.icon}
                                        <span className='capitalize'>
                                            {link.name}
                                        </span>
                                    </NavLink>
                                ))}
                            </div>
                        ))}
                        {authToken && <NavLink to='/' onClick={() => {
                            sessionStorage.removeItem('Auth Token');
                            sessionStorage.removeItem('Email');
                            sessionStorage.removeItem('Provider');
                            setUser(null);
                        }}
                            style={{backgroundColor: 'red'}}
                            className={({ isActive }) => isActive ? activeLink : normalLink}>
                            <span className='capitalize'>
                                Log out
                            </span>
                        </NavLink>}
                    </div>
                </>
            )}
        </div>
    )
}

export default Sidebar;