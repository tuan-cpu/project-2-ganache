import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../../components';
import DataGrid from './DataGrid.jsx';
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
                <DataGrid data={events} grid={eventsGrid} />
            ) : (
                <>
                    {type === 'user' ? <DataGrid data={users} grid={usersGrid}/> : <DataGrid data={admins} grid={adminsGrid}/>}
                </>
            )}
        </div>
    )
}

export default List