import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, addDoc } from 'firebase/firestore';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDRMey5xDdgeHVap9cKi0QhxCDDD6FPl2k",
    authDomain: "community-hub-b1b11.firebaseapp.com",
    projectId: "community-hub-b1b11",
    storageBucket: "community-hub-b1b11.appspot.com",
    messagingSenderId: "465430775102",
    appId: "1:465430775102:web:6c16d0ba789c31e269586f",
    measurementId: "G-LFLZCFN32G"
  };


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const provider = new GoogleAuthProvider();

  export { auth, provider, signInWithPopup, collection, onSnapshot, addDoc };
  export default db;
