import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { authentication, googleProvider } from "../common/utils/firebase.js";

class AuthModel {
    async signIn({ email, password }){
        let response = await signInWithEmailAndPassword(authentication, email, password);
        sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
        sessionStorage.setItem('Email', response.user.email);
        sessionStorage.setItem('Provider', "Self");
        sessionStorage.setItem('UID',response.user.uid);
    }

    async googleSignIn(){
        let response = await signInWithPopup(authentication, googleProvider);
        sessionStorage.setItem('Auth Token', response.user.accessToken);
        sessionStorage.setItem('Email', response.user.email);
        sessionStorage.setItem('Provider', "Google");
        sessionStorage.setItem('UID',response.user.uid);
        return response;
    }

    async signUp({ email, password }){
        let response = await createUserWithEmailAndPassword(authentication, email, password);
        sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
        sessionStorage.setItem('Email', response.user.email);
        sessionStorage.setItem('Provider', "Self");
        sessionStorage.setItem('UID',response.user.uid);
        return response.user.uid;
    }
}

export default AuthModel;