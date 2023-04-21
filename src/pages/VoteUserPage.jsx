import React from 'react';
import { Navbar, VoteUser } from '../components';

const VoteUserPage = () => {
  return (
    <div>
      <div className='gradient-bg-welcome'><Navbar/></div>
      <VoteUser/>
    </div>
  )
}

export default VoteUserPage