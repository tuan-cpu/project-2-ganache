import React from 'react';
import { Navbar, VoteManagement } from '../../components';
import { VotingProvider } from '../../controller/VotingProvider';

const VoteManagementPage = () => {
  return (
    <div>
      <Navbar />
      <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
        <VotingProvider>
          <VoteManagement />
        </VotingProvider>
      </div>
    </div>
  )
}

export default VoteManagementPage