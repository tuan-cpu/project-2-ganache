import React, { useEffect, useCallback } from 'react';
import { Header, Loader } from '..';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStateContext } from '../../controller/ContextProvider';
import { useDataContext } from '../../controller/DataProvider';

const ItemCard = ({ item, color, handleFunc, cartItems }) => (
  <motion.div
    layout animate={{ opacity: 1 }}
    initial={{ opacity: 0 }}
    exit={{ opacity: 0 }}
    className="rounded-lg shadow-lg white-glassmorphism max-w-sm">
    <img className="rounded-t-lg" src={item.data.image} alt="" />
    <div className='p-4'>
      <div className="w-100 flex-wrap flex items-center justify-between dark:text-white">
        <div>
          <h6 className='text-xs'>Tên sản phẩm</h6>
          <p className='text-sm'>{item.data.name}</p>
        </div>

        <div>
          <h6 className='text-xs'>Giá hiện tại</h6>
          <p className='text-sm'>{item.data.price} ETH/{item.data.items_per_pack} sản phẩm</p>
        </div>
      </div>
    </div>
    {item.data.donated_percentage != 1?
    <div className='px-4'>
      <h6 className='text-xs'>Phần trăm quyên góp</h6>
      <p className='text-sm'>{item.data.donated_percentage*100} %</p>
    </div>:''}
    <div className='m-3'>
      <button type='button'
      disabled={cartItems.some(cartItem=>cartItem.id === item.id)} 
      style={{backgroundColor:cartItems.some(cartItem=>cartItem.id === item.id) ? '#8e9291': color, color: 'white', borderRadius: '10px'}}
      className='text-lg p-3 hover:drop-shadow-xl w-full' onClick={handleFunc}>
        Thêm vào giỏ hàng
      </button>
    </div>
  </motion.div>
)

const Market = () => {
  const { getAllMarketItems, savedMarketItems } = useDataContext();
  const { currentColor } = useStateContext();
  const [cartItems, setCartItems] = useState([]);
  const [fullyDonatedItems, setFullyDonatedItems] = useState([]);
  const [partiallyDonatedItems, setPartiallyDonatedItems] = useState([]);
  const [fullyFiltered, setFullyFiltered] = useState([]);
  const [partiallyFiltered, setPartiallyFiltered] = useState([]);
  useEffect(()=>{
    getAllMarketItems("market");
  },[])
  useEffect(()=>{
    let result = [];
    for (let i in cartItems) {
      result.push({ item: cartItems[i], quantity: 0 })
    }
    if(JSON.stringify(cartItems) !== JSON.stringify([])){
      localStorage.setItem('myCart', JSON.stringify(result));
    }
  },[cartItems])
  const handleSearchInput = useCallback((input)=>{
    if (input !== "") {
      const fully_filtered = fullyDonatedItems.filter((item) => item.data.name.includes(input));
      const partially_filtered = partiallyDonatedItems.filter((item) => item.data.name.includes(input));
      setFullyFiltered(fully_filtered);
      setPartiallyFiltered(partially_filtered);
    }else{
      setFullyFiltered(fullyDonatedItems);
      setPartiallyFiltered(partiallyDonatedItems);
    }
  },[])
  useEffect(()=>{
    let fully = [];
    let partially = [];
    for(let i in savedMarketItems){
      if(savedMarketItems[i].data.donated_percentage == 1) fully.push(savedMarketItems[i]);
      else partially.push(savedMarketItems[i]);
    }
    setFullyDonatedItems(fully);
    setPartiallyDonatedItems(partially);
    setFullyFiltered(fully);
    setPartiallyFiltered(partially);
  },[savedMarketItems])
  return ( fullyDonatedItems && partiallyDonatedItems?
    <div className='flex flex-col'>
      <div className='flex flex-wrap items-center justify-between'>
        <Header category="Chợ" title='Mua sắm gây quỹ' />
        <input
          type='text'
          placeholder='Tìm kiếm...'
          onChange={(e) => handleSearchInput(e.target.value)}
        />
      </div>
      <div className='p-[10px]'>
        <div className='flex justify-between items-center'>
          <p className='text-xl font-extrabold tracking-tight text-slate-900 dark:text-white'>Nhóm hàng hoàn toàn từ thiện</p>
        </div>
        <motion.div className='flex flex-wrap justify-between gap-2 items-center'>
          <AnimatePresence>
            {fullyFiltered.map((item, index) => <ItemCard item={item} color={currentColor} key={index} handleFunc={()=>setCartItems(prevCart => [...prevCart, item])} cartItems={cartItems}/>)}
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
            {partiallyFiltered.map((item, index) => <ItemCard item={item} color={currentColor} key={index} handleFunc={()=>setCartItems(prevCart => [...prevCart, item])} cartItems={cartItems}/>)}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>: <Loader/>
  )
}

export default Market