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

const InfoCard = ({ currentColor, info, acceptFunc }) => (
  <div className='flex flex-row justify-start items-center white-glassmorphism border-black dark:border-white p-3 m-2 hover:shadow-xl'>
    <div className='ml-5 flex flex-col flex-1'>
      <h1 className='mt-2 text-lg dark:text-white'>Yêu cầu rút tiền</h1>
      <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3]'>User ID: {info.data.user_id}</p>
      <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3]'>Event ID: {info.data.event_id}</p>
      <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3]'>Wallet: {info.data.wallet}</p>
      <div className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3] flex items-center'>Status:
        <span>{info.data.status ? <AiOutlineCheck color='green' size={21} /> : <FcCancel color='red' size={21} />}</span>
      </div>
      {!info.data.status && (<div className='mt-6'>
        <Button color='white' bgColor={currentColor} text='Chấp nhận' borderRadius='10px' size='md' customFunction={acceptFunc} />
      </div>)}
    </div>
  </div>
)

const Withdrawal = () => {
  const { currentColor } = useStateContext();
  const { getAllWithdrawalRequest, withdrawalRequests } = useDataContext();
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({ id: "", data: null });
  useEffect(() => {
    getAllWithdrawalRequest();
  }, [])
  return (
    <div>
      <Header category="Inquiry" title='Kiểm tra yêu cầu rút tiền' />
      <div className="grid grid-cols-2">
        <div className='flex flex-col'>
          {withdrawalRequests.map((item, index) => (
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
        <div>
          {open ? <InfoCard currentColor={currentColor} acceptFunc={() => { }} info={info} /> : ''}
        </div>
      </div>
    </div>
  )
}

export default Withdrawal