// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyASfm1Y6uheZzI5KMwNRlKJyhp1q4zx7Ck",
  authDomain: "pollitelecom-42c8b.firebaseapp.com",
  projectId: "pollitelecom-42c8b",
  storageBucket: "pollitelecom-42c8b.appspot.com",
  messagingSenderId: "411888476549",
  appId: "1:411888476549:web:2164c53325b3e712a464ec",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();
export { app, auth, db };
