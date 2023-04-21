import React, { useState } from 'react';
const CandidateCard = ({ name, quote }) => (
  <div className="flex flex-row justify-start items-center white-glassmorphism border-black dark:border-white p-3 m-2 hover:shadow-xl cursor-pointer">
    <div className='ml-5 flex flex-col flex-1'>
      <h1 className='mt-2 text-lg dark:text-white'>{name}</h1>
      <p className='mt-2 text-sm md:w-9/12 dark:text-[#d7d3d3]'>{quote}</p>
    </div>
  </div>
)

const InfoCard = () =>(
  <div className='flex flex-row justify-start items-center white-glassmorphism border-black dark:border-white p-3 m-2 hover:shadow-xl'>
      <div className='ml-5 flex flex-col flex-1'>
          <h1 className='mt-2 text-lg dark:text-white'>Test info</h1>
      </div>
  </div>
)

const VoteUser = () => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className='gradient-bg-transactions min-h-screen'>
      <div className='flex w-full justify-center items-center'>
        <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
          {isClicked? <InfoCard/>:''}
          <div className="flex flex-1 justify-start flex-col">
            <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
              Bình chọn đại sứ tình nguyện
            </h1>
            <div className='grid sm:grid-cols-2 grid-cols-1'>
              <div className='text-white' onClick={()=>setIsClicked((prevIsClicked)=>!prevIsClicked)}><CandidateCard name='Candidate 1' quote="Test candidate 1" /></div>
              <div className='text-white'><CandidateCard name='Candidate 2' quote="Test candidate 2" /></div>
              <div className='text-white'><CandidateCard name='Candidate 3' quote="Test candidate 3" /></div>
              <div className='text-white'><CandidateCard name='Candidate 4' quote="Test candidate 4" /></div>
            </div>
          </div>
          {isClicked? <InfoCard/>:''}
        </div>
      </div>
    </div>
  )
}

export default VoteUser