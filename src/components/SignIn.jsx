import { useContext, React, useState, useEffect } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { authentication, facebookProvider, googleProvider, db } from "../utils/firebase.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, addDoc, getCountFromServer, query, where } from "firebase/firestore"; 
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
    const { signInFormData, handleSignIn } = useContext(TransactionContext);
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
                sessionStorage.setItem('Email', response.user.email);
                sessionStorage.setItem('Provider', "Self");
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
    const addData = async(email,provider,displayName,photoURL)=>{
        const coll = collection(db, "users");
        const query_ = query(coll, where('email', '==', email), where('provider', '==', provider));
        const snapshot = await getCountFromServer(query_);
        if(snapshot.data().count === 0) await addDoc(collection(db, "users"), {
            provider: provider,
            email: email,
            displayName:displayName,
            donation_detail: [],
            role: 'user',
            avatar: photoURL
        });
    }
    const handleGoogleSignIn = () => {
        signInWithPopup(authentication, googleProvider).then((result) => {
            sessionStorage.setItem('Auth Token', result.user.accessToken);
            sessionStorage.setItem('Email', result.user.email);
            sessionStorage.setItem('Provider', "Google");
            addData(result.user.email,"Google",result.user.displayName, result.user.photoURL);
            navigate('/');
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <div className="flex justify-center items-center gradient-bg-transactions">
            <div className="grid grid-cols-1 pt-[48px] justify-items-center">
                <h1 className="md:text-2xl text-4xl font-semibold text-white">Đăng nhập</h1>
                <div className="flex items-center gap-[10px] pt-[10px] pb-[20px]">
                    <p className="text-white">Mới biết đến TokenGiving?</p>
                    <NavLink className="text-blue-500" to='/register'>Đăng kí</NavLink>
                </div>
                <div className="p-5 sm:w-[32rem] w-full flex flex-col items-center blue-glassmorphism">
                    <div className="w-full">
                        <Input placeholder='Email' name='email' type='text' handleChange={handleSignIn} />
                        {!formState.email ? (
                            <div className="flex items-center gap-[10px]">
                                <AiOutlineExclamationCircle fontSize={17} color='#ff0000' />
                                <p className="text-[#ff0000] text-sm">Dòng này không được bỏ trống!</p>
                            </div>
                        ) : ""}
                        <Input placeholder='Mật khẩu' name='password' type='password' handleChange={handleSignIn} />
                        {!formState.password ? (
                            <div className="flex items-center gap-[10px]">
                                <AiOutlineExclamationCircle fontSize={17} color='#ff0000' />
                                <p className="text-[#ff0000] text-sm">Dòng này không được bỏ trống!</p>
                            </div>
                        ) : ""}
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-sky-700">
                            Đăng nhập
                        </button>
                    </div>
                    <NavLink className="pb-[15px] text-blue-500" to='/reset'>Quên mật khẩu?</NavLink>
                    <div className="inline-flex justify-center items-center w-full">
                        <hr className="mb-[20px] w-64 h-px bg-gray-200 border-0 dark:bg-gray-700" />
                    </div>
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-red-600">
                        Đăng nhập bằng Google
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default SignIn;