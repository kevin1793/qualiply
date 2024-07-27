// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration (replace with your config)
const firebaseConfig = {
  apiKey: "AIzaSyBTH7iwZCyMRqh6kVcnHV2oPSAReWizCw0",
  authDomain: "qualiply-cf9a5.firebaseapp.com",
  projectId: "qualiply-cf9a5",
  storageBucket: "qualiply-cf9a5.appspot.com",
  messagingSenderId: "866545152465",
  appId: "1:866545152465:web:4ec407a6c8c2bbebe070f0",
  measurementId: "G-F0H771QYXY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);