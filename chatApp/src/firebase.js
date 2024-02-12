// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDw9ilI1w_B42u1QYjoqKsWpIwQnda76yo",
  authDomain: "chatapp-2cd2a.firebaseapp.com",
  projectId: "chatapp-2cd2a",
  storageBucket: "chatapp-2cd2a.appspot.com",
  messagingSenderId: "404129482705",
  appId: "1:404129482705:web:643414925cc6d1abb102f0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();