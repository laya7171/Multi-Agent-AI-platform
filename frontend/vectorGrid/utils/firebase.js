// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "vectorgrid-ad0dd.firebaseapp.com",
  projectId: "vectorgrid-ad0dd",
  storageBucket: "vectorgrid-ad0dd.firebasestorage.app",
  messagingSenderId: "74555461044",
  appId: "1:74555461044:web:1a2015d76beef462c336e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();