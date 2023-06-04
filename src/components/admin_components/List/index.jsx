import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Header, DataGrid } from '../../../components';
import { useDataContext } from '../../../controller/DataProvider';
import { adminsGrid, usersGrid, eventsGrid } from './datagrid.js';
import EventList from './EventList';


const List = () => {
    let { type } = useParams();
    const { admins, users, events, getAllEvents, getAllUsers } = useDataContext();
    useEffect(() => {
        getAllUsers();
        getAllEvents();
    }, []);
    return (
        <div>
            <Header category="List" title={type} />
            {type === 'event' && <EventList data={events} grid={eventsGrid}/>}
            {type === 'user' && <DataGrid data={users} grid={usersGrid} editing={true} deleting={true}/>}
            {type === 'admin' && <DataGrid data={admins} grid={adminsGrid} editing={true} deleting={true}/>}
        </div>
    )
}

export default List