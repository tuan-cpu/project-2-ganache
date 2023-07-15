import { motion } from 'framer-motion';
import { useStateContext } from '../../controller/ContextProvider';
import { useAuctionContext } from '../../controller/AuctionProvider';
import { useTransactionContext } from '../../controller/TransactionProvider';
import { useDataContext } from '../../controller/DataProvider';
import { useState, useEffect } from 'react';
import { Loader } from '..';

const AuctionItem = ({ id, highestBid, endTime, itemsIndex, disabled }) => {
    const { currentColor } = useStateContext();
    const { bid } = useAuctionContext();
    const { currentAddress } = useTransactionContext();
    const { savedAuctionItems, updateAuctionItem } = useDataContext();
    useEffect(()=>{
        if(Date.now() > endTime && savedAuctionItems[id]?.data.available && highestBid != 0) updateAuctionItem(id.toString());
    },[])
    const getDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const dateString = date.toLocaleString();
        return dateString;
    }
    const [bidAmount, setBidAmount] = useState(0);
    const [showBid, setShowBid] = useState(false);
    return (
        savedAuctionItems[id]?
        <motion.div
            layout animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-lg shadow-lg white-glassmorphism max-w-sm"
        >
            <img className="rounded-t-lg" src={savedAuctionItems[id].data.image} alt="" />
            <div className="p-4">
                <div className="w-100 flex-wrap flex items-center justify-between dark:text-white">
                    <div>
                        <h6 className='text-xs'>Tên sản phẩm</h6>
                        <p className='text-sm'>{savedAuctionItems[id].data.name}</p>
                    </div>

                    <div>
                        <h6 className='text-xs'>Giá hiện tại</h6>
                        <p className='text-sm'>{highestBid/10**18 || savedAuctionItems[id].data.lowestPrice} ETH</p>
                    </div>
                </div>
                <div className='dark:text-white'>
                    <h6 className='text-xs'>Thời gian kết thúc</h6>
                    <p className='text-sm'>{getDate(BigInt(endTime).toString())}</p>
                </div>
                <div className='flex flex-wrap justify-between items-center'>
                    {showBid && 
                    <input
                    className='flex items-center gap-1 py-[4px] px-[20px] mt-[10px]'
                        placeholder='Your bid'
                        type='number'
                        onChange={(e) => setBidAmount(e.target.value)}
                    />}
                    <button
                        disabled={disabled}
                        style={{ backgroundColor: !disabled?currentColor: '#8e9291', borderRadius: '10px' }}
                        className="flex items-center gap-1 py-[4px] px-[20px] hover:drop-shadow-xl text-white mt-[10px]"
                        onClick={() => {
                            if (showBid){
                                if(bidAmount < savedAuctionItems[id].data.lowestPrice || bidAmount <= highestBid/10**18) alert('Không thể đặt giá thấp hơn hiện tại!')
                                else bid(itemsIndex,bidAmount, currentAddress);
                            }
                            else setShowBid(!showBid);
                        }}
                    >
                        Đấu giá
                    </button>
                </div>
            </div>
        </motion.div>: <Loader/>
    )
}

export default AuctionItem