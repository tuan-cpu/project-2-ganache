import React, { useEffect, useState } from 'react';
import { adminsGrid } from './datagrid';
import { useDataContext } from '../../../context/DataProvider';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Search, Inject, Toolbar } from '@syncfusion/ej2-react-grids';

const AdminList = () => {
    const { admins, getAllUsers } = useDataContext();
    const [data, setData] = useState();
    useEffect(() => {
        getAllUsers();
        setData(admins);
    }, []);
    useEffect(() => {
        if(data) console.log(data);
    }, [data]);
    return (
        <div>
            {data && data.map((item,index)=><div>{item.id}</div>)}
        </div>
    )
}

export default AdminList