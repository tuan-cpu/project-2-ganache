import React, { useState } from 'react';
import { Header } from '..';
import { useEffect } from 'react';
import { useStateContext } from '../../controller/ContextProvider';

const Cart = () => {
  const { currentColor } = useStateContext();
  const [cartItems, setCartItems] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem('myCart'));
    let result = [];
    for (let i in cart) {
      result.push({ item: cart[i], quantity: 0 })
    }
    setCartItems(result);
  }, [])
  useEffect(() => {
    const getTotal = () => {
      let sum = 0;
      for (let i in cartItems) {
        sum += cartItems[i].quantity * cartItems[i].item.price
      }
      return sum;
    }
    setTotalValue(getTotal);
  }, [cartItems])
  return (
    <div>
      <Header category='Chợ' title='Giỏ hàng' />
      <div className='flex flex-row justify-between items-start'>
        <div className='flex flex-wrap'>
          {cartItems.map((item, index) => (
            <div className="rounded-lg shadow-lg white-glassmorphism max-w-sm flex flex-row p-4" key={index}>
              <img className="rounded-t-lg" src={item.item.image} alt="" width={100} height={100} />
              <div className='p-4 flex flex-col'>
                <div className="w-100 flex-wrap flex items-center justify-between dark:text-white">
                  <div>
                    <h6 className='text-xs'>Tên sản phẩm</h6>
                    <p className='text-sm'>{item.item.name}</p>
                  </div>
                  <div>
                    <h6 className='text-xs'>Giá hiện tại</h6>
                    <p className='text-sm'>{item.item.price} ETH/{item.item.items_per_pack} sản phẩm</p>
                  </div>
                </div>
                <div className='flex flex-row justify-between items-center'>
                  Số lượng
                  <input type='number' className='rounded-lg w-1/2' defaultValue={0}
                    onChange={(e) => {
                      let newCart = [...cartItems];
                      newCart[index] = { ...newCart[index], ...{ quantity: e.target.value } };
                      setCartItems(newCart);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='rounded-lg shadow-lg white-glassmorphism max-w-sm flex flex-col p-4'>
          <div className='flex flex-col justify-between items-center'>
            <p className='text-lg font-bold'>Tổng giá trị đơn hàng</p>
            <p>{totalValue} ETH</p>
          </div>
          <div className='flex flex-col justify-between items-center p-4 gap-1'>
            <p className='text-lg font-bold'>Thông tin giao hàng</p>
            <input type='text' placeholder='Họ tên người nhận' />
            <input type='text' placeholder='Địa chỉ' />
            <input type='text' placeholder='Số ĐT' />
          </div>
          <div className='m-3'>
            <button type='button' style={{ backgroundColor: currentColor, color: 'white', borderRadius: '10px' }}
              className='text-lg p-3 hover:drop-shadow-xl w-full' onClick={()=>{}}>
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart