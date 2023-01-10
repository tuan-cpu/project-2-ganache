import { useState } from "react";
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
                    <button
                        type="button"
                        onClick={() => { }}
                        className="text-white mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-red-600">Next</button>
                </div> : ''}
        </div>
    )
}
export default CreateEvent;