import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCuxiaRRGBdLfQ-C_SkckOd3s2c6H_8sOg",
  authDomain: "toolntask.firebaseapp.com",
  projectId: "toolntask",
  storageBucket: "toolntask.firebasestorage.app",
  messagingSenderId: "555121856962",
  appId: "1:555121856962:web:1a1405a7ef2c2885e6865b",
  measurementId: "G-5WW7147JQ9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
