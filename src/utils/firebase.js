// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOVL6URL5M94m-18HTMH0rvbx3cFgOWmA",
  authDomain: "cryptodonation-46465.firebaseapp.com",
  projectId: "cryptodonation-46465",
  storageBucket: "cryptodonation-46465.appspot.com",
  messagingSenderId: "444001241794",
  appId: "1:444001241794:web:5089f85d613813581ac95b",
  measurementId: "G-3EFY4G13HJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
export { authentication, googleProvider, facebookProvider, db };
const analytics = getAnalytics(app);