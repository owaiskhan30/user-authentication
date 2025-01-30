import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth } from "./firebaseconfig.js";

const logout_btn = document.querySelector(".logout_btn");

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);
    } else {
        window.location = "login.html"
    }
});

logout_btn.addEventListener("click", function () {
    signOut(auth).then(() => {
        window.location = "login.html";
    }).catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
    });
});


import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { db } from "./firebaseconfig.js";

const form = document.querySelector("#form");
const todo_title = document.querySelector(".todo_title");
const todo_description = document.querySelector(".todo_description");

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log(todo_title.value);
    console.log(todo_description.value);
    
    try {
        const docRef = await addDoc(collection(db, "todos"), {
            title: todo_title.value,
            description: todo_description.value
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        const errorMessage = error.message;
        console.log(errorMessage);
    }
});