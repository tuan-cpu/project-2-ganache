import React, { useState } from 'react';
import { Header } from '..';
import { useEffect } from 'react';
import { useStateContext } from '../../controller/ContextProvider';
import { useDataContext } from '../../controller/DataProvider';
import { useTransactionContext } from '../../controller/TransactionProvider';
import { middle_man } from '../../common/utils/constants';
import { AiFillPlayCircle } from 'react-icons/ai';
import { MdOutlineCancel } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const { currentColor } = useStateContext();
  const { createOrder } = useDataContext();
  const { setFormData, sendTransaction, formData, currentAccount, connectWallet } = useTransactionContext();
  const [cartItems, setCartItems] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [order, setOrder] = useState({
    item: [],
    name: '',
    address: '',
    phone: '',
    total: 0
  })
  const [confirm, setConfirm] = useState(false);
  const [paid,setPaid] = useState(false);
  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem('myCart'));
    setCartItems(cart);
  }, [])
  useEffect(() => {
    const getTotal = () => {
      let sum = 0;
      for (let i in cartItems) {
        sum += cartItems[i].quantity * cartItems[i].item.data.price
      }
      return sum;
    }
    setTotalValue(getTotal);
  }, [cartItems])
  const handleSubmit = () => {
    sendTransaction(formData, handlePaid);
  }
  const handlePaid = () => {
    setPaid(true);
  }
  useEffect(() => {
    if(confirm){
      handleSubmit();
    }
  }, [confirm])
  useEffect(()=>{
    if(paid) {
      createOrder(order);
      toast.success('Thanh toán thành công!');
      setCartItems([]);
    }
  },[paid])
  useEffect(()=>{
    localStorage.setItem('myCart',JSON.stringify(cartItems));
  },[cartItems])
  return (
    <div>
      <Header category='Chợ' title='Giỏ hàng' />
      <div className='flex flex-row justify-between items-start'>
        <div className='flex flex-wrap'>
          {cartItems.map((item, index) => (
            <div className="rounded-lg shadow-lg white-glassmorphism max-w-sm flex flex-row p-4" key={index}>
              <img className="rounded-t-lg" src={item.item.data.image} alt="" width={100} height={100} />
              <div className='p-4 flex flex-col'>
                <div className="w-100 flex-wrap flex items-center justify-between dark:text-white">
                  <div>
                    <h6 className='text-xs'>Tên sản phẩm</h6>
                    <p className='text-sm'>{item.item.data.name}</p>
                  </div>
                  <div>
                    <h6 className='text-xs'>Giá hiện tại</h6>
                    <p className='text-sm'>{item.item.data.price} ETH/{item.item.data.items_per_pack} sản phẩm</p>
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
              <button className='cursor-pointer flex items-start' onClick={()=>{
                setCartItems(prevArray => prevArray.filter((_, i) => i !== index));
              }}>
                <MdOutlineCancel size={30}/>
              </button>
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
            <input type='text' name='name' placeholder='Họ tên người nhận' onChange={(e) => setOrder((prevState) => ({ ...prevState, name: e.target.value }))} />
            <input type='text' name='address' placeholder='Địa chỉ' onChange={(e) => setOrder((prevState) => ({ ...prevState, address: e.target.value }))} />
            <input type='text' name='phone' placeholder='Số ĐT' onChange={(e) => setOrder((prevState) => ({ ...prevState, phone: e.target.value }))} />
          </div>

          {currentAccount ? (
            <div className='m-3'>
              <button type='button' style={{ backgroundColor: currentColor, color: 'white', borderRadius: '10px' }}
                className='text-lg p-3 hover:drop-shadow-xl w-full' onClick={() => {
                  setOrder((prevState) => ({ ...prevState, item: cartItems, total: totalValue }));
                  setFormData({ addressTo: middle_man, amount: totalValue.toString(), keyword: "order", message: "paid" });
                  setConfirm(true);
                }}>
                Thanh toán
              </button>
            </div>) : (
            <button
              type="button"
              onClick={connectWallet}
              className=" items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle size={25} color="#fff" className="float-left" />
              <p className="text-white text-base font-semibold">Connect Wallet</p>
            </button>)}
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Cart