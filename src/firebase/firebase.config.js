// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyDWiBYNcDEWdybNndxtzT84mRYW3mwnJI4",

  authDomain: "book-store-mern-app-68388.firebaseapp.com",

  projectId: "book-store-mern-app-68388",

  storageBucket: "book-store-mern-app-68388.firebasestorage.app",

  messagingSenderId: "178545883269",

  appId: "1:178545883269:web:cd88fe610f70a7c6fb51ec"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =  getAuth(app);