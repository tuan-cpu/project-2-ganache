import React from 'react';
import { Auction, Navbar } from '../../components';
import { AuctionProvider } from '../../controller/AuctionProvider';

const AuctionPage = () => {
  return (
    <div>
      <div><Navbar /></div>
      <div>
        <AuctionProvider>
          <Auction />
        </AuctionProvider>
      </div>
    </div>
  )
}

export default AuctionPage