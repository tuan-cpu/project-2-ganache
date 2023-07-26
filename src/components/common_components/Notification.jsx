import React, { useEffect } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { Button } from '..';
import { useStateContext } from '../../controller/ContextProvider';
import { useAuthContext } from '../../controller/AuthProvider';
import { useDataContext } from '../../controller/DataProvider';

const Notification = () => {
  const { currentColor } = useStateContext();
  const { user } = useAuthContext();
  const { notifications, getUserNotifications } = useDataContext();
  useEffect(()=>{
    getUserNotifications(user.id);
  },[])
  return (
    <div className="nav-item absolute right-5 md:right-40 top-16 bg-gray-200 dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <div className='flex gap-3'>
          <p className="font-semibold text-lg dark:text-gray-200">Notifications</p>
        </div>
        <Button icon={<MdOutlineCancel />} color="rgb(153, 171, 180)" bgHoverColor="light-gray" size="2xl" borderRadius="50%" />
      </div>
      <div className="mt-5 ">
        {notifications?.reverse().map((item, index) => (
          <div key={index} className="flex items-center leading-8 gap-5 border-b-1 border-color p-3">
            <div>
              <p className="text-gray-500 text-sm dark:text-gray-400"> {item} </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;