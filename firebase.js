// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAXv81yXs4Jru-uIa1rI48pXGpEUQiX5ng",
  authDomain: "document-generator-nextjs.firebaseapp.com",
  databaseURL:
    "https://document-generator-nextjs-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "document-generator-nextjs",
  storageBucket: "document-generator-nextjs.appspot.com",
  messagingSenderId: "706482267957",
  appId: "1:706482267957:web:5ce37c95d27c81c9e04e7c",
  measurementId: "G-R6P48EF5R3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();
export { app, auth, db };
