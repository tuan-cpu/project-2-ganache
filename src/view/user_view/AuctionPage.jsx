import React from 'react';
import { Auction, Navbar } from '../../components';

const AuctionPage = () => {
  return (
    <div>
      <div className='gradient-bg-welcome'><Navbar/></div>
      <Auction/>
    </div>
  )
}

export default AuctionPage