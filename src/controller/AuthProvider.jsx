import React, { useState, useContext, createContext } from "react";
import AuthModel from "../model/AuthModel";

const authInstance = new AuthModel();
const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [signInFormData, setSignInFormData] = useState({ email: "", password: "" });
    const [signUpFormData, setSignUpFormData] = useState({ firstname: "", lastname: "", email: "", password: "" });
    const [user, setUser] = useState({ displayName: '', id: '', donation_detail: [], email: '', provider: '', role: '', verified: false, avatar: '', displayTitle: 0 });
    const handleSignIn = (e, name) => {
        setSignInFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };
    const handleSignUp = (e, name) => {
        setSignUpFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };
    const signIn = async ({ email, password }) =>{
        await authInstance.signIn({ email, password });
    }
    const signUp = async ({ email, password }) =>{
        await authInstance.signUp({ email, password });
    }
    const googleSignIn = async () =>{
        let response = await authInstance.googleSignIn();
        sessionStorage.setItem('Auth Token', response.user.accessToken);
        sessionStorage.setItem('Email', response.user.email);
        sessionStorage.setItem('Provider', "Google");
        return response;
    }
    return (
        <AuthContext.Provider value={{signIn, signUp, googleSignIn, handleSignIn, handleSignUp, signInFormData, signUpFormData, user, setUser}}>
          {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);