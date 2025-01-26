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