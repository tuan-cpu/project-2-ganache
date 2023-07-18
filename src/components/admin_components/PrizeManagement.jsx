import React, { useEffect, useState } from 'react';
import { Button, Header } from '..';
import { useLotteryContext } from '../../controller/LotteryProvider';
import { useStateContext } from '../../controller/ContextProvider';
import { useAuthContext } from '../../controller/AuthProvider';
import { calculatePoolProportion } from '../../common/utils/lotteryPool';
import { useDataContext } from '../../controller/DataProvider';
import { MdOutlineCancel } from 'react-icons/md';


const PrizeManagement = () => {
    const { addPrize, getPools, getCouponList } = useLotteryContext();
    const { currentColor } = useStateContext();
    const { getAllMarketItems, uploadMarketImages, createNewMarketItem, completeNewMarketItem, savedLotteryItems } = useDataContext();
    const { user } = useAuthContext();
    const [initValue, setInitValue] = useState(0)
    const poolSize = 100;
    const [selectedItems, setSelectedItems] = useState([]);
    const [confirmSelected, setConfirmSelected] = useState(false);
    const [confirmLottery, setConfirmLottery] = useState(false);
    const [prizePool, setPrizePool] = useState([]);
    const [resultArray, setResultArray] = useState([]);
    const [newItem, setNewItem] = useState({
        name: '',
        describe: '',
        price: 0,
        image: ''
    })
    const [newFile, setNewFile] = useState('');
    const [newItemCardShow, setNewItemCardShow] = useState(false);
    const [allItemsShow, setAllItemsShow] = useState(false);
    const [showResult, setShowResult] = useState(false);
    useEffect(() => {
        if (confirmSelected && selectedItems.toString() != [].toString()) {
            let { result_array, initial_value } = calculatePoolProportion({ items_array: selectedItems })
            setResultArray(result_array);
            setInitValue(initial_value.toFixed(3) * (10 ** 18));
        }
    }, [confirmSelected])
    useEffect(() => {
        let prize_pool = [];
        for (let i = 0; i < resultArray.length; i++) {
            prize_pool.push({ item: resultArray[i].item, proportion: Math.round(resultArray[i].proportion * poolSize) })
        }
        setPrizePool(prize_pool);
    }, [resultArray, initValue])
    useEffect(() => {
        let input_proportions = [];
        let input_items = [];
        for (let i = 0; i < prizePool.length; i++) {
            input_items.push(prizePool[i].item.id);
            input_proportions.push(prizePool[i].proportion);
        }
        addPrize(input_proportions, input_items, initValue);
    }, [confirmLottery]);
    const [newDocID, setNewDocId] = useState('');
    const handleSubmit = async (type) => {
        let result = await createNewMarketItem(newItem, type);
        setNewDocId(result.toString());
    }
    const [newDocImageUrl, setNewDocImageUrl] = useState('');
    useEffect(() => {
        const uploadNewMarketItemImage = async () => {
            let result = await uploadMarketImages(newDocID, newFile, "lottery");
            setNewDocImageUrl(result);
        };
        if (newFile) uploadNewMarketItemImage();
    }, [newDocID])
    useEffect(() => {
        completeNewMarketItem(newDocImageUrl, newDocID, "lottery");
        setNewItemCardShow(false);
    }, [newDocImageUrl])
    return (
        <div>
            <Header category="Lottery" title='Lottery management' />
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
                                    name="name"
                                    onChange={(e) => setNewItem((prev) => ({ ...prev, name: e.target.value }))}
                                    placeholder='Tên sản phẩm'
                                />
                            </div>
                            <div className="mt-4 flex flex-wrap">
                                <label>Hình ảnh sản phẩm</label>
                                <input
                                    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent dark:text-white dark:border-white text-sm"
                                    type="file"
                                    name="image"
                                    onChange={(e) => setNewFile(e.target.files[0])}
                                />
                            </div>
                            <div className="mt-2">
                                <input
                                    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent dark:text-white dark:border-white text-sm"
                                    type="number"
                                    name="price"
                                    onChange={(e) => setNewItem((prev) => ({ ...prev, price: parseFloat(e.target.value) }))}
                                    placeholder='Giá'
                                />
                            </div>
                            <div className='mt-2'>
                                <textarea placeholder="Mô tả sản phẩm" name="describe" className="bg-transparent border-1 w-full"
                                    onChange={(e) => setNewItem((prev) => ({ ...prev, describe: e.target.value }))}
                                />
                            </div>
                        </div>
                        <div className='flex-col border-t-1 border-color p-4 ml-4'>
                            <Button color='white' bgColor={currentColor} text='Thêm sản phẩm' borderRadius='10px' size='md'
                                customFunction={() => {
                                    handleSubmit("lottery");
                                    setNewItemCardShow(false);
                                }} />
                        </div>
                    </div>
                </div>
            ) : ''}
            <div className='flex flex-wrap justify-between items-center'>
                <div className='py-4'>
                    <Button color='white' bgColor={currentColor}
                        text='Hiển thị các sản phẩm hiện có'
                        borderRadius='10px' size='md' customFunction={() => {
                            setAllItemsShow(true);
                            getAllMarketItems('lottery');
                        }} />
                </div>
                {allItemsShow && !showResult ? (
                    <div className='py-4'>
                        <Button color='white' bgColor={currentColor}
                            text='Xác nhận lựa chọn'
                            borderRadius='10px' size='md' customFunction={() => {
                                setConfirmSelected(true);
                                setShowResult(true);
                            }} />
                    </div>
                ) : ''}
                {showResult ? (
                    <div className='py-4'>
                        <Button color='white' bgColor={currentColor}
                            text='Xác nhận lựa chọn'
                            borderRadius='10px' size='md' customFunction={() => {
                                setConfirmLottery(true);
                            }} />
                    </div>
                ) : ''}
            </div>
            {allItemsShow && !showResult ? (
                <div className='grid md:grid-cols-2 grid-cols-1'>
                    {savedLotteryItems.map((item, index) => (
                        <div
                            onClick={() => {
                                if (!selectedItems.some(obj => obj.id === item.id)) {
                                    setSelectedItems((prev) => [...prev, item]);
                                }
                                else {
                                    let temp_array = selectedItems.filter(obj => obj.id !== item.id);
                                    setSelectedItems(temp_array);
                                }
                            }}
                            className='cursor-pointer' key={index}>
                            <div className="rounded-lg shadow-lg white-glassmorphism max-w-sm flex flex-row p-4 hover:border-green-400"
                                style={{ borderColor: selectedItems.some(obj => obj.id === item.id) ? 'green' : '' }}>
                                <img className="rounded-t-lg" src={item.data.image} alt="" width={100} height={100} />
                                <div className='p-4 flex flex-col'>
                                    <div className="w-100 flex-col flex dark:text-white">
                                        <div>
                                            <h6 className='text-xs'>Tên sản phẩm</h6>
                                            <p className='text-sm'>{item.data.name}</p>
                                        </div>
                                        <div>
                                            <h6 className='text-xs'>Giá</h6>
                                            <p className='text-sm'>{item.data.price} ETH</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    )}
                </div>
            ) : ''}
            {showResult ? (
                <div className='grid md:grid-cols-2 grid-cols-1'>
                    {prizePool.map((item, index) => (
                        <div key={index}>
                            <div className="rounded-lg shadow-lg white-glassmorphism max-w-sm flex flex-row p-4 hover:border-green-400">
                                <img className="rounded-t-lg" src={item.item.data.image} alt="" width={100} height={100} />
                                <div className='p-4 flex flex-col'>
                                    <div className="w-100 flex-col flex dark:text-white">
                                        <div>
                                            <h6 className='text-xs'>Tên sản phẩm</h6>
                                            <p className='text-sm'>{item.item.data.name}</p>
                                        </div>
                                        <div>
                                            <h6 className='text-xs'>Giá</h6>
                                            <p className='text-sm'>{item.item.data.price} ETH</p>
                                        </div>
                                        <div>
                                            <h6 className='text-xs'>Tỉ lệ</h6>
                                            <p className='text-sm'>{item.proportion} %</p>
                                        </div>
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

export default PrizeManagement