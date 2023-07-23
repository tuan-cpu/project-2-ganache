import React, { useEffect } from 'react';
import { useAuctionContext } from '../../controller/AuctionProvider';
import { AuctionItem, Header } from '..';
import { useDataContext } from '../../controller/DataProvider';

const Auction = () => {
  const { allItems, getAllItems } = useAuctionContext();
  const { getAllMarketItems } = useDataContext();
  const getDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date;
  }
  useEffect(() => {
    getAllItems();
    getAllMarketItems("auction");
  }, []);
  return (
    <div className='m-4 md:m-10 mt-24 p-10 gap-[10px]'>
      <Header category="Chợ" title='Đấu giá từ thiện' />
      <div className='pt-[20px]'>
        <p className='text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white'>Đang đấu giá</p>
        <div className='flex flex-wrap'>
          {allItems.toString() != [].toString() && allItems.map((item, index) => {
            return (
              <div key={index}>
                {
                  getDate(BigInt(item.auctionEndTime).toString()) > Date.now() &&
                  <AuctionItem id={parseInt(item.id, 16)} itemsIndex={index}
                    highestBid={parseFloat(item.highestBid, 16)}
                    endTime={item.auctionEndTime} disabled={false} />
                }
              </div>
            )
          }
          )}
        </div>
      </div>
    </div>
  )
}

export default Auction