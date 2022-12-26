import { useEffect } from "react";
import { MdPets, MdSportsBasketball, MdHome } from "react-icons/md";
import { GiHealthCapsule } from "react-icons/gi";
import { TbDisabled2 } from "react-icons/tb";
import { BiBookBookmark } from "react-icons/bi";
import { FaParachuteBox } from "react-icons/fa";
import { IoColorPaletteOutline } from "react-icons/io5";
const Filter = ({events,setFiltered,activeButton,setActiveButton,setInput}) =>{
    useEffect(() => {
        if(activeButton === "All") {
            setFiltered(events);
            return;
        }
        const filtered = events.filter((event)=> event.tag.includes(activeButton));
        setFiltered(filtered);
        setInput("");
    }, [activeButton]);
    return(
        <div className="flex flex-wrap gap-[10px]">
            <button onClick={() => setActiveButton("All")} className={`text-white mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-slate-800 flex ${activeButton === "All"?"bg-slate-800":""}`}>All</button>
            <button onClick={() => setActiveButton("Animals and pets")} className={`text-white mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-red-800 flex ${activeButton === "Animals and pets"?"bg-red-800":""}`}><span><MdPets fontSize={21} color="fff"/></span>Animals and pets</button>
            <button onClick={() => setActiveButton("Art and culture")} className={`text-white mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-orange-800 flex ${activeButton === "Art and culture"?"bg-orange-800":""}`}><span><IoColorPaletteOutline fontSize={21} color="#fff"/></span>Art and culture</button>
            <button onClick={() => setActiveButton("Education")} className={`text-white mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-amber-800 flex ${activeButton === "Education"?"bg-amber-800":""}`}><span><BiBookBookmark fontSize={21} color="fff"/></span>Education</button>
            <button onClick={() => setActiveButton("International aid")} className={`text-white mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-yellow-800 flex ${activeButton === "International aid"?"bg-yellow-800":""}`}><span><FaParachuteBox fontSize={21} color="#fff"/></span>International aid</button>
            <button onClick={() => setActiveButton("Disability")} className={`text-white mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-lime-800 flex ${activeButton === "Disability"?"bg-lime-800":""}`}><span><TbDisabled2 fontSize={21} color="#fff"/></span>Disability</button>
            <button onClick={() => setActiveButton("Local community")} className={`text-white mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-green-800 flex ${activeButton === "Local community"?"bg-green-800":""}`}><span><MdHome fontSize={21} color="#fff"/></span>Local community</button>
            <button onClick={() => setActiveButton("Sports")} className={`text-white mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-teal-800 flex ${activeButton === "Sports"?"bg-teal-800":""}`}><span><MdSportsBasketball fontSize={21} color="#fff"/></span>Sports</button>
            <button onClick={() => setActiveButton("Health and medical")} className={`text-white mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-cyan-800 flex ${activeButton === "Health and medical"?"bg-cyan-800":""}`}><span><GiHealthCapsule fontSize={21} color="#fff"/></span>Health and medical</button>
        </div>
    )
}

export default Filter;