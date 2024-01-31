// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiuIvzC49kCGMmF_SFDO_h_kEWjNhVyOU",
  authDomain: "agrofarm-e655d.firebaseapp.com",
  projectId: "agrofarm-e655d",
  storageBucket: "agrofarm-e655d.appspot.com",
  messagingSenderId: "842272783996",
  appId: "1:842272783996:web:d09520cc6d15ea9d7453f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
