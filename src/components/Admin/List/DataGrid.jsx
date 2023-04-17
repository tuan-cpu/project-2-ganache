import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Search, Inject, Toolbar } from '@syncfusion/ej2-react-grids';


const DataGrid = ({ data, grid }) => {
    return (
        <div>
            {data && data.map((item, index) => <div key={index}>{item.id}</div>)}
            <GridComponent
                dataSource={data}
                allowPaging
                allowSorting
                width='auto'>
                <ColumnsDirective>
                    {grid.map((item, index) => (
                        <ColumnDirective key={index} {...item} />
                    ))}
                </ColumnsDirective>
                <Inject services={[Page, Toolbar, Selection, Search]} />
            </GridComponent>
        </div>
    )
}

export default DataGrid