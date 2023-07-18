import React from 'react';
import { Lottery, Navbar } from '../../components';
import { LotteryProvider } from '../../controller/LotteryProvider';

const LotteryPage = () => {
  return (
    <div>
      <div><Navbar /></div>
      <div>
        <LotteryProvider>
          <Lottery />
        </LotteryProvider>
      </div>
    </div>
  )
}

export default LotteryPage