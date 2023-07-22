import React, { useState, useEffect, useContext } from 'react';
import { useVotingContext } from '../../controller/VotingProvider';
import { MdOutlineCancel } from 'react-icons/md';
import { useDataContext } from '../../controller/DataProvider';
import { useStateContext } from '../../controller/ContextProvider';
import { NavLink } from 'react-router-dom';
import Button from '../common_components/Button';
const EventCard = ({ name }) => (
  <div className="flex flex-row justify-start items-center white-glassmorphism border-black dark:border-white p-3 m-2 hover:shadow-xl cursor-pointer">
    <div className='flex flex-col flex-1'>
      <h1 className='mt-2 text-lg dark:text-white'>{name}</h1>
    </div>
  </div>
)

const VoteUser = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { votingEvents, getAllVotingEvents, vote } = useVotingContext();
  const { candidate, getCandidateInfo } = useDataContext();
  const { currentColor } = useStateContext()
  const [chosenEvent, setChosenEvent] = useState();
  const [chosenCandidate, setChosenCandidate] = useState();
  const [candidateInfo, setCandidateInfo] = useState(false);
  useEffect(() => {
    getAllVotingEvents();
  }, []);
  useEffect(() => {
    if (chosenCandidate !== undefined) getCandidateInfo(chosenCandidate._userIndex)
  }, [chosenCandidate]);
  const getDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const dateString = date.toLocaleString();
    return dateString;
  }
  const calcTotalLike = (array) =>{
    let sum = 0;
    for(let i=0;i<array.length;i++){
      sum += array.data.liked_user_id.length;
    }
    return sum;
  }
  return (
    <div className='gradient-bg-transactions min-h-screen'>
      <div className='flex w-full justify-center items-center'>
        <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
          <div className="flex flex-1 justify-start flex-col">
            <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
              Bình chọn đại sứ tình nguyện
            </h1>
            <div className='justify-center items-center flex'>
              <div className='text-white flex flex-col'>
                <h1 className="text-xl sm:text-2xl text-white text-gradient py-1">
                  Sự kiện đang diễn ra
                </h1>
                {votingEvents.map((item, index) =>
                  <div key={index} onClick={() => {
                    setChosenEvent(item);
                    setIsClicked((prevIsClicked) => !prevIsClicked);
                  }}>
                    <EventCard name={item.name} />
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
      {chosenEvent && isClicked ? (
        <div className='bg-half-transparent w-screen fixed nav-item top-0 right-0'>
          <div className='h-screen dark:text-gray-200 bg-white dark:bg-[#484b52] w-400'>
            <div className='flex justify-between items-center p-4 ml-4'>
              <p className='font-semibold text-xl'>Thông tin sự kiện</p>
              <button type='button' onClick={() => setIsClicked(false)} style={{ color: 'rgb(153,171,180)', borderRadius: '50%' }}
                className='text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray'>
                <MdOutlineCancel />
              </button>
            </div>
            <div className='flex-col border-t-1 border-color p-4 ml-4'>
              <p className='font-semibold text-lg'>Thông tin cơ bản</p>
              <p>Tên sự kiện: {chosenEvent.name}</p>
              <p>ID: {parseInt(chosenEvent.id, 16)}</p>
              <p>Thời gian bắt đầu: {getDate(BigInt(chosenEvent.votingStart).toString())}</p>
              <p>Thời gian kết thúc: {getDate(BigInt(chosenEvent.votingEnd).toString())}</p>
            </div>
            <div className='flex-col border-t-1 border-color p-4 ml-4'>
              <p className='font-semibold text-lg'>Ứng viên</p>
              {chosenEvent.candidates.map((item, index) =>
                <div className={`items-center my-5 p-3 border-1 dark:border-white rounded-full cursor-pointer flex flex-row justify-between`} key={index} onClick={() => {
                  setChosenCandidate(item);
                  setCandidateInfo(true);
                }}>
                  {item.name}
                  <span>Số phiếu: {BigInt(item.voteCount).toString()}</span>
                </div>)}
            </div>
          </div>
        </div>
      ) : ''}
      {candidate && candidateInfo ? (
        <div className='bg-half-transparent w-screen fixed nav-item top-0 right-0 overflow-auto'>
          <div className='float-right h-screen dark:text-gray-200 bg-white dark:bg-[#484b52] w-400'>
            <div className='flex justify-between items-center p-4 ml-4'>
              <p className='font-semibold text-xl'>Thông tin ứng viên</p>
              <button type='button' onClick={() => setCandidateInfo(false)} style={{ color: 'rgb(153,171,180)', borderRadius: '50%' }}
                className='text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray'>
                <MdOutlineCancel />
              </button>
            </div>
            <div className='flex-col border-t-1 border-color p-4 ml-4'>
              <p className='font-semibold text-lg'>Thông tin cơ bản</p>
              <p>Tên ứng viên: {candidate.info.displayName}</p>
              <p>Email: {candidate.info.email}</p>
              <p>Tổng lượt ưa thích: {calcTotalLike(candidate.ownEvent)}</p>
            </div>
            <div className='flex-col border-t-1 border-color p-4 bg-white dark:bg-[#484b52] ml-4'>
              <p className='font-semibold text-lg'>Các sự kiện của ứng viên</p>
              {candidate.ownEvent.map((event, index) => (
                <NavLink key={index} 
                to={`/event/${event.type}/detail/${event.id}`}
                className='items-center my-5 p-3 border-1 dark:border-white rounded-full cursor-pointer flex flex-row justify-between'>
                  {event.data.title}
                  <span>{event.data.amount}</span>
                </NavLink>
              ))}
            </div>
            <div className='bg-white dark:bg-[#484b52] flex items-center justify-center'>
              <Button color='white' bgColor={currentColor} text='Bình chọn' borderRadius='10px' size='md'
                customFunction={() =>{
                  vote(chosenCandidate._candidateIndex, chosenEvent.id);
                }} />
            </div>
          </div>
        </div>
      ) : ''}
    </div>
  )
}

export default VoteUser