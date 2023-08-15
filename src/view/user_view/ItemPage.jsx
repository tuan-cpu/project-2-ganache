import React from 'react';
import { ItemInfo, Navbar } from '../../components';
import { AuctionProvider } from '../../controller/AuctionProvider';

const ItemPage = () => {
  return (
    <div>
      <Navbar />
      <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
        <AuctionProvider>
          <ItemInfo />
        </AuctionProvider>
      </div>
    </div>
  )
}

export default ItemPage