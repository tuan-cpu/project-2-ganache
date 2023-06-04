import React from 'react';
import { Navbar, Other } from '../../../components'

const OtherPage = () => {
  return (
    <div>
      <Navbar />
      <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
        <Other />
      </div>
    </div>
  )
}

export default OtherPage
