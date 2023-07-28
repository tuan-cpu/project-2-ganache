import { useEffect } from "react";
const Filter = ({events,setFiltered,activeButton,setActiveButton}) =>{
    useEffect(() => {
        if(activeButton === "All") {
            setFiltered(events);
            return;
        }
        const filtered = events.filter((event)=> event.tag.includes(activeButton));
        setFiltered(filtered);
    }, [activeButton]);
    return(
        <div className="flex flex-wrap gap-[10px]">
        <button onClick={() => setActiveButton("All")} className={`text-white mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-slate-800 flex ${activeButton === "All"?"bg-slate-800":""}`}>Tất cả</button>
        <button onClick={() => setActiveButton("Giáo dục")} className={`text-white mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-red-800 flex ${activeButton === "Giáo dục"?"bg-red-800":""}`}>Giáo dục</button>
        <button onClick={() => setActiveButton("Y tế")} className={`text-white mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-orange-800 flex ${activeButton === "Y tế"?"bg-orange-800":""}`}>Y tế</button>
        <button onClick={() => setActiveButton("Môi trường")} className={`text-white mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-amber-800 flex ${activeButton === "Môi trường"?"bg-amber-800":""}`}>Môi trường</button>
        <button onClick={() => setActiveButton("Cộng đồng")} className={`text-white mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-yellow-800 flex ${activeButton === "Cộng đồng"?"bg-yellow-800":""}`}>Cộng đồng</button>
        <button onClick={() => setActiveButton("Tài chính")} className={`text-white mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-lime-800 flex ${activeButton === "Tài chính"?"bg-lime-800":""}`}>Tài chính</button>
        <button onClick={() => setActiveButton("Thể thao")} className={`text-white mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-green-800 flex ${activeButton === "Thể thao"?"bg-green-800":""}`}>Thể thao</button>
        <button onClick={() => setActiveButton("Nhân đạo")} className={`text-white mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-teal-800 flex ${activeButton === "Nhân đạo"?"bg-teal-800":""}`}>Nhân đạo</button>
        <button onClick={() => setActiveButton("Cuộc sống")} className={`text-white mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-cyan-800 flex ${activeButton === "Cuộc sống"?"bg-cyan-800":""}`}>Cuộc sống</button>
    </div>
    )
}

export default Filter;