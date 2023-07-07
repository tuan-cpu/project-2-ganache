import React from 'react';
import { Header } from '..';
import { useDataContext } from '../../controller/DataProvider';
import { useEffect } from 'react';

const MarketManagement = () => {
  const { orders, getAllOrder } = useDataContext();
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
        sum += newArray[j].item.price * parseInt(newArray[j].quantity) * (newArray[j].item.donated_percentage || 1 )
      }
    }
    return sum;
  }
  return (
    <div className='flex flex-col'>
      <Header category="Market" title='Market management' />
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