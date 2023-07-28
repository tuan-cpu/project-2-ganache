import React, { useState, useEffect } from 'react'
import { Header, Button } from '../../../components';
import { useStateContext } from '../../../controller/ContextProvider';
import { useDataContext } from '../../../controller/DataProvider';
import { AiOutlineCheck } from 'react-icons/ai';
import { FcCancel } from 'react-icons/fc';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RequestCard = ({ title, subtitle, status }) => (
  <div className="flex flex-row justify-start items-center white-glassmorphism border-black dark:border-white p-3 m-2 hover:shadow-xl cursor-pointer">
    <div className='ml-5 flex flex-col flex-1'>
      <h1 className='mt-2 text-lg dark:text-white'>{title}</h1>
      <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3]'>{subtitle}</p>
    </div>
    {status ? <AiOutlineCheck size={21} color='green' /> : <FcCancel size={21} color='red' />}
  </div>
)

const InfoCard = ({ currentColor, info, acceptFunc, rejectFunc }) => (
  <div className='flex flex-row justify-start items-center white-glassmorphism border-black dark:border-white p-3 m-2 hover:shadow-xl'>
    <div className='ml-5 flex flex-col flex-1'>
      <h1 className='mt-2 text-lg dark:text-white'>Test request</h1>
      <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3]'>Title: {info.data.title}</p>
      <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3]'>Event: {info.data.event}</p>
      <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3]'>User ID: {info.data.user_id}</p>
      <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3]'>Wallet: {info.data.wallet}</p>
      <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3]'>Duration</p>
      <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3]'>Story: {info.data.story}</p>
      <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3]'>Location</p>
      <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3] flex'>Status: {info.data.status ? <AiOutlineCheck size={21} color='green' /> : <FcCancel size={21} color='red' />}</p>
      <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3]'>Cover Image</p>
      <div className="relative w-full lg:col-span-2">
        <img alt="true" src={info.data.image} width={150} height={150}/>
      </div>
      {!info.data.status && !info.data.rejected && (
        <div className='mt-6 flex justify-between'>
          <Button color='white' bgColor={currentColor} text='Từ chối' borderRadius='10px' size='md' customFunction={rejectFunc} />
          <Button color='white' bgColor={currentColor} text='Chấp nhận' borderRadius='10px' size='md' customFunction={acceptFunc} />
        </div>)}
    </div>
  </div>
)
const UserEventCheck = () => {
  const { currentColor } = useStateContext();
  const { createEventRequest, getAllCreateEventRequest, acceptEventRequest, updateUserRequestStatus, rejectEventRequest } = useDataContext();
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({ id: "", data: null });
  useEffect(() => {
    getAllCreateEventRequest();
  }, [])
  const handleClose = () => {
    getAllCreateEventRequest();
    setOpen(false);
  };
  return (
    <div>
      <Header category="Inquiry" title='Kiểm tra sự kiện người dùng nộp lên' />
      <div className="grid sm:grid-cols-2">
        <div className='flex flex-col'>
          <div>
            <p className='text-xl font-semibold dark:text-white'>Yêu cầu chưa giải quyết</p>
            {createEventRequest.map((item, index) => (
              !item.data.rejected && !item.data.status &&
              <div key={index} onClick={() => {
                if (info.id === item.id) setOpen((prevOpen) => !prevOpen);
                else {
                  if (info.id === '' || (info.id !== item.id && !open)) {
                    setInfo({ ...item });
                    setOpen((prevOpen) => !prevOpen);
                  } else setInfo({ ...item });
                }
              }}>
                <RequestCard title={item.data.title} subtitle={item.data.event} status={item.data.status} />
              </div>
            ))}
          </div>
          <div>
            <p className='text-xl font-semibold dark:text-white'>Yêu cầu bị từ chối</p>
            {createEventRequest.map((item, index) => (
              item.data.rejected && !item.data.status &&
              <div key={index} onClick={() => {
                if (info.id === item.id) setOpen((prevOpen) => !prevOpen);
                else {
                  if (info.id === '' || (info.id !== item.id && !open)) {
                    setInfo({ ...item });
                    setOpen((prevOpen) => !prevOpen);
                  } else setInfo({ ...item });
                }
              }}>
                <RequestCard title={item.data.title} subtitle={item.data.event} status={item.data.status} />
              </div>
            ))}
          </div>
        </div>
        <div>
          {open ?
            <InfoCard
              currentColor={currentColor}
              info={info}
              acceptFunc={() => {
                acceptEventRequest(info.data);
                updateUserRequestStatus('create_event_inquiry',info.id, true, false);
                toast.success('Yêu cầu được chấp thuận!',{
                  onClose: handleClose
                });
              }}
              rejectFunc={() => {
                rejectEventRequest(info.data.user_id, info.data.title);
                updateUserRequestStatus('create_event_inquiry',info.id, false, true);
                toast.error('Đã từ chối yêu cầu!',{
                  onClose: handleClose
                });
              }}
            /> : ''}
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default UserEventCheck