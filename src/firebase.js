// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTJaEdymfykLj82aR6nQIt18vygVGvhsY",
  authDomain: "realtor-kenya.firebaseapp.com",
  projectId: "realtor-kenya",
  storageBucket: "realtor-kenya.appspot.com",
  messagingSenderId: "734547714214",
  appId: "1:734547714214:web:dd332246fe09dee4649467"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore()