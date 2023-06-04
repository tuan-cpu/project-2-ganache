import React from 'react';
import { List, Navbar } from '../../components';

const ListPage = () => {
  return (
    <div>
      <Navbar />
      <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
        <List />
      </div>
    </div>
  )
}

export default ListPage