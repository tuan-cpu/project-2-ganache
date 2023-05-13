import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Header, DataGrid } from '../../../components';
import { useDataContext } from '../../../context/DataProvider';
import { adminsGrid, usersGrid, eventsGrid } from './datagrid.js';


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
            {type === 'event' ? (
                <DataGrid data={events} grid={eventsGrid} editing={true} deleting={true} />
            ) : (
                <>
                    {type === 'user' ? <DataGrid data={users} grid={usersGrid} editing={true} deleting={true}/> : 
                    <DataGrid data={admins} grid={adminsGrid} editing={true} deleting={true}/>}
                </>
            )}
        </div>
    )
}

export default List