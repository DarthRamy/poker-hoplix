
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDXlVQTBu0ag-IDofnt5lUIMaD6P7lYlw0",
  authDomain: "poker-hoplix.firebaseapp.com",
  projectId: "poker-hoplix",
  storageBucket: "poker-hoplix.appspot.com",
  messagingSenderId: "51847716856",
  appId: "1:51847716856:web:a7d27216a84e73a637400d"
};

const currentUserPromise = () =>
  new Promise((resolve, reject) => {
    onAuthStateChanged(
      auth,
      (user) => {
        resolve(user);
      },
      (e) => reject(e)
    );
  });

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, currentUserPromise, storage };