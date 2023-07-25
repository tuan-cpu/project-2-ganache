import React, { useState, useEffect } from 'react'
import { Header, Button } from '../../../components';
import { useStateContext } from '../../../controller/ContextProvider';
import { useDataContext } from '../../../controller/DataProvider';
import { AiOutlineCheck } from 'react-icons/ai';
import { FcCancel } from 'react-icons/fc';
import { useTransactionContext } from '../../../controller/TransactionProvider';
import { shortenAddress } from '../../../common/utils/shortenAddress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3]'>Amount: {info.data.amount}</p>
      <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3]'>Wallet: {shortenAddress(info.data.wallet)}</p>
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
  const { getAllWithdrawalRequest, withdrawalRequests, acceptWithdrawalRequest, updateWithdrawalRequest } = useDataContext();
  const { acceptWithdrawal, formData, setFormData } = useTransactionContext();
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({ id: "", data: null });
  useEffect(() => {
    getAllWithdrawalRequest();
  }, []);
  const handleClose = () => window.location.reload();
  const accept = (user_id, doc_id) => {
    acceptWithdrawalRequest(user_id);
    updateWithdrawalRequest(doc_id);
    toast.success('Yêu cầu được chấp thuận!',{
      onClose: handleClose
    });
  }
  return (
    <div>
      <Header category="Inquiry" title='Kiểm tra yêu cầu rút tiền' />
      <div className="grid grid-cols-2">
        <div className='flex flex-col'>
          <div className='flex flex-col'>
            <p className='text-xl font-bold dark:text-white'>Chưa xử lí</p>
            {withdrawalRequests.map((item, index) => (
              !item.data.status &&
              <div key={index} onClick={() => {
                if (info.id === item.id) {
                  setOpen((prevOpen) => !prevOpen);
                  setFormData({
                    addressTo: "",
                    amount: "",
                    keyword: "",
                    message: ""
                  })
                }
                else {
                  if (info.id === '' || (info.id !== item.id && !open)) {
                    setInfo({ ...item });
                    setOpen((prevOpen) => !prevOpen);
                  } else setInfo({ ...item });
                  setFormData({
                    addressTo: item.data.wallet,
                    amount: item.data.amount.toString(),
                    keyword: "withdrawal",
                    message: "accept"
                  })
                }
              }}>
                <RequestCard title={item.id} status={item.data.status} />
              </div>
            ))}
          </div><div className='flex flex-col'>
            <p className='text-xl font-bold dark:text-white'>Đã xử lí</p>
            {withdrawalRequests.map((item, index) => (
              item.data.status &&
              <div key={index} onClick={() => {
                if (info.id === item.id) {
                  setOpen((prevOpen) => !prevOpen);
                  setFormData({
                    addressTo: "",
                    amount: "",
                    keyword: "",
                    message: ""
                  })
                }
                else {
                  if (info.id === '' || (info.id !== item.id && !open)) {
                    setInfo({ ...item });
                    setOpen((prevOpen) => !prevOpen);
                  } else setInfo({ ...item });
                  setFormData({
                    addressTo: item.data.wallet,
                    amount: item.data.amount.toString(),
                    keyword: "withdrawal",
                    message: "accept"
                  })
                }
              }}>
                <RequestCard title={item.id} status={item.data.status} />
              </div>
            ))}
          </div>
        </div>

        <div>
          {open ? <InfoCard currentColor={currentColor} acceptFunc={() => {
            acceptWithdrawal(accept, info.data.user_id, info.id);
          }} info={info} /> : ''}
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Withdrawal