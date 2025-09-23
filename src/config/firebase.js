// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbW4YbfwieUbTTAgqlesOXquU2mlsfBLM",
  authDomain: "react-with-firebase-d70a3.firebaseapp.com",
  projectId: "react-with-firebase-d70a3",
  storageBucket: "react-with-firebase-d70a3.firebasestorage.app",
  messagingSenderId: "322582194659",
  appId: "1:322582194659:web:5873e0999c263c49c358d6",
  measurementId: "G-EEV2MN8J7Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Exports
export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
