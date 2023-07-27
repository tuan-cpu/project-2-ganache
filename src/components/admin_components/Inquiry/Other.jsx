import React, { useState, useEffect } from 'react'
import { Header, Button } from '../../../components';
import { useStateContext } from '../../../controller/ContextProvider';
import { useDataContext } from '../../../controller/DataProvider';
import { AiOutlineCheck } from 'react-icons/ai';
import { FcCancel } from 'react-icons/fc';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RequestCard = ({ title, status }) => (
  <div className="flex flex-row justify-start items-center white-glassmorphism border-black dark:border-white p-3 m-2 hover:shadow-xl cursor-pointer">
    <div className='ml-5 flex flex-col flex-1'>
      <h1 className='mt-2 text-lg dark:text-white'>{title}</h1>
    </div>
    {status ? <AiOutlineCheck size={21} color='green' /> : <FcCancel size={21} color='red' />}
  </div>
)

const InfoCard = ({ currentColor, info, username, email, acceptFunc }) => (
  <div className='flex flex-row justify-start items-center white-glassmorphism border-black dark:border-white p-3 m-2 hover:shadow-xl'>
    <div className='ml-5 flex flex-col flex-1'>
      <h1 className='mt-2 text-lg dark:text-white'>{info.data.subject}</h1>
      <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3]'>Username: {username}</p>
      <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3]'>Email: {email}</p>
      <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3]'>Mô tả: {info.data.describe}</p>
      <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3] flex'>Status: {info.data.status ? <AiOutlineCheck size={21} color='green' /> : <FcCancel size={21} color='red' />}</p>
      <div className='mt-6'>
        <Button color='white' bgColor={currentColor} text='Xử lí' borderRadius='10px' size='md' customFunction={acceptFunc} />
      </div>
    </div>
  </div>
)

const Other = () => {
  const { currentColor } = useStateContext();
  const { otherRequest, getAllOtherRequest, getAnUser, updateOtherRequestStatus } = useDataContext();
  useEffect(() => {
    getAllOtherRequest();
  }, [])
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({ id: "", data: null });
  const [user, setUser] = useState();
  useEffect(() => {
    const getUserData = async (user_id) => {
      let result = await getAnUser(user_id);
      setUser(result);
    }
    if (info.data != null) getUserData(info.data.user_id);
  }, [info]);
  const handleClose = () => window.location.reload();
  return (
    <div>
      <Header category="Inquiry" title='Other' />
      <div className="grid grid-cols-2">
        <div className='flex flex-col'>
          <div>
            <p className='text-xl font-semibold dark:text-white'>Yêu cầu chưa xử lí</p>
            <div className='flex flex-col'>
              {otherRequest.map((item, index) => (
                !item.data.status &&
                <div key={index} onClick={() => {
                  if (info.id === item.id) setOpen((prevOpen) => !prevOpen);
                  else {
                    if (info.id === '' || (info.id !== item.id && !open)) {
                      setInfo({ ...item });
                      setOpen((prevOpen) => !prevOpen);
                    } else setInfo({ ...item });
                  }
                }}>
                  <RequestCard title={item.data.subject} status={item.data.status} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className='text-xl font-semibold dark:text-white'>Yêu cầu đã xử lí</p>
            <div className='flex flex-col'>
              {otherRequest.map((item, index) => (
                item.data.status &&
                <div key={index} onClick={() => {
                  if (info.id === item.id) setOpen((prevOpen) => !prevOpen);
                  else {
                    if (info.id === '' || (info.id !== item.id && !open)) {
                      setInfo({ ...item });
                      setOpen((prevOpen) => !prevOpen);
                    } else setInfo({ ...item });
                  }
                }}>
                  <RequestCard title={item.data.subject} status={item.data.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          {open && user ? <InfoCard currentColor={currentColor} info={info} username={user.displayName} email={user.email}
            acceptFunc={() => {
              updateOtherRequestStatus(info.id);
              toast.success('Yêu cầu được chấp thuận!',{
                onClose: handleClose
              });
            }} /> : ''}
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Other