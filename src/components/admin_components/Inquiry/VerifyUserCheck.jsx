import React, { useState, useEffect } from 'react'
import { Header, Button } from '../../../components';
import { useStateContext } from '../../../controller/ContextProvider';
import { useDataContext } from '../../../controller/DataProvider';
import { AiOutlineCheck } from 'react-icons/ai';
import { FcCancel } from 'react-icons/fc';

const RequestCard = ({ title, status }) => (
  <div className="white-glassmorphism border-black dark:border-white p-3 m-2 hover:shadow-xl cursor-pointer">
    <div className='ml-5 flex justify-between items-center'>
      <h1 className='mt-2 text-lg dark:text-white'>{title}</h1>
      {status ? <AiOutlineCheck size={21} color='green' /> : <FcCancel size={21} color='red' />}
    </div>
  </div>
)

const InfoCard = ({ currentColor, info, acceptFuc, rejectFunc }) => (
  <div className='flex flex-row justify-start items-center white-glassmorphism border-black dark:border-white p-3 m-2 hover:shadow-xl'>
    <div className='ml-5 flex flex-col flex-1'>
      <h1 className='mt-2 text-lg dark:text-white'>User Verify Request</h1>
      <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3]'>User ID: {info.data.user_id}</p>
      <div className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3] flex items-center'>Status:
        <span>{info.data.status ? <AiOutlineCheck color='green' size={21} /> : <FcCancel color='red' size={21} />}</span>
      </div>
      <div className="relative w-full lg:col-span-2">
        <img alt="true" src={info.data.file1} className="w-full " />
      </div>
      <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3]'>QR Info: {info.data.qr_info}</p>
      {!info.data.rejected && !info.data.status && (
        <div className='mt-2 flex justify-between'>
          <Button color='white' bgColor={currentColor} text='Từ chối' borderRadius='10px' size='md' customFunction={rejectFunc} />
          <Button color='white' bgColor={currentColor} text='Xác nhận' borderRadius='10px' size='md' customFunction={acceptFuc} />
        </div>
      )}
    </div>
  </div>
)
const VerifyUserCheck = () => {
  const { currentColor } = useStateContext();
  const { userVerifyRequest, getAllUserVerifyRequest, acceptVerifyRequest, rejectVerifyRequest, updateRequestStatus } = useDataContext();
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({ id: "", data: null });
  useEffect(() => {
    getAllUserVerifyRequest();
  }, [])
  return (
    <div>
      <Header category="Inquiry" title='Kiểm tra thông tin người dùng' />
      <div className="grid sm:grid-cols-2">
        <div className='flex flex-col'>
          <p className='text-xl font-bold dark:text-white'>Các yêu cầu hiện tại</p>
          <div className='flex flex-col'>
            {userVerifyRequest.map((item, index) => (
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
                <RequestCard title={item.id} status={item.data.status} />
              </div>
            ))}
          </div>
          <p className='text-xl font-bold dark:text-white'>Các yêu cầu đã được xử lí</p>
          <div className='flex flex-col'>
            {userVerifyRequest.map((item, index) => (
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
                <RequestCard title={item.id} status={item.data.status} />
              </div>
            ))}
          </div>
          <p className='text-xl font-bold dark:text-white'>Các yêu cầu đã bị từ chối</p>
          <div className='flex flex-col'>
            {userVerifyRequest.map((item, index) => (
              item.data.rejected &&
              <div key={index} onClick={() => {
                if (info.id === item.id) setOpen((prevOpen) => !prevOpen);
                else {
                  if (info.id === '' || (info.id !== item.id && !open)) {
                    setInfo({ ...item });
                    setOpen((prevOpen) => !prevOpen);
                  } else setInfo({ ...item });
                }
              }}>
                <RequestCard title={item.id} status={item.data.status} />
              </div>
            ))}
          </div>
        </div>
        <div>
          {open ?
            <InfoCard currentColor={currentColor} info={info} acceptFuc={() => {
              acceptVerifyRequest(info.data.user_id);
              updateRequestStatus('user_verify_inquiry', info.id, true, false);
            }} rejectFunc={() => {
              rejectVerifyRequest(info.data.user_id);
              updateRequestStatus('user_verify_inquiry', info.id, false, true);
            }} /> : ''}
        </div>
      </div>
    </div>
  )
}

export default VerifyUserCheck