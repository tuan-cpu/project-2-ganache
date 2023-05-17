import React from 'react';
import DataGrid from '../../DataGrid';
import PieChart from '../../charts/Pie';
const EventList = ({ data, grid }) => {
    const getValue = (tag) => {
        let value = 0;
        for (let i in data) {
            if (data[i].tag === tag) value += data[i].amount;
        }
        return value;
    }
    const getTotalValue = () =>{
        let value = 0;
        for (let i in data) {
            value += data[i].amount;
        };
        return value;
    }
    const pieChartData = [
        { x: 'Giáo dục', y: getValue("Giáo dục"), text: getValue("Giáo dục")},
        { x: "Y tế", y: getValue("Y tế"), text: getValue("Y tế")},
        { x: "Cộng đồng", y: getValue("Cộng đồng"), text: getValue("Cộng đồng") },
        { x: "Môi trường", y: getValue("Môi trường"), text: getValue("Môi trường") },
        { x: "Tài chính", y: getValue("Tài chính"), text: getValue("Tài chính") },
        { x: "Nhân đạo", y: getValue("Nhân đạo"), text: getValue("Nhân đạo")},
        { x: "Cuộc sống", y: getValue("Cuộc sống"), text: getValue("Cuộc sống")},
        { x: "Thể thao", y: getValue("Thể thao"), text: getValue("Thể thao")}
    ];
    return (
        <div className='flex flex-wrap'>
            <DataGrid data={data} grid={grid} editing={true} deleting={true} />
            <PieChart id="chart-pie" data={pieChartData} legendVisibility height="full" />
        </div>
    )
}

export default EventList