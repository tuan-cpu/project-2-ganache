import { useState, useEffect } from "react";
import { allStates } from "../utils/state";
import { City }  from 'country-state-city';
const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        name={name}
        onChange={(e) => handleChange(e, name)}
        value={value}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-white text-sm white-glassmorphism"
        required
    />
)
const CreateEvent = () => {
    const [userInfoShow, setUserInfoShow] = useState(true);
    const [eventInfoShow, setEventInfoShow] = useState(false);
    const [chosenState,setChosenState] = useState();
    const [allCities,setAllCities] = useState();
    const [chosenCity,setChosenCity] = useState();
    useEffect(() => {
        setAllCities(City.getCitiesOfState("VN",chosenState));
    }, [chosenState]);
    return (
        <div className="gradient-bg-transactions grid grid-cols-2 p-5 gap-[10px] min-h-screen">
            {userInfoShow ?
                <div className="flex flex-col">
                    <p className="text-bold text-3xl text-white">User Info</p>
                    <Input placeholder='Name' name='name' type='text' handleChange={()=>{}} />
                    <Input placeholder='Wallet Address' name='wallet' type='text' handleChange={()=>{}} />
                    <button
                        type="button"
                        onClick={() => {
                            // setUserInfoShow(false);
                            setEventInfoShow(true);
                        }}
                        className="text-white mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-red-600">
                        Next</button>
                </div> : ''}
            {eventInfoShow ?
                <div className="flex flex-col">
                    <p className="text-white text-bold text-3xl">Event Info</p>
                    <Input placeholder='Title' name='title' type='text' handleChange={()=>{}} />
                    <Input placeholder='Event' name='event' type='text' handleChange={()=>{}} />
                    <textarea placeholder="Story" name="story" className="bg-transparent border-white"/>
                    <div className="grid grid-cols-2 gap-[10px]">
                        <select id="states"
                        onChange={(e)=>setChosenState(e.target.value)} 
                        className="mt-[10px] bg-gray-50 border border-white text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Choose a State</option>
                        {allStates.map((state,index)=><option key={state.isoCode} value={state.isoCode}>{state.name}</option>)}
                        </select>
                        {allCities && chosenState?
                        <select id="cities"
                        onChange={(e)=>setChosenCity(e.target.value)} 
                        className="mt-[10px] bg-gray-50 border border-white text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Choose a City</option>
                            {allCities.map((city,index)=><option key={city.name} value={city.name}>{city.name}</option>)}
                        </select>:''}
                    </div>
                    <button
                        type="button"
                        onClick={() => { }}
                        className="text-white mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-red-600">Next</button>
                </div> : ''}
        </div>
    )
}
export default CreateEvent;