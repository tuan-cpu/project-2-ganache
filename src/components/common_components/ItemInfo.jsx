import React, { useEffect, useState } from 'react';
import { Header, Slideshow } from '..';
import { useDataContext } from '../../controller/DataProvider';
import { useTransactionContext } from '../../controller/TransactionProvider';
import { useStateContext } from '../../controller/ContextProvider';
import { useAuctionContext } from '../../controller/AuctionProvider';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ItemInfo = () => {
    const { savedAuctionItems } = useDataContext();
    const { id } = useParams();
    const { currentColor } = useStateContext();
    const { bid } = useAuctionContext();
    const { currentAddress } = useTransactionContext();
    const [bidAmount, setBidAmount] = useState(0);
    const [showBid, setShowBid] = useState(false);
    const [images, setImages] = useState([]);
    useEffect(() => {
        const imagesRef = () => {
            let result = [];
            if (savedAuctionItems[id]) {
                result.push(savedAuctionItems[id]?.data.image);
                for (let i in savedAuctionItems[id]?.data.images_ref) {
                    result.push(savedAuctionItems[id]?.data.images_ref[i]);
                }
                setImages(result);
            }
        }
        imagesRef();
    }, [])
    return (
        <div className='flex flex-col'>
            <Header category="Market" title={savedAuctionItems[id]?.data.name} />
            <div className='flex flex-wrap justify-between'>
                <div>
                    <div className="relative w-full lg:col-span-2">
                        <Slideshow images={images} interval={3000} />
                    </div>
                </div>
                <div className='grid grid-cols-1 items-center justify-items-center'>
                    <p className="text-red-500  text-3xl">1 ETH</p>
                    <div className='flex flex-col items-center'>
                        {showBid &&
                            <input
                                className='flex items-center gap-1 py-[4px] px-[20px] mt-[10px]'
                                placeholder='Your bid'
                                type='number'
                                onChange={(e) => setBidAmount(e.target.value)}
                            />}
                        <button
                            className="flex items-center gap-1 py-[4px] px-[20px] hover:drop-shadow-xl dark:text-white mt-[10px] border-1"
                            style={{ backgroundColor: currentColor, borderRadius: '10px' }}
                            onClick={() => {
                                // if (showBid){
                                //     if(bidAmount < savedAuctionItems[id].data.lowestPrice || bidAmount <= highestBid/10**18) 
                                //     toast.error('Không thể đặt giá thấp hơn hiện tại!')
                                //     else bid(itemsIndex,bidAmount, currentAddress);
                                // }
                                // else setShowBid(!showBid);
                                setShowBid(!showBid);
                            }}
                        >
                            Đấu giá
                        </button>
                    </div>
                </div>
            </div>
            <div className="lg:col-span-2 dark:text-white">
                <div className="inline-flex justify-center items-center w-full">
                    <hr className="mb-[20px] w-full h-px bg-gray-200 border-0 dark:bg-gray-700" />
                </div>
                <section className="max-w-[1240px] mx-auto">
                    <header className="font-semibold text-4xl pb-[20px]">Mô tả sản phẩm</header>
                    <p>
                        <span className="dark:text-slate-400">{savedAuctionItems[id]?.data.describe}</span>
                    </p>
                </section>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ItemInfo