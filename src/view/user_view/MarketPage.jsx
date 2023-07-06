import React from 'react';
import { Market, Navbar } from '../../components';

const MarketPage = () => {
  return (
    <div>
      <Navbar />
      <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
        <Market />
      </div>
    </div>
  )
}

export default MarketPage