import React, { useContext } from 'react';
import { Button, Navbar } from '../../components';
import { TransactionContext } from '../../controller/TransactionContext';
import { useStateContext } from '../../controller/ContextProvider';

const PrizeManagementPage = () => {
    const { createCoupon } = useContext(TransactionContext);
    const { currentColor } = useStateContext();
    return (
        <div>
            <Navbar />
            <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
                <Button color='white' bgColor={currentColor} text='Create coupon' borderRadius='10px' size='md' customFunction={() => createCoupon()} />
            </div>
        </div>
    )
}

export default PrizeManagementPage