// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyD7Qbjq8pIXEzB745OzkceD_9j4_vDUvLs",

  authDomain: "mindstore-e1c69.firebaseapp.com",

  projectId: "mindstore-e1c69",

  storageBucket: "mindstore-e1c69.firebasestorage.app",

  messagingSenderId: "271532225505",

  appId: "1:271532225505:web:9e75fc7f99665095ccd8a0"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =  getAuth(app);