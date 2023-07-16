import React from 'react';
import { Navbar } from '../../components';
import { PrizeManagement } from '../../components';
import { LotteryProvider } from '../../controller/LotteryProvider';

const PrizeManagementPage = () => {
    return (
        <div>
            <Navbar />
            <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
                <LotteryProvider>
                    <PrizeManagement />
                </LotteryProvider>
            </div>
        </div>
    )
}

export default PrizeManagementPage