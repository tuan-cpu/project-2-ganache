import React from 'react'
import { Navbar, VerifyUserCheck } from '../../../components'

const VerifyUserApprove = () => {
  return (
    <div>
      <Navbar />
      <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
        <VerifyUserCheck />
      </div>
    </div>
  )
}

export default VerifyUserApprove