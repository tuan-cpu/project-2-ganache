import React, { useEffect, useState } from 'react';
import { adminsGrid } from './datagrid';
import { useDataContext } from '../../../context/DataProvider';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Search, Inject, Toolbar } from '@syncfusion/ej2-react-grids';

const EventList = () => {
    const { events, getAllEvents } = useDataContext();
    const [data, setData] = useState();
    useEffect(() => {
        getAllEvents();
        setData(events);
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

export default EventList