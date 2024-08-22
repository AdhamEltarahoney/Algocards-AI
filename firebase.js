// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = { 
  apiKey: "AIzaSyCztppAtbmX2rdEYIB_aeyW6-wirEL1nI8",
  authDomain: "flashcardsaas-52140.firebaseapp.com",
  projectId: "flashcardsaas-52140",
  storageBucket: "flashcardsaas-52140.appspot.com",
  messagingSenderId: "168770337782",
  appId: "1:168770337782:web:ed940b19a694a364cd65d7",
  measurementId: "G-JEXY1KRJEF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)


export {db}
