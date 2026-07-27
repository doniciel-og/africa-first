import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYbLBfz0BZmbYuyxIITH2XsANcEctvinI",
  authDomain: "africa-first-9f0f3.firebaseapp.com",
  projectId: "africa-first-9f0f3",
  storageBucket: "africa-first-9f0f3.firebasestorage.app",
  messagingSenderId: "131392377771",
  appId: "1:131392377771:web:810256a7ac3afb880378ee",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;