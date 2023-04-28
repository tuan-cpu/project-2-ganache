import React, { useContext } from 'react';
import { Button, Header } from '../../components';
import { TransactionContext } from '../../context/TransactionContext';
import { useStateContext } from '../../context/ContextProvider';
const VoteManagement = () => {
  const { addVotingEvent, addCandidate, vote } = useContext(TransactionContext);
  const { currentColor } = useStateContext();
  return (
    <div>
      <Header category="Vote" title='Vote management' />
      <Button color='white' bgColor={currentColor} text='Tạo sự kiện' borderRadius='10px' size='md' customFunction={() =>
        addVotingEvent('Test 2', 120)} />
      <Button color='white' bgColor={currentColor} text='Tạo candidate' borderRadius='10px' size='md' customFunction={() =>
        addCandidate('Test candidate', 0)} />
      <Button color='white' bgColor={currentColor} text='Vote' borderRadius='10px' size='md' customFunction={() =>
        vote(0, 0)} />
    </div>
  )
}

export default VoteManagement