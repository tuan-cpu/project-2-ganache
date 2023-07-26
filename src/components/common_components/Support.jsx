import React, { useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { Button } from '..';
import { useStateContext } from '../../controller/ContextProvider';
import { useDataContext } from '../../controller/DataProvider';
import { useAuthContext } from '../../controller/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Support = ({ onClose }) => {
    const { currentColor } = useStateContext();
    const { user } = useAuthContext();
    const { createOtherInquiry } = useDataContext();
    const [data,setData] =useState({
        subject: '',
        describe:'',
        user_id: user?.id
    })
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded max-w-3xl w-full">
                <div className='flex justify-between items-start'>
                    <h1 className='text-3xl font-bold'>Hỗ trợ người dùng</h1>
                    <button type='button' onClick={onClose} style={{ color: 'rgb(153,171,180)', borderRadius: '50%' }}
                        className='text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray'>
                        <MdOutlineCancel />
                    </button>
                </div>
                <input type='text' name='subject' onChange={(e) => setData((prev)=>({...prev, subject: e.target.value}))} placeholder='Vấn đề cần hỗ trợ'
                    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent border-b-black border-white text-sm"
                    required />
                <textarea placeholder="Cụ thể vấn đề bạn gặp phải" name="describe" className="w-full bg-transparent border-white border-b-black"
                    onChange={(e) => setData((prev)=>({...prev, describe: e.target.value}))}
                />
                <div className='flex flex-row justify-between'>
                    <Button color='white' bgColor={currentColor} text='Huỷ' borderRadius='10px' size='md' customFunction={onClose} />
                    <Button color='white' bgColor={currentColor} text='Gửi' borderRadius='10px' size='md' customFunction={()=>{
                        createOtherInquiry(data);
                        toast.success("Gửi yêu cầu thành công!", {
                            onClose: onClose
                        })
                    }} />
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default Support