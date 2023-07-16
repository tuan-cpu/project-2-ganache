import React from 'react';
import { Button, Header } from '..';
import { useLotteryContext } from '../../controller/LotteryProvider';
import { useStateContext } from '../../controller/ContextProvider';
import { useAuthContext } from '../../controller/AuthProvider';

const PrizeManagement = () => {
    const { createCoupon } = useLotteryContext();
    const { currentColor } = useStateContext();
    const { user } = useAuthContext();
    return (
        <div>
            <Header category="Lottery" title='Lottery management' />
            <Button color='white' bgColor={currentColor} text='Create coupon' borderRadius='10px' size='md' customFunction={() => createCoupon(user.id)} />
        </div>
    )
}

export default PrizeManagement