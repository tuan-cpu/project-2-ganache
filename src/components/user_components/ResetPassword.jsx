import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { authentication } from "../../common/utils/firebase.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        name={name}
        onChange={(e) => handleChange(e, name)}
        value={value}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
        required
    />
)
const ResetPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const handleChange = (e) => {
        setEmail(e.target.value);
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(!email) return;
        else try {
            await sendPasswordResetEmail(authentication,email).then(()=>{
                toast.success("Password reset link have been sent. Please check your mail box.");
                setTimeout(()=>{
                    navigate('/login',{replace:true});
                },5300)
            })
        } catch (error) {
            toast.error("An error occurred while sending email.")
        }
    }
    return (
        <div className="flex justify-center items-center gradient-bg-transactions">
            <div className="grid grid-cols-1 pt-[48px] justify-items-center w-[29rem]">
                <img src="https://www.justgiving.com/sso/images/reset-password.svg" alt="true" className="mb-[24px]" />
                <h1 className="mb-[12px] md:text-2xl text-4xl font-semibold text-white">Thay đổi mật khẩu</h1>
                <p className="text-gray-300 test-xs pb-[10px]">Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu của bạn.</p>
                <div className="p-5 sm:w-[32rem] w-full flex flex-col items-center blue-glassmorphism">
                    <Input placeholder='Email' name='email' type='text' handleChange={handleChange} />
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-sky-700">
                        Cài lại mật khẩu
                    </button>
                    <NavLink className="pb-[20px] text-blue-600" to="/login">Trở về màn hình đăng nhập</NavLink>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default ResetPassword;