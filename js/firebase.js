import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyA7eAsEmQO2UNVi2A0Z1BX2qd0m3SxJG3I",
    authDomain: "lokxse-db.firebaseapp.com",
    projectId: "lokxse-db",
    storageBucket: "lokxse-db.firebasestorage.app",
    messagingSenderId: "207391415812",
    appId: "1:207391415812:web:545ff064d5691be52e5f51"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
