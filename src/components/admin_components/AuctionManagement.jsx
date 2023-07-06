import React, { useState, useEffect } from 'react';
import { useAuctionContext } from '../../controller/AuctionProvider';
import { Button, Header, AuctionItem } from '..';
import { useStateContext } from '../../controller/ContextProvider';

const AuctionManagement = () => {
  const { addItem, getAllItems, allItems } = useAuctionContext();
  const { currentColor } = useStateContext();
  const [itemInfo, setItemInfo] = useState({
    id: 0,
    auctionEndTime: 1000
  });
  useEffect(() => {
    getAllItems();
  }, [])
  const handleChange = (e, name) => {
    setItemInfo((prevState) => ({ ...prevState, [name]: e.target.value }));
  };
  const getDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date;
  }
  const getTotal = () => {
    let sum = 0;
    for (let i in allItems) {
      sum += parseFloat(allItems[i].highestBid, 16) || 0
    }
    return sum / 10 ** 18;
  }
  return (
    <div className='flex flex-col'>
      <Header category="Market" title='Auction management' />
      <div className='flex flex-wrap gap-[10px]'>
        <input
          placeholder='Item ID'
          type='number'
          onChange={(e) => handleChange(e, 'id')}
        />
        <input
          placeholder='Duration'
          type='number'
          onChange={(e) => handleChange(e, 'auctionEndTime')}
        />
        <Button color='white' bgColor={currentColor}
          text='Add item'
          borderRadius='10px' size='md' customFunction={() => addItem(itemInfo.id, itemInfo.auctionEndTime)} />
      </div>
      <div className='pt-[20px]'>
        <p className='text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white'>Tổng tài sản đấu giá được: {getTotal()} ETH</p>
      </div>
      <div className='pt-[20px]'>
        <p className='text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white'>Đang đấu giá</p>
        <div className='flex flex-wrap'>
          {allItems.map((item, index) => {
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
      <div className='pt-[20px]'>
        <p className='text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white'>Đã bán</p>
        <div className='flex flex-wrap'>
          {allItems.map((item, index) => {
            return (
              <div key={index}>
                {
                  parseFloat(item.highestBid, 16)?
                  <AuctionItem id={parseInt(item.id, 16)} itemsIndex={index}
                    highestBid={parseFloat(item.highestBid, 16)}
                    endTime={item.auctionEndTime} disabled={true} />:''
                }
              </div>
            )
          }
          )}
        </div>
      </div>
      <div className='pt-[20px]'>
        <p className='text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white'>Tồn kho</p>
        <div className='flex flex-wrap'>
          {allItems.map((item, index) => {
            return (
              <div key={index}>
                {
                  !parseFloat(item.highestBid, 16)?
                  <AuctionItem id={parseInt(item.id, 16)} itemsIndex={index}
                    highestBid={parseFloat(item.highestBid, 16)}
                    endTime={item.auctionEndTime} disabled={true} />:''
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

export default AuctionManagement