import React, { useState, useEffect } from 'react';
import { useAuctionContext } from '../../controller/AuctionProvider';
import { Button, Header, AuctionItem } from '..';
import { useStateContext } from '../../controller/ContextProvider';
import { MdOutlineCancel } from 'react-icons/md';

const AuctionManagement = () => {
  const { addItem, getAllItems, allItems } = useAuctionContext();
  const { currentColor } = useStateContext();
  const [itemInfo, setItemInfo] = useState({
    id: 0,
    auctionEndTime: 1000
  });
  const [newItemCardShow, setNewItemCardShow] = useState(false);
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
      <div className='py-4'>
        <Button color='white' bgColor={currentColor}
          text='Thêm sản phẩm vào cơ sở dữ liệu'
          borderRadius='10px' size='md' customFunction={() => setNewItemCardShow(true)} />
      </div>
      {newItemCardShow ? (
          <div className='bg-half-transparent w-screen fixed nav-item top-0 right-0'>
            <div className='float-right h-screen dark:text-gray-200 bg-white dark:bg-[#484b52] w-400'>
              <div className='flex justify-between items-center p-4 ml-4'>
                <p className='font-semibold text-xl'>Thêm sản phẩm</p>
                <button type='button' onClick={() => setNewItemCardShow(false)} style={{ color: 'rgb(153,171,180)', borderRadius: '50%' }}
                  className='text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray'>
                  <MdOutlineCancel />
                </button>
              </div>
              <div className='flex-col border-t-1 border-color p-4 ml-4'>
                <p className='font-semibold text-lg'>Thông tin sản phẩm</p>
                <div className="mt-4">
                  <input
                    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent dark:text-white dark:border-white text-sm"
                    type="text"
                    name="image"
                    onChange={(e) => {}}
                    placeholder='Tên sản phẩm'
                  />
                </div>
                <div className="mt-4 flex flex-wrap">
                  <label>Hình ảnh sản phẩm</label>
                  <input
                    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent dark:text-white dark:border-white text-sm"
                    type="file"
                    name="name"
                    onChange={(e) => {}}
                  />
                </div>
                <div className="mt-2">
                  <input
                    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent dark:text-white dark:border-white text-sm"
                    type="number"
                    name="lowestPrice"
                    onChange={(e) => {}}
                    placeholder='Giá thấp nhất'
                  />
                </div>
                <div className="mt-2">
                  <input
                    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent dark:text-white dark:border-white text-sm"
                    type="number"
                    name="step"
                    onChange={(e) => {}}
                    placeholder='Nhảy giá thấp nhất'
                  />
                </div>
                <div className='mt-2'>
                  <textarea placeholder="Mô tả sản phẩm" name="story" className="text-white bg-transparent border-1 w-full"
                    onChange={(e) =>{}}
                  />
                </div>
              </div>
              <div className='flex-col border-t-1 border-color p-4 ml-4'>
                <Button color='white' bgColor={currentColor} text='Thêm sản phẩm' borderRadius='10px' size='md' customFunction={() => {}} />
              </div>
            </div>
          </div>
        ) : ''}
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
          text='Thêm sản phẩm đấu giá'
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
                  parseFloat(item.highestBid, 16) ?
                    <AuctionItem id={parseInt(item.id, 16)} itemsIndex={index}
                      highestBid={parseFloat(item.highestBid, 16)}
                      endTime={item.auctionEndTime} disabled={true} /> : ''
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
                  !parseFloat(item.highestBid, 16) ?
                    <AuctionItem id={parseInt(item.id, 16)} itemsIndex={index}
                      highestBid={parseFloat(item.highestBid, 16)}
                      endTime={item.auctionEndTime} disabled={true} /> : ''
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