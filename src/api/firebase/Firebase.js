// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZroQfm6By_Mq-cuo0JvlKA-wv3gn0sUc",
  authDomain: "apeuda-f3ba7.firebaseapp.com",
  projectId: "apeuda-f3ba7",
  storageBucket: "apeuda-f3ba7.appspot.com",
  messagingSenderId: "705629961139",
  appId: "1:705629961139:web:e18b5b92b0224fb122e9c6",
  measurementId: "G-128HR1PFK5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase 서비스 초기화
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
