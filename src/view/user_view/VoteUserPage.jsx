import React from 'react';
import { Navbar, VoteUser } from '../../components';
import { VotingProvider } from '../../controller/VotingProvider';

const VoteUserPage = () => {
  return (
    <div>
      <div className='gradient-bg-welcome'><Navbar/></div>
      <VotingProvider>
        <VoteUser/>
      </VotingProvider>
    </div>
  )
}

export default VoteUserPage