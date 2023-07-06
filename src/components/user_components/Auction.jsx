import React, { useEffect } from 'react';
import { useAuctionContext } from '../../controller/AuctionProvider';
import { AuctionItem } from '..';

const Auction = () => {
  const { allItems, getAllItems } = useAuctionContext();
  const getDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date;
  }
  useEffect(()=>{
    getAllItems();
  },[]);
  return (
    <div className='m-4 md:m-10 mt-24 p-10 gap-[10px]'>
        <p className='text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white'>Live auction</p>
        <div className='flex flex-wrap'>
          {allItems.map((item, index) => {
            return (
              <div key={index}>
                {
                  getDate(BigInt(item.auctionEndTime).toString()) > Date.now() &&
                  <AuctionItem id={parseInt(item.id, 16)} itemsIndex={index}
                    highestBid={parseFloat(item.highestBid, 16)}
                    endTime={item.auctionEndTime} disabled={false}/>
                }
              </div>
            )
          }
          )}
        </div>
        <p className='text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white'>Ended auction</p>
        <div className='flex flex-wrap'>
          {allItems.map((item, index) => {
            return (
              <div key={index}>
                {
                  getDate(BigInt(item.auctionEndTime).toString()) < Date.now() &&
                  <AuctionItem id={parseInt(item.id, 16)} itemsIndex={index}
                    highestBid={parseFloat(item.highestBid, 16)}
                    endTime={item.auctionEndTime} disabled={true}/>
                }
              </div>
            )
          }
          )}
        </div>
    </div>
  )
}

export default Auction