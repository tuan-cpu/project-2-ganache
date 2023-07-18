import React, { useState, useEffect } from 'react';
import { Header, Button } from '..';
import { useDataContext } from '../../controller/DataProvider';
import { useStateContext } from '../../controller/ContextProvider';
import { MdOutlineCancel } from 'react-icons/md';

const MarketManagement = () => {
  const { orders, getAllOrder, uploadMarketImages, createNewMarketItem, completeNewMarketItem } = useDataContext();
  const { currentColor } = useStateContext();
  const [newItemCardShow, setNewItemCardShow] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    image: '',
    price: 0,
    items_per_pack: 0,
    donated_percentage: 0,
    describe: '',
  })
  const [newFile, setNewFile] = useState('');
  useEffect(()=>{
    getAllOrder();
  },[]);
  const getTotalValue = (array) =>{
    let sum = 0;
    for(let i in array){
      sum += array[i].data.total
    };
    return sum;
  }
  const getTotalDonated = (array) =>{
    let sum = 0;
    for(let i in array){
      let newArray = array[i].data.item;
      for(let j in newArray){
        sum += newArray[j].item.data.price * parseInt(newArray[j].quantity) * (newArray[j].item.data.donated_percentage || 1 )
      }
    }
    return sum;
  }
  const [newDocID, setNewDocId] = useState('');
  const handleSubmit = async (data, type) => {
    let result = await createNewMarketItem(data, type);
    setNewDocId(result.toString());
  }
  const [newDocImageUrl, setNewDocImageUrl] = useState('');
  useEffect(() => {
    const uploadNewMarketItemImage = async () => {
      let result = await uploadMarketImages(newDocID, newFile, "market");
      setNewDocImageUrl(result);
    };
    if (newFile) uploadNewMarketItemImage();
  }, [newDocID])
  useEffect(() => {
    completeNewMarketItem(newDocImageUrl, newDocID, "market");
    setNewItemCardShow(false);
  }, [newDocImageUrl])
  return (
    <div className='flex flex-col'>
      <Header category="Market" title='Market management' />
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
                  onChange={(e) => setNewItem((prev) => ({ ...prev, price: e.target.value }))}
                  placeholder='Giá sản phẩm'
                />
              </div>
              <div className="mt-2">
                <input
                  className="my-2 w-full rounded-sm p-2 outline-none bg-transparent dark:text-white dark:border-white text-sm"
                  type="number"
                  name="items_per_pack"
                  onChange={(e) => setNewItem((prev) => ({ ...prev, items_per_pack: e.target.value }))}
                  placeholder='Số sản phẩm / 1 đơn vị giá cả'
                />
              </div>
              <div className="mt-2">
                <input
                  className="my-2 w-full rounded-sm p-2 outline-none bg-transparent dark:text-white dark:border-white text-sm"
                  type="number"
                  name="donated_percentage"
                  onChange={(e) => setNewItem((prev) => ({ ...prev, donated_percentage: e.target.value }))}
                  placeholder='Tỉ lệ quyên góp'
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
                customFunction={() => handleSubmit(newItem, "market")} />
            </div>
          </div>
        </div>
      ) : ''}
      <p className='text-xl dark:text-white font-bold'>
        Tổng giá trị hàng hóa: {getTotalValue(orders).toPrecision(4)} ETH
      </p>
      <p className='text-xl dark:text-white font-bold'>
        Tổng tài sản quyên góp: {getTotalDonated(orders).toPrecision(4)} ETH
      </p>
    </div>
  )
}

export default MarketManagement