import React, { useContext, useState } from 'react';
import { Button, Header } from '../../components';
import { TransactionContext } from '../../context/TransactionContext';
import { useStateContext } from '../../context/ContextProvider';
import { MdOutlineCancel } from 'react-icons/md';
const VoteManagement = () => {
  const { addVotingEvent, addCandidate, vote, votingEvents, getAllVotingEvents } = useContext(TransactionContext);
  const { currentColor } = useStateContext();
  const [addEventCard, setAddEventCard] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDuration, setEventDuration] = useState(0);
  const [infoEventCard, setInfoEventCard] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState();
  const [addNewCandidate, setAddNewCandidate] = useState(false);
  const [newCandidateName, setNewCandidateName] = useState('');
  const [newCandidateID, setNewCandidateID] = useState('');
  const getDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const dateString = date.toLocaleString();
    return dateString;
  }
  return (
    <div className=' flex flex-col'>
      <Header category="Vote" title='Vote management' />
      <div className='w-fit'>
        <Button color='white' bgColor={currentColor} text='Tạo sự kiện' borderRadius='10px' size='md' customFunction={() => setAddEventCard(true)} />
        {addEventCard ? (
          <div className='bg-half-transparent w-screen fixed nav-item top-0 right-0'>
            <div className='float-right h-screen dark:text-gray-200 bg-white dark:bg-[#484b52] w-400'>
              <div className='flex justify-between items-center p-4 ml-4'>
                <p className='font-semibold text-xl'>Add Voting Event</p>
                <button type='button' onClick={() => setAddEventCard(false)} style={{ color: 'rgb(153,171,180)', borderRadius: '50%' }}
                  className='text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray'>
                  <MdOutlineCancel />
                </button>
              </div>
              <div className='flex-col border-t-1 border-color p-4 ml-4'>
                <p className='font-semibold text-lg'>Event Info</p>
                <div className="mt-4">
                  <input
                    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent dark:text-white dark:border-white text-sm"
                    type="text"
                    name="name"
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder='Voting event name'
                  />
                </div>
                <div className="mt-2">
                  <input
                    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent dark:text-white dark:border-white text-sm"
                    type="number"
                    name="theme"
                    onChange={(e) => setEventDuration(e.target.value)}
                    placeholder='Duration (in minute)'
                  />
                </div>
              </div>
              <div className='flex-col border-t-1 border-color p-4 ml-4'>
                <Button color='white' bgColor={currentColor} text='Tạo sự kiện' borderRadius='10px' size='md' customFunction={() => {
                  addVotingEvent(eventName, eventDuration)
                }} />
              </div>
            </div>
          </div>
        ) : ''}
      </div>
      <div className='mt-4 flex gap-[10px] w-fit flex-wrap'>
        <Button color='white' bgColor={currentColor} text='Danh sách sự kiện' borderRadius='10px' size='md' customFunction={() => getAllVotingEvents()} />
        {votingEvents ? (
          <select
            id='event'
            onChange={(e) => {
              setSelectedEvent(e.target.value);
              setInfoEventCard(true);
            }}
          >
            <option selected disabled>Chọn 1 sự kiện</option>
            {votingEvents.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
        ) : ''}
      </div>
      {selectedEvent && infoEventCard ? (
        <div className='bg-half-transparent w-screen fixed nav-item top-0 right-0'>
          <div className='float-right h-screen dark:text-gray-200 bg-white dark:bg-[#484b52] w-400'>
            <div className='flex justify-between items-center p-4 ml-4'>
              <p className='font-semibold text-xl'>Thông tin sự kiện</p>
              <button type='button' onClick={() => setInfoEventCard(false)} style={{ color: 'rgb(153,171,180)', borderRadius: '50%' }}
                className='text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray'>
                <MdOutlineCancel />
              </button>
            </div>
            <div className='flex-col border-t-1 border-color p-4 ml-4'>
              <p className='font-semibold text-lg'>Thông tin cơ bản</p>
              <p>Tên sự kiện: {votingEvents[selectedEvent - 1].name}</p>
              <p>ID: {parseInt(votingEvents[selectedEvent - 1].id, 16)}</p>
              <p>Thời gian bắt đầu: {getDate(BigInt(votingEvents[selectedEvent - 1].votingStart).toString())}</p>
              <p>Thời gian kết thúc: {getDate(BigInt(votingEvents[selectedEvent - 1].votingEnd).toString())}</p>
            </div>
            <div className='flex-col border-t-1 border-color p-4 ml-4'>
              <p className='font-semibold text-lg'>Ứng viên</p>
              {votingEvents[selectedEvent - 1].candidates.map((item, index) => <p key={index}>{item._userIndex}</p>)}

            </div>
            <div className='flex-col border-t-1 border-color p-4 ml-4'>
              <Button color='white' bgColor={currentColor} text='Tạo ứng viên' borderRadius='10px' size='md' customFunction={() =>
                setAddNewCandidate(true)} />
              {addNewCandidate ? (
                <div className='flex-col border-t-1 border-color'>
                  <p className='font-semibold text-lg'>Thông tin ứng viên</p>
                  <div className="mt-4">
                    <input
                      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent dark:text-white dark:border-white text-sm"
                      type="text"
                      onChange={(e) => setNewCandidateName(e.target.value)}
                      placeholder='Tên ứng viên'
                    />
                  </div>
                  <div className="mt-2">
                    <input
                      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent dark:text-white dark:border-white text-sm"
                      type="text"
                      onChange={(e) => setNewCandidateID(e.target.value)}
                      placeholder='ID'
                    />
                  </div>
                  <Button color='white' bgColor={currentColor} text='Thêm ứng viên' borderRadius='10px' size='md' customFunction={() =>
                    addCandidate(newCandidateName, newCandidateID, selectedEvent.id)} />
                </div>
              ) : ''}
            </div>
          </div>
        </div>
      ) : ''}
    </div>
  )
}

export default VoteManagement