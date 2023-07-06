import React from 'react'
import { AuctionManagement, Navbar } from '../../components';
import { AuctionProvider } from '../../controller/AuctionProvider';

const AuctionManagementPage = () => {
  return (
    <div>
      <Navbar />
      <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
        <AuctionProvider>
          <AuctionManagement />
        </AuctionProvider>
      </div>
    </div>
  )
}

export default AuctionManagementPage