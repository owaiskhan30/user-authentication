import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyABxgWkqMRi1oDupWWL0GddORfgqLMyag8",
    authDomain: "user-login-authenticatio-e3008.firebaseapp.com",
    projectId: "user-login-authenticatio-e3008",
    storageBucket: "user-login-authenticatio-e3008.firebasestorage.app",
    messagingSenderId: "295394730256",
    appId: "1:295394730256:web:4f1a4175f75dfcb6f38595",
    measurementId: "G-R0X1ZR0VCN"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);