import React from 'react';
import { Cart, Navbar } from '../../components';

const CartPage = () => {
  return (
    <div>
        <Navbar/>
        <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
          <Cart />
      </div>
    </div>
  )
}

export default CartPage