// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXY2aBVr-qFVCOfpVdllLUiE6ViloDBcs",
  authDomain: "simple-firebase-f2416.firebaseapp.com",
  projectId: "simple-firebase-f2416",
  storageBucket: "simple-firebase-f2416.appspot.com",
  messagingSenderId: "1080170657602",
  appId: "1:1080170657602:web:fd4d070b25c5b4677d3adb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);