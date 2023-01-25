import { useContext, React, useState, useEffect } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { authentication, facebookProvider, googleProvider } from "../utils/firebase.js";
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
const SignIn = () => {
    const navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')

        if (authToken) {
            navigate('/')
        }

        if (!authToken) {
            navigate('/login')
        }
    }, []);
    const { signInFormData, handleSignIn, setUser } = useContext(TransactionContext);
    const [formState, setFormState] = useState({ email: true, password: true });
    const handleSubmit = (e) => {
        const { email, password } = signInFormData;
        e.preventDefault();
        console.log(signInFormData);
        if (!email) setFormState((prevState) => ({ ...prevState, email: false }));
        else setFormState((prevState) => ({ ...prevState, email: true }));
        if (!password) setFormState((prevState) => ({ ...prevState, password: false }));
        else setFormState((prevState) => ({ ...prevState, password: true }));
        if (email && password) signInWithEmailAndPassword(authentication, email, password)
            .then((response) => {
                sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
                setUser(response.user);
                navigate('/');
            }).catch((error) => {
                if (error.code === 'auth/wrong-password') {
                    toast.error('Please check the Password');
                }
                if (error.code === 'auth/user-not-found') {
                    toast.error('Please check the Email');
                }
            });
    };
    useEffect(() => {
        console.log(formState)
    }, [formState]);
    const handleGoogleSignIn = () => {
        signInWithPopup(authentication, googleProvider).then((result) => {
            setUser(result.user);
            sessionStorage.setItem('Auth Token', result.user.accessToken);
            navigate('/');
        }).catch((error) => {
            console.log(error);
        })
    }
    const handleFacebookSignIn = () => {
        signInWithPopup(authentication, facebookProvider).then((result) => {
            // setUser(result.user);
            // sessionStorage.setItem('Auth Token', result.user.accessToken);
            // navigate('/');
            console.log(result);
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <div className="flex justify-center items-center gradient-bg-transactions">
            <div className="grid grid-cols-1 pt-[48px] justify-items-center">
                <h1 className="md:text-2xl text-4xl font-semibold text-white">Log In</h1>
                <div className="flex items-center gap-[10px] pt-[10px] pb-[20px]">
                    <p className="text-white">New to TokenGiving?</p>
                    <NavLink className="text-blue-500" to='/register'>Sign Up</NavLink>
                </div>
                <div className="p-5 sm:w-[32rem] w-full flex flex-col items-center blue-glassmorphism">
                    <div className="w-full">
                        <Input placeholder='Email' name='email' type='text' handleChange={handleSignIn} />
                        {!formState.email ? (
                            <div className="flex items-center gap-[10px]">
                                <AiOutlineExclamationCircle fontSize={17} color='#ff0000' />
                                <p className="text-[#ff0000] text-sm">This field must not be blank!</p>
                            </div>
                        ) : ""}
                        <Input placeholder='Password' name='password' type='password' handleChange={handleSignIn} />
                        {!formState.password ? (
                            <div className="flex items-center gap-[10px]">
                                <AiOutlineExclamationCircle fontSize={17} color='#ff0000' />
                                <p className="text-[#ff0000] text-sm">This field must not be blank!</p>
                            </div>
                        ) : ""}
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-sky-700">
                            Continue
                        </button>
                    </div>
                    <NavLink className="pb-[15px] text-blue-500" to='/reset'>Forgot your password?</NavLink>
                    <div className="inline-flex justify-center items-center w-full">
                        <hr className="mb-[20px] w-64 h-px bg-gray-200 border-0 dark:bg-gray-700" />
                    </div>
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-red-600">
                        Continue with Google
                    </button>
                    <button
                        type="button"
                        onClick={handleFacebookSignIn}
                        className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-sky-800">
                        Continue with Facebook
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default SignIn;