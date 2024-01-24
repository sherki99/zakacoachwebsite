import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import for Firebase Storage



const firebaseConfig = {
    apiKey: "AIzaSyCNm3nZggL5Laqodg-JYEAfeMp3H8qjFtw",
    authDomain: "zakcoachwebsit.firebaseapp.com",
    projectId: "zakcoachwebsit",
    storageBucket: "zakcoachwebsit.appspot.com",
    messagingSenderId: "938091418026",
    appId: "1:938091418026:web:d90c865f6d51f48f1c1bd3",
    measurementId: "G-M08G8X4CJS"
  };



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);


export { app, db, storage };
