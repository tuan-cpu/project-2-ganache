import { useState, React, useContext, useEffect } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { AiOutlineCheckCircle, AiOutlineExclamationCircle } from "react-icons/ai";
import { BsCircle } from "react-icons/bs";
import { validNumberOfCharacter, validLowerCharacter, validUpperCharacter, validNumber, validSpecialCharacter, validEmail, validPassword } from "../hooks/regex";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { NavLink } from "react-router-dom";
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
const CircleIcon = ({ currentState }) => {
    if (currentState === 0) return <BsCircle fontSize={17} color='#fff' />;
    if (currentState === 1) return <AiOutlineCheckCircle fontSize={17} color='#00ff5e' />
    if (currentState === -1) return <AiOutlineExclamationCircle fontSize={17} color='#ff0000' />
}
const SignUp = () => {
    const { signUpFormData, handleSignUp } = useContext(TransactionContext);
    const [passwordState, setPasswordState] = useState({ lower: 0, upper: 0, special: 0, number: 0, char: 0 });
    const [nameState, setNameState] = useState({ first: true, last: true });
    const [emailState, setEmailState] = useState(true);
    const handleSubmit = (e) => {
        const { firstname, lastname, email, password } = signUpFormData;
        const authentication = getAuth();
        e.preventDefault();
        console.log(signUpFormData);
        if (!firstname) setNameState((prevState) => ({ ...prevState, first: false }));
        if (!lastname) setNameState((prevState) => ({ ...prevState, last: false }));
        if (validNumberOfCharacter.test(password)) setPasswordState((prevState) => ({ ...prevState, char: 1 }));
        else setPasswordState((prevState) => ({ ...prevState, char: -1 }))
        if (validUpperCharacter.test(password)) setPasswordState((prevState) => ({ ...prevState, upper: 1 }));
        else setPasswordState((prevState) => ({ ...prevState, upper: -1 }))
        if (validLowerCharacter.test(password)) setPasswordState((prevState) => ({ ...prevState, lower: 1 }));
        else setPasswordState((prevState) => ({ ...prevState, lower: -1 }))
        if (validSpecialCharacter.test(password)) setPasswordState((prevState) => ({ ...prevState, special: 1 }));
        else setPasswordState((prevState) => ({ ...prevState, special: -1 }))
        if (validNumber.test(password)) setPasswordState((prevState) => ({ ...prevState, number: 1 }));
        else setPasswordState((prevState) => ({ ...prevState, number: -1 }))
        if (!validEmail.test(email)) setEmailState(false);
        if (validPassword.test(password) && validEmail.test(email))
            createUserWithEmailAndPassword(authentication, email, password)
                .then((response) => {
                    sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
                }).catch((error) => {
                    if (error.code === 'auth/email-already-in-use') {
                        toast.error('Email Already in Use');
                    }
                })
    }
    useEffect(() => {
        console.log(passwordState)
    }, [passwordState]);
    return (
        <div className="flex justify-center items-center gradient-bg-transactions">
            <div className="grid grid-cols-1 pt-[48px] justify-items-center">
                <img src="https://www.justgiving.com/sso/images/signup.svg" alt="true" className="mb-[24px]" />
                <h1 className="mb-[12px] md:text-2xl text-4xl font-semibold text-white">Sign Up</h1>
                <div className="p-5 sm:w-[32rem] w-full flex flex-col items-center blue-glassmorphism">
                    <div className="w-full">
                        <Input placeholder='First name' name='firstname' type='text' handleChange={handleSignUp} />
                        {!nameState.first ? (
                            <div className="flex items-center gap-[10px]">
                                <AiOutlineExclamationCircle fontSize={17} color='#ff0000' />
                                <p className="text-[#ff0000] text-sm">This field must not be blank!</p>
                            </div>
                        ) : ""}
                        <Input placeholder='Last name' name='lastname' type='text' handleChange={handleSignUp} />
                        {!nameState.last ? (
                            <div className="flex items-center gap-[10px]">
                                <AiOutlineExclamationCircle fontSize={17} color='#ff0000' />
                                <p className="text-[#ff0000] text-sm">This field must not be blank!</p>
                            </div>
                        ) : ""}
                        <Input placeholder='Email' name='email' type='text' handleChange={handleSignUp} />
                        {!emailState ? (
                            <div className="flex items-center gap-[10px]">
                                <AiOutlineExclamationCircle fontSize={17} color='#ff0000' />
                                <p className="text-[#ff0000] text-sm">Email invalid!</p>
                            </div>
                        ) : ""}
                        <Input placeholder='Password' name='password' type='password' handleChange={handleSignUp} />
                        <div className="flex items-center gap-[10px]">
                            <CircleIcon currentState={passwordState.char} />
                            <p className="text-[#737373]">Must be at least 12 characters</p>
                        </div>
                        <div className="flex items-center gap-[10px]">
                            <CircleIcon currentState={passwordState.number} />
                            <p className="text-[#737373]">Must include at least one number</p>
                        </div>
                        <div className="flex items-center gap-[10px]">
                            <CircleIcon currentState={passwordState.lower} />
                            <p className="text-[#737373]">Must include at least one lower case letter</p>
                        </div>
                        <div className="flex items-center gap-[10px]">
                            <CircleIcon currentState={passwordState.upper} />
                            <p className="text-[#737373]">Must include at least one upper case letter</p>
                        </div>
                        <div className="flex items-center gap-[10px]">
                            <CircleIcon currentState={passwordState.special} />
                            <p className="text-[#737373]">Must include at least special character (#,$,%,&,@ etc.)</p>
                        </div>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-sky-700">
                            Sign Up
                        </button>
                        <p className="text-slate-400 text-xs pb-[20px]">By clicking 'Sign up', you are agreeing to our terms of service and privacy policy.</p>
                    </div>
                    <div className="inline-flex justify-center items-center w-full">
                        <hr className="mb-[20px] w-64 h-px bg-gray-200 border-0 dark:bg-gray-700" />
                    </div>
                    <p className="text-white text-base">Already have an account?</p>
                    <NavLink className="text-blue-500" to='/login'>Log in</NavLink>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default SignUp;