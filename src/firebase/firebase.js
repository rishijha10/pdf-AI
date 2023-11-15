// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optiona
const firebaseConfig = {
  apiKey: "AIzaSyBDbHL0K9fRtb0ykx7wF51uQFpq01RKxoI",
  authDomain: "pdf-ai-3ba90.firebaseapp.com",
  projectId: "pdf-ai-3ba90",
  storageBucket: "pdf-ai-3ba90.appspot.com",
  messagingSenderId: "162409771378",
  appId: "1:162409771378:web:850309ca1b132bc8c8adeb",
  measurementId: "G-HVWPPB8H3K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const auth = getAuth();
