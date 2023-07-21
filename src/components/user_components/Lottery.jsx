import React, { useEffect, useState } from 'react';
import { Header } from '..';
import { useLotteryContext } from '../../controller/LotteryProvider';
import { useAuthContext } from '../../controller/AuthProvider';
import { useDataContext } from '../../controller/DataProvider';
import { useStateContext } from '../../controller/ContextProvider';
import { useNavigate } from 'react-router-dom';

const button = document.getElementById('lotteryButton');

button?.addEventListener('click', () => {
    button.disabled = true; // Disable the button
    setTimeout(() => {
        button.disabled = false; // Enable the button after 5 minutes
    }, 5 * 60 * 1000); // 5 minutes in milliseconds
});

const Lottery = () => {
    const { user } = useAuthContext();
    const { currentColor } = useStateContext();
    const { createCoupon, getPools, pools, newCoupon } = useLotteryContext();
    const { getAllMarketItems, savedLotteryItems } = useDataContext();
    const navigate = useNavigate();
    const [allPools, setAllPools] = useState([]);
    const [selectedPoolID, setSelectedPoolID] = useState();
    const [selectedPool, setSelectedPool] = useState();
    const [selectedPoolItems, setSelectedPoolItems] = useState([]);
    const [showPool, setShowPool] = useState(false);
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        if (!authToken) navigate('/login')
        else getPools();
    }, []);
    useEffect(() => {
        for (let i = 0; i < pools.length; i++) {
            let pool_id = parseInt(BigInt(pools[i].id).toString());
            let entry_value = parseInt(BigInt(pools[i].entry_value).toString()) / 10 ** 18;
            let rates = [];
            for (let j = 0; j < pools[i].rates.length; j++) {
                rates.push(parseInt(BigInt(pools[i].rates[j]).toString()));
            }
            let items = []
            for (let j = 0; j < pools[i].items.length; j++) {
                items.push(parseInt(BigInt(pools[i].items[j]).toString()));
            }
            if (!allPools.some(item => item.pool_id === pool_id))
                setAllPools((prev) => [...prev, {
                    pool_id: pool_id,
                    entry_value: entry_value,
                    rates: rates,
                    items: items
                }])
        }
    }, [pools])
    useEffect(() => {
        setSelectedPool(allPools[selectedPoolID]);
    }, [selectedPoolID]);
    useEffect(() => {
        getAllMarketItems('lottery');
    }, [selectedPool]);
    useEffect(() => {
        let temp_array = [];
        if (savedLotteryItems.toString() != [].toString() && selectedPool) {
            for (let i = 0; i < selectedPool.items.length; i++) {
                let item = savedLotteryItems.filter(obj => obj.id === selectedPool.items[i])[0];
                temp_array.push({
                    name: item.data.name,
                    describe: item.data.describe,
                    image: item.data.image,
                    price: item.data.price,
                    rate: selectedPool.rates[i]
                });
            }
        }
        setSelectedPoolItems(temp_array);
    }, [savedLotteryItems])
    useEffect(() => {
        if (selectedPoolItems.toString() !== [].toString()) setShowPool(true);
    }, [selectedPoolItems])
    useEffect(() => {
        if(newCoupon) alert(selectedPoolItems[newCoupon.group].describe);
    }, [newCoupon])
    return (
        <div className='m-4 md:m-10 mt-24 p-10 gap-[10px]'>
            <Header category="Khác" title='Rút thăm may mắn' />
            <div className=' flex flex-wrap justify-between items-center'>
                <div className='flex flex-wrap gap-[10px]'>
                    <select id='Pool ID' onChange={(e) => setSelectedPoolID(e.target.value)}>
                        <option selected disabled>Chọn 1 pool</option>
                        {allPools?.map((pool, index) => <option key={index} value={index}>{pool?.pool_id}</option>)}
                    </select>
                </div>
                {showPool ? (
                    <div className='py-4'>
                        <button type='button' id='lotteryButton'
                            style={{ backgroundColor: currentColor, color: 'white', borderRadius: '10px' }}
                            className={'text-md p-3 hover:drop-shadow-xl disabled:hidden'} onClick={() => {
                                createCoupon(user.id, selectedPoolID, selectedPool.entry_value);
                                alert('Làm lạnh 5 phút')
                            }} >
                            Quay
                        </button>
                    </div>
                ) : ''}
            </div>
            {showPool ? (
                <div className='grid md:grid-cols-2 grid-cols-1 p-4 m-4'>
                    {selectedPoolItems.map((item, index) =>
                    (
                        <div className="rounded-lg shadow-lg white-glassmorphism max-w-sm flex flex-row p-4 hover:border-green-400" key={index}>
                            <img className="rounded-t-lg" src={item.image} alt="" width={100} height={100} />
                            <div className='p-4 flex flex-col'>
                                <div className="w-100 flex-col flex dark:text-white">
                                    <div>
                                        <h6 className='text-xs'>Tên sản phẩm</h6>
                                        <p className='text-sm'>{item.name}</p>
                                    </div>
                                    <div>
                                        <h6 className='text-xs'>Giá</h6>
                                        <p className='text-sm'>{item.price} ETH</p>
                                    </div>
                                    <div>
                                        <h6 className='text-xs'>Tỉ lệ</h6>
                                        <p className='text-sm'>{item.rate} %</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    )}
                </div>
            ) : ''}
        </div>
    )
}

export default Lottery