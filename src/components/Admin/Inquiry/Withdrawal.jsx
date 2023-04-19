import React, { useState } from 'react'
import { Header, Button } from '../../../components';
import { useStateContext } from '../../../context/ContextProvider';

const RequestCard = ({title,subtitle}) =>(
  <div className="flex flex-row justify-start items-center white-glassmorphism border-black dark:border-white p-3 m-2 hover:shadow-xl cursor-pointer">
      <div className='ml-5 flex flex-col flex-1'>
          <h1 className='mt-2 text-lg dark:text-white'>{title}</h1>
          <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3]'>{subtitle}</p>
      </div>
  </div>
)

const InfoCard = ({currentColor}) =>(
  <div className='flex flex-row justify-start items-center white-glassmorphism border-black dark:border-white p-3 m-2 hover:shadow-xl'>
      <div className='ml-5 flex flex-col flex-1'>
          <h1 className='mt-2 text-lg dark:text-white'>Test request</h1>
          <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3]'>Title</p>
          <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3]'>Event</p>
          <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3]'>User ID</p>
          <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3]'>Wallet</p>
          <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3]'>Duration</p>
          <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3]'>Story</p>
          <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3]'>Location</p>
          <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3]'>Status</p>
          <div className='mt-6'>
            <Button color='white' bgColor={currentColor} text='Chấp nhận' borderRadius='10px' size='md' customFunction={()=>{}} />
          </div>
      </div>
  </div>
)

const Withdrawal = () => {
  const { currentColor } = useStateContext();
  const [open,setOpen] = useState(false);
  return (
    <div>
      <Header category="Inquiry" title='Kiểm tra yêu cầu rút tiền' />
      <div className="grid grid-cols-2">
        <div className='flex flex-col'>
          <div onClick={()=>setOpen((prevOpen)=>!prevOpen)}><RequestCard title='test' subtitle='This is test'/></div>
          <div><RequestCard title='test' subtitle='This is test'/></div>
          <div><RequestCard title='test' subtitle='This is test'/></div>
        </div>
        <div>
          {open?<InfoCard currentColor={currentColor}/>:''}
        </div>
      </div>
    </div>
  )
}

export default Withdrawal