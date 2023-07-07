import React from 'react';
import { Navbar, MarketManagement } from '../../components'; 

const MarketManagementPage = () => {
  return (
    <div>
      <Navbar/>
      <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
        <MarketManagement />
      </div>
    </div>
  )
}

export default MarketManagementPage