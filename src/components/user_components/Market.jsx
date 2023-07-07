import React, { useEffect } from 'react';
import { Header } from '..';
import { useState } from 'react';
import { fully_donated_items, partially_donated_items } from '../../common/utils/data';
import { motion, AnimatePresence } from 'framer-motion';
import { useStateContext } from '../../controller/ContextProvider';

const ItemCard = ({ item, color, handleFunc }) => (
  <motion.div
    layout animate={{ opacity: 1 }}
    initial={{ opacity: 0 }}
    exit={{ opacity: 0 }}
    className="rounded-lg shadow-lg white-glassmorphism max-w-sm">
    <img className="rounded-t-lg" src={item.image} alt="" />
    <div className='p-4'>
      <div className="w-100 flex-wrap flex items-center justify-between dark:text-white">
        <div>
          <h6 className='text-xs'>Tên sản phẩm</h6>
          <p className='text-sm'>{item.name}</p>
        </div>

        <div>
          <h6 className='text-xs'>Giá hiện tại</h6>
          <p className='text-sm'>{item.price} ETH/{item.items_per_pack} sản phẩm</p>
        </div>
      </div>
    </div>
    {item.donated_percentage?
    <div className='px-4'>
      <h6 className='text-xs'>Phần trăm quyên góp</h6>
      <p className='text-sm'>{item.donated_percentage*100} %</p>
    </div>:''}
    <div className='m-3'>
      <button type='button' style={{backgroundColor:color, color: 'white', borderRadius: '10px'}}
      className='text-lg p-3 hover:drop-shadow-xl w-full' onClick={handleFunc}>
        Thêm vào giỏ hàng
      </button>
    </div>
  </motion.div>
)

const Market = () => {
  const [cartItems, setCartItems] = useState([]);
  useEffect(()=>{
    let result = [];
    for (let i in cartItems) {
      result.push({ item: cartItems[i], quantity: 0 })
    }
    if(JSON.stringify(cartItems) !== JSON.stringify([]))localStorage.setItem('myCart', JSON.stringify(result));
  },[cartItems])
  const [input, setInput] = useState('');
  const [fullyDonatedItems, setFullyDonatedItems] = useState(fully_donated_items);
  const [partiallyDonatedItems, setPartiallyDonatedItems] = useState(partially_donated_items)
  const { currentColor } = useStateContext();
  return (
    <div className='flex flex-col'>
      <div className='flex flex-wrap items-center justify-between'>
        <Header category="Chợ" title='Mua sắm gây quỹ' />
        <input
          type='text'
          placeholder='Tìm kiếm...'
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className='p-[10px]'>
        <div className='flex justify-between items-center'>
          <p className='text-xl font-extrabold tracking-tight text-slate-900 dark:text-white'>Nhóm hàng hoàn toàn từ thiện</p>
          <p className='dark:text-white'>Hiển thị thêm</p>
        </div>
        <motion.div className='flex flex-wrap justify-between gap-2 items-center'>
          <AnimatePresence>
            {fullyDonatedItems.map((item, index) => <ItemCard item={item} color={currentColor} key={index} handleFunc={()=>setCartItems(prevCart => [...prevCart, item])}/>)}
          </AnimatePresence>
        </motion.div>
      </div>
      <div className='p-[10px]'>
        <div className='flex justify-between items-center'>
          <p className='text-xl font-extrabold tracking-tight text-slate-900 dark:text-white'>Nhóm hàng từ thiện 1 phần</p>
          <p className='dark:text-white'>Hiển thị thêm</p>
        </div>
        <motion.div layout className='flex flex-wrap justify-between gap-2 items-center'>
          <AnimatePresence>
            {partiallyDonatedItems.map((item, index) => <ItemCard item={item} color={currentColor} key={index} handleFunc={()=>setCartItems(prevCart => [...prevCart, item])}/>)}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default Market