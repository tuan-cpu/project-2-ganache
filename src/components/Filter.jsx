import { useEffect } from "react";
import tags from '../utils/tags.js';
const Filter = ({events,setFiltered,activeButton,setActiveButton,setInput}) =>{
    useEffect(() => {
        if(activeButton === "All") {
            setFiltered(events);
            return;
        }
        const filtered = events.filter((event)=> event.data.tag.includes(activeButton));
        setFiltered(filtered);
        setInput("");
    }, [activeButton]);
    return(
        <div className="flex flex-wrap gap-[10px]">
            {tags.map((tag)=><button key={tag.id} onClick={() => setActiveButton(tag.name)} className={`text-white mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:${tag.color} flex ${activeButton === "All"?"bg-slate-800":""}`}>{tag.name}</button>)}
        </div>
    )
}

export default Filter;