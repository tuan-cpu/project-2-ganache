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

const InfoCard = ({currentColor, info}) =>(
  <div className='flex flex-row justify-start items-center white-glassmorphism border-black dark:border-white p-3 m-2 hover:shadow-xl'>
      <div className='ml-5 flex flex-col flex-1'>
          <h1 className='mt-2 text-lg dark:text-white'>Test request</h1>
          <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3]'>Title: {info.title}</p>
          <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3]'>Event: {info.event}</p>
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

const dummyData = [
  {
    id: 1,
    title: "Test 1",
    event: "This is test 1"
  },
  {
    id: 2,
    title: "Test 2",
    event: "This is test 2"
  },
  {
    id: 3,
    title: "Test 3",
    event: "This is test 3"
  },
]

const UserEventCheck = () => {
  const { currentColor } = useStateContext();
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({id:"",title:"",event:""});
  return (
    <div>
      <Header category="Inquiry" title='Kiểm tra sự kiện người dùng nộp lên' />
      <div className="grid grid-cols-2">
        <div className='flex flex-col'>
          {dummyData.map((item,index)=>(
            <div key={index} onClick={()=>{
              if(info.id === item.id) setOpen((prevOpen)=>!prevOpen);
              else{
                if(info.id === '' || (info.id !== item.id && !open)){
                  setInfo({...item});
                  setOpen((prevOpen)=>!prevOpen);
                }else setInfo({...item});
              }
            }}>
              <RequestCard title={item.title} subtitle={item.event}/>
            </div>
          ))}
        </div>
        <div>
          {open?<InfoCard currentColor={currentColor} info={info}/>:''}
        </div>
      </div>
    </div>
  )
}

export default UserEventCheck