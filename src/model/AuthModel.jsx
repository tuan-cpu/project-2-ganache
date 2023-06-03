import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { authentication, googleProvider, db } from "../utils/firebase.js";

class AuthModel {
    async signIn({ email, password }){
        let response = await signInWithEmailAndPassword(authentication, email, password)
        sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
        sessionStorage.setItem('Email', response.user.email);
        sessionStorage.setItem('Provider', "Self");
    }

    async googleSignIn(){
        return await signInWithPopup(authentication, googleProvider);
    }

    async signUp({ email, password }){
        let response = await createUserWithEmailAndPassword(authentication, email, password)
        sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
    }
}

export default AuthModel;