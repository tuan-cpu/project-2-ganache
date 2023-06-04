import React from 'react';
import { AdminCreateEventForm, Navbar } from '../../components';

const AdminCreateEventPage = () => {
  return (
    <div>
      <Navbar />
      <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
        <AdminCreateEventForm />
      </div>
    </div>
  )
}

export default AdminCreateEventPage