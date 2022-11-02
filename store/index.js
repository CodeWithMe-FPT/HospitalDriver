import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";
import { getDatabase} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyCePrdA3BViDBnua6OyNF2uVySrGIHANqg",
    authDomain: "sfcxcv-8e575.firebaseapp.com",
    projectId: "sfcxcv-8e575",
    storageBucket: "sfcxcv-8e575.appspot.com",
    messagingSenderId: "689082718638",
    appId: "1:689082718638:web:93cdb7e7b4a2f411ffd03f",
    measurementId: "G-K2R20MJ6V8",
    databaseURL: "https://sfcxcv-8e575-default-rtdb.asia-southeast1.firebasedatabase.app"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase();
export { app, db };