import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

const DataGrid = ({ data, grid, editing, deleting }) => {
    return (
        <div>
            <GridComponent
                dataSource={data}
                allowPaging
                allowSorting
                toolbar={[deleting?'Delete':'']}
                editSettings={{ allowDeleting: deleting, allowEditing: editing }}
                width='auto'>
                <ColumnsDirective>
                    {grid.map((item, index) => (
                        <ColumnDirective key={index} {...item} />
                    ))}
                </ColumnsDirective>
                <Inject services={[Page, Toolbar, Selection, Edit, Sort, Filter]} />
            </GridComponent>
        </div>
    )
}

export default DataGrid