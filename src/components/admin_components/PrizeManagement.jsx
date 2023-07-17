import React, { useEffect, useState } from 'react';
import { Button, Header } from '..';
import { useLotteryContext } from '../../controller/LotteryProvider';
import { useStateContext } from '../../controller/ContextProvider';
import { useAuthContext } from '../../controller/AuthProvider';
import { calculatePoolProportion } from '../../common/utils/lotteryPool';

const test_data = [
    {name: 'item_1', price: 0},
    {name: 'item_2', price: 0.01},
    {name: 'item_3', price: 0.05},
    {name: 'item_4', price: 0.1},
    {name: 'item_5', price: 0.15},
    {name: 'item_6', price: 0.17},
    {name: 'item_7', price: 0.21},
    {name: 'item_8', price: 0.3},
    {name: 'item_9', price: 0.67}
]

const PrizeManagement = () => {
    const { createCoupon } = useLotteryContext();
    const { currentColor } = useStateContext();
    const { user } = useAuthContext();
    const [initValue, setInitValue] = useState(0)
    const [itemGroup, setItemGroup] = useState(9);
    const [poolSize, setPoolSize] = useState(100);
    const [prizePool, setPrizePool] = useState([]);
    const [proportionArray, setProportionArray] = useState([]);
    useEffect(()=>{
        let { proportion_array, initial_value } = calculatePoolProportion({items_array: test_data})
        setProportionArray(proportion_array);
        setInitValue(initial_value.toFixed(3));
    },[])
    useEffect(()=>{
        let prize_pool = [];
        for(let i =0;i<proportionArray.length;i++){
            prize_pool.push(Math.round(proportionArray[i]*poolSize))
        }
        setPrizePool(prize_pool);
        // let total_price = 0;
        // for(let i=0; i<prize_pool.length;i++){
        //     total_price += prize_pool[i]*test_data[i].price
        // }
        // console.log(total_price.toFixed(2));
        // console.log(initValue);
    },[proportionArray, initValue])
    return (
        <div>
            <Header category="Lottery" title='Lottery management' />
            <Button color='white' bgColor={currentColor} text='Create coupon' borderRadius='10px' size='md' customFunction={() => createCoupon(user.id)} />
        </div>
    )
}

export default PrizeManagement