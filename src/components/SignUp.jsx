import { useState, React, useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
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
const SignUp = () => {
    const { signUpFormData, handleSignUp } = useContext(TransactionContext);
    const handleSubmit = (e) => {
        const { firstname, lastname, email, password } = signUpFormData;
        e.preventDefault();
        console.log(signUpFormData);
        if (!firstname || !lastname || !email || !password) return;
        console.log(signUpFormData);
    }
    return (
        <div className="flex justify-center items-center gradient-bg-transactions">
            <div className="grid grid-cols-1 pt-[48px] justify-items-center">
                <img src="https://www.justgiving.com/sso/images/signup.svg" alt="true" className="mb-[24px]" />
                <h1 className="mb-[12px] md:text-2xl text-4xl font-semibold text-white">Sign Up</h1>
                <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                    <Input placeholder='First name' name='firstname' type='text' handleChange={handleSignUp} />
                    <Input placeholder='Last name' name='lastname' type='text' handleChange={handleSignUp} />
                    <Input placeholder='Email' name='email' type='text' handleChange={handleSignUp} />
                    <Input placeholder='Password' name='password' type='password' handleChange={handleSignUp} />
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px]">
                        Sign Up
                    </button>
                    <p className="text-slate-400 text-xs pb-[20px]">By clicking 'Sign up', you are agreeing to our terms of service and privacy policy.</p>
                    <div class="inline-flex justify-center items-center w-full">
                        <hr class="mb-[20px] w-64 h-px bg-gray-200 border-0 dark:bg-gray-700" />
                    </div>
                    <p className="text-white text-base">Already have an account?</p>
                    <a className="text-white">Log In</a>
                </div>
            </div>
        </div>
    )
}

export default SignUp;