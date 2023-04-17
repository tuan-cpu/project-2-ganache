import React, { useEffect, useState } from 'react';
import { usersGrid } from './datagrid';
import { useDataContext } from '../../../context/DataProvider';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

const UserList = () => {
  const { users, getAllUsers } = useDataContext();
  const [data, setData] = useState();
  useEffect(() => {
    getAllUsers();
    setData(users);
  }, []);
  return (
    <div>
      {data && data.map((item,index)=><div>{item.id}</div>)}
    </div>
  )
}

export default UserList