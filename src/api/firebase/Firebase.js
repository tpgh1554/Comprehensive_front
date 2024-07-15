import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDC409_YXEZpzIRPqgGKIjxVtAy5dscGO4",
  authDomain: "apuda-98915.firebaseapp.com",
  projectId: "apuda-98915",
  storageBucket: "apuda-98915.appspot.com",
  messagingSenderId: "941223138452",
  appId: "1:941223138452:web:b0550284eafddcec4fd081"
};

firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
