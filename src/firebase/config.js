import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyDLnjWtkqFZyqUHq464zD-N6sL3rBDuDsw",
  authDomain: "product-shop-43449.firebaseapp.com",
  projectId: "product-shop-43449",
  storageBucket: "product-shop-43449.appspot.com",
  messagingSenderId: "369009702864",
  appId: "1:369009702864:web:f87dd36d60963868fcebd5"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app